import React, { Component } from 'react';
import './App.css';
import Transport from './Components/Transport.js';
import Dimension from './Components/Dimension.js';
import Sequence from './Components/Sequence.js';
import StepSequence from './Components/StepSequence.js';
import Tone from 'tone';

const synth = new Tone.PolySynth(2, Tone.Synth).toMaster();

// Sample data begin
// const sampleNotes = [];
// for (let i = 0; i < 8; i++) {
// sampleNotes.push({
// 	note: 'C5',
// 	time: `0:${i}`,
// 	velocity: 0.1,
// });
// }

// const part = new Tone.Part((time, value) => {
// 	synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
// }, sampleNotes).start(0);
// Sample data end

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeSig: [4, 4],
			renderedNotes: [],
			metronomeContainer: [],
			metContainerSize: 0,
			sequenceContainer: [],
			seqContainerSize: 0,
			sequenceIndex: 0,
			seqIsPlaying: false,
			seqPartContainer: [],
			loopStatus: false,
			notes: ['C5', 'EB5'],
			tempDivisor: 4,
			beatTicks: 8,
			placement: 0,
			playing: false,
			bpm: 120,
		};
	}

	//lifecycle methods
	componentDidMount() {
		this.generateMetronome();
		this.generateStepSequence();
	}

	// custom methods
	computeTime(index) {
		console.log('index: ' + index);
		console.log('compute time: ' + `0:${index / 8}`);
		return `0:${index / 8}`;
	}

	togglePlaying() {
		if (this.state.playing) {
			this.setState({ playing: false, seqIsPlaying: false });
			Tone.Transport.stop();
			this.loopUpdate(false);
			console.log('playing stopped');
		} else {
			this.setState({ playing: true, seqIsPlaying: false });
			this.loopUpdate(true);
			Tone.Transport.start('+0.0');
			console.log('playing initiated');
		}
	}

	loopUpdate(arg) {
		if (arg === true) {
			Tone.Transport.loopStart = 0;
			Tone.Transport.loopEnd =
				this.calcMetLength(this.state.timeSig) / 16;
			console.log('loopEnd:' + Tone.Transport.loopEnd);
			Tone.Transport.loop = true;
		} else {
			Tone.Transport.loop = false;
			Tone.Transport.loopEnd = 0;
		}
	}

	updateBPM() {
		const slider = document.querySelector('#tempo-sld').value;
		document.querySelector(
			'#tempo-value-header'
		).innerHTML = `Quarters per minute: ${slider}`;
		// console.log('updating bpm to ' + slider);
		this.setState({
			bpm: parseInt(slider),
		});
		Tone.Transport.bpm.value = parseInt(slider);
	}

	updateTimeSig() {
		const top = document.querySelector('#num-beats-input');
		const bottom = document.querySelector('#subdivision-input');
		const bottomDisplay = document.querySelector('#subdivision-display');
		this.setState(
			{
				timeSig: [
					parseInt(top.value),
					Math.pow(2, parseInt(bottom.value)),
				],
			},
			() => {
				this.loopUpdate(true);

				this.generateStepSequence();
				this.updateMetronome();
			}
		);
		bottomDisplay.innerHTML = Math.pow(2, parseInt(bottom.value));
	}

	exportMeasure() {
		console.log('exporting measure');
		const timeSig = this.state.timeSig;
		const metLength = this.calcMetLength(timeSig);
		console.log('metLength: ' + metLength);
		const sequenceContainer = this.state.sequenceContainer;
		console.log('sequence container length: ' + sequenceContainer.length);
		let seqContainerSize = this.state.seqContainerSize + 1;
		const sequenceMatrix = this.generateSeqMatrix();
		const matrix = this.readCheckboxes(sequenceMatrix);
		console.log(matrix);
		sequenceContainer.push([timeSig[0], timeSig[1], metLength, matrix]);

		this.setState(
			{
				sequenceContainer: sequenceContainer,
				seqContainerSize: seqContainerSize,
			},
			() => {
				console.log('sequence container: ' + sequenceContainer);
				console.log('sequence size: ' + seqContainerSize);
			}
		);
	}

	generateSeqMatrix() {
		const timeSig = this.state.timeSig;
		const finalMatrix = [];
		console.log('timeSig: ' + timeSig[0] + ' ' + timeSig[1]);

		if (timeSig[1] === 16 || timeSig[1] === 8 || timeSig[1] === 32) {
			for (let i = 0; i < timeSig[0]; i++) {
				i % 2 === 0 ? finalMatrix.push(1) : finalMatrix.push(0);
			}
		} else if (timeSig[1] === 4 || timeSig[1] === 2) {
			for (let i = 0; i < timeSig[0] * 2; i++) {
				if (i % 2 === 0) {
					finalMatrix.push(1);
				} else {
					finalMatrix.push(0);
				}
			}
		}
		console.dir(finalMatrix.length);
		return finalMatrix;
	}

	readCheckboxes(array) {
		console.log('reading checkboxes');
		if (!array) {
			const topRowButtons = document.querySelectorAll('.top-row-btn');
			const bottomRowButtons = document.querySelectorAll(
				'.bottom-row-btn'
			);
			// console.log(topRowButtons);
			// console.log(bottomRowButtons);
			const matrix = this.generateSeqMatrix();
			const topArray = [];
			const bottomArray = [];
			// for (let i = 0; i < matrix.length; i++) {
			// 	if (i === 0) {
			// 		topArray.push(1);
			// 		bottomArray.push(0);
			// 	} else if (matrix[i] === 1) {
			// 		topArray.push(0);
			// 		bottomArray.push(1);
			// 	} else {
			// 		topArray.push(0);
			// 		bottomArray.push(0);
			// 	}
			// }
			for (let i = 0; i < topRowButtons.length; i++) {
				if (topRowButtons[i].checked && bottomRowButtons[i].checked) {
					topArray.push(1);
					bottomArray.push(1);
				} else if (
					!topRowButtons[i].checked &&
					bottomRowButtons[i].checked
				) {
					topArray.push(0);
					bottomArray.push(1);
				} else if (
					topRowButtons[i].checked &&
					!bottomRowButtons[i].checked
				) {
					topArray.push(1);
					bottomArray.push(0);
				} else if (
					!topRowButtons[i].checked &&
					!bottomRowButtons[i].checked
				) {
					topArray.push(0);
					bottomArray.push(0);
				}
			}
			return [topArray, bottomArray];
		} else {
			const topRowButtons = document.querySelectorAll('.top-row-btn');
			const bottomRowButtons = document.querySelectorAll(
				'.bottom-row-btn'
			);
			console.log(topRowButtons);
			console.log(bottomRowButtons);
			const topArray = [];
			const bottomArray = [];
			for (let i = 0; i < topRowButtons.length; i++) {
				if (topRowButtons[i].checked && bottomRowButtons[i].checked) {
					topArray.push(1);
					bottomArray.push(1);
				} else if (
					!topRowButtons[i].checked &&
					bottomRowButtons[i].checked
				) {
					topArray.push(0);
					bottomArray.push(1);
				} else if (
					topRowButtons[i].checked &&
					!bottomRowButtons[i].checked
				) {
					topArray.push(1);
					bottomArray.push(0);
				} else if (
					!topRowButtons[i].checked &&
					!bottomRowButtons[i].checked
				) {
					topArray.push(0);
					bottomArray.push(0);
				}
			}
			const finalMatrix = [topArray, bottomArray];
			return finalMatrix;
		}
	}

	generateSeqPart() {}

	calcMetLength(timeSig) {
		// console.log('calculate metronome length');
		const tempDivisor = timeSig[1];
		if (tempDivisor === 2) {
			return 16 * timeSig[0];
		} else if (tempDivisor === 4) {
			return 8 * timeSig[0];
		} else if (tempDivisor === 8) {
			return 4 * timeSig[0];
		} else if (tempDivisor === 16) {
			return 2 * timeSig[0];
		} else if (tempDivisor === 32) {
			return timeSig[0];
		}
	}

	calcBeatTicks(subdivisor) {
		// console.log('calculate beat ticks');
		const tempDivisor = subdivisor;
		if (tempDivisor === 2) {
			return 16;
		} else if (tempDivisor === 4) {
			return 8;
		} else if (tempDivisor === 8) {
			return 4;
		} else if (tempDivisor === 16) {
			return 2;
		} else if (tempDivisor === 32) {
			return 1;
		}
	}

	generateMetronome() {
		console.log('generate metronome');
		// erase or stop all previous parts
		// Tone.Transport.cancel(); // something else?
		const metContainer = this.state.metronomeContainer; // holds rendered part so it can be erased or stopped in future
		metContainer.forEach(part => part.removeAll());
		let metContainerSize = 0;
		const timeSig = this.state.timeSig;
		console.log('timeSig: ' + timeSig);
		// make copy of rendered notes and erase everything
		const renderedNotes = [];
		const notes = this.state.notes;
		const metLength = this.calcMetLength(timeSig);
		console.log('met length: ' + metLength);
		const beatTicks = this.calcBeatTicks(timeSig[1]);
		console.log('beatTicks: ' + beatTicks);
		for (let i = 0; i < metLength; i++) {
			if (i === 0) {
				renderedNotes.push({
					note: notes[1],
					time: `0:0`,
					velocity: 0.1,
				});
			} else if (i % beatTicks === 0) {
				renderedNotes.push({
					note: notes[0],
					time: `0:${i / 8}`, // this may be waaay wrong
					velocity: 0.1,
				});
			}
		}
		const part = new Tone.Part((time, value) => {
			synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
		}, renderedNotes).start(0);
		metContainer.push(part);
		metContainerSize++;
		// set state
		this.setState({
			renderedNotes: renderedNotes,
			metronomeContainer: metContainer,
			metContainerSize: metContainerSize,
			beatTicks: 8,
		});
	}

	updateMetronome() {
		console.log('updating metronome');
		// erase or stop all previous parts
		const metContainer = this.state.metronomeContainer; // holds rendered part so it can be erased or stopped in future
		metContainer.forEach(part => part.removeAll());
		let metContainerSize = 0;
		// clear sequences as well
		const sequenceContainer = this.state.sequenceContainer;
		const seqPartContainer = this.state.seqPartContainer;
		seqPartContainer.forEach(part => part.removeAll());
		const timeSig = this.state.timeSig;
		// make copy of rendered notes and erase everything
		const renderedNotes = [];
		const notes = this.state.notes;
		const metLength = this.calcMetLength(timeSig);
		console.log('metLength: ' + metLength);
		const beatTicks = this.calcBeatTicks(timeSig[1]);
		console.log('beatTicks: ' + beatTicks);
		const matrix = this.readCheckboxes();
		console.log('updated matrix' + matrix);
		for (let i = 0; i < metLength; i++) {
			if (timeSig[1] <= 4 && i % (beatTicks / 2) === 0) {
				if (matrix[0][i / (beatTicks / 2)] === 1) {
					renderedNotes.push({
						note: notes[1],
						time: `0:${i / 8}`,
						velocity: 0.1,
					});
				}
				if (matrix[1][i / (beatTicks / 2)] === 1) {
					renderedNotes.push({
						note: notes[0],
						time: `0:${i / 8}`,
						velocity: 0.1,
					});
				}
			} else if (i % beatTicks === 0) {
				if (matrix[0][i / beatTicks] === 1) {
					renderedNotes.push({
						note: notes[1],
						time: `0:${i / 8}`,
						velocity: 0.1,
					});
				}
				if (matrix[1][i / beatTicks] === 1) {
					renderedNotes.push({
						note: notes[0],
						time: `0:${i / 8}`,
						velocity: 0.1,
					});
				}
			}
		}
		const part = new Tone.Part((time, value) => {
			synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
		}, renderedNotes).start(0);
		metContainer.push(part);
		metContainerSize++;
		// set state
		this.setState({
			renderedNotes: renderedNotes,
			metronomeContainer: metContainer,
			metContainerSize: metContainerSize,
			beatTicks: 8,
			sequenceIndex: 0,
			seqPartContainer: seqPartContainer,
			sequenceContainer: sequenceContainer,
			seqContainerSize: 0,
		});
	}

	generateSequence() {
		console.log('generate sequence');
		const sequenceContainer = this.state.sequenceContainer;
		const seqPartContainer = this.state.seqPartContainer;
		seqPartContainer.forEach(part => part.removeAll());
		let sequenceIndex = 0;
		const notes = this.state.notes;
		console.log(sequenceContainer);
		console.log(sequenceContainer.length);
		const renderedNotes = [];
		for (let i = 0; i < sequenceContainer.length; i++) {
			console.log(i);
			const beatTicks = this.calcBeatTicks(sequenceContainer[i][1]);
			const partLength = sequenceContainer[i][2];
			const loopLength = sequenceIndex + partLength;
			console.log(sequenceContainer[i][3]);
			for (let j = sequenceIndex; j < loopLength; j++) {
				console.log(j);

				if (
					sequenceContainer[i][1] <= 4 &&
					(j - sequenceIndex) % (beatTicks / 2) === 0
				) {
					const placement = this.computeTime(j);
					if (
						sequenceContainer[i][3][0][
							(j - sequenceIndex) / (beatTicks / 2)
						] === 1
					) {
						renderedNotes.push({
							note: notes[1],
							time: placement,
							velocity: 0.1,
						});
					} else if (
						sequenceContainer[i][3][1][
							(j - sequenceIndex) / (beatTicks / 2)
						] === 1
					) {
						renderedNotes.push({
							note: notes[0],
							time: placement,
							velocity: 0.1,
						});
					}
				} else if ((j - sequenceIndex) % beatTicks === 0) {
					const placement = this.computeTime(j);
					console.log(
						'conditional: ' +
							sequenceContainer[i][3][0][
								(j - sequenceIndex) / beatTicks
							]
					);
					console.log('index: ' + (j - sequenceIndex) / beatTicks);
					if (
						sequenceContainer[i][3][0][
							(j - sequenceIndex) / beatTicks
						] === 1
					) {
						renderedNotes.push({
							note: notes[1],
							time: placement,
							velocity: 0.1,
						});
					} else if (
						sequenceContainer[i][3][1][
							(j - sequenceIndex) / beatTicks
						] === 1
					) {
						renderedNotes.push({
							note: notes[0],
							time: placement,
							velocity: 0.1,
						});
					}
				}
			}
			sequenceIndex += partLength;
		}
		const part = new Tone.Part((time, value) => {
			synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
		}, renderedNotes).start(0);
		seqPartContainer.push(part);
		this.setState(
			{
				sequenceIndex: sequenceIndex,
				seqPartContainer: seqPartContainer,
			},
			() => {
				this.playSequence();
			}
		);
	}

	playSequence() {
		this.loopUpdate(false);
		if (this.state.seqIsPlaying) {
			// pause the sequence
			this.setState({ seqIsPlaying: false, playing: false });
			Tone.Transport.stop();
			console.log('sequence stopped');
		} else {
			// clear out reminaing parts
			const metContainer = this.state.metronomeContainer; // holds rendered part so it can be erased or stopped in future
			metContainer.forEach(part => part.removeAll());
			let metContainerSize = 0;
			// do same for sequenceContainer
			// start the sequence
			this.setState({
				seqIsPlaying: true,
				metronomeContainer: metContainer,
				metContainerSize: metContainerSize,
				playing: false,
			});
			Tone.Transport.loopStart = 0;
			Tone.Transport.stop();
			Tone.Transport.start('+0.0');
			console.log('sequence initiated');
		}
	}

	clearSequence() {
		console.log('clearing sequence');
		const sequenceContainer = [];
		let seqPartContainer = this.state.seqPartContainer;
		seqPartContainer.forEach(part => part.removeAll());
		seqPartContainer.forEach(part => seqPartContainer.pop());

		console.log(sequenceContainer);
		let sequenceIndex = 0;
		Tone.Transport.stop();
		this.setState({
			sequenceIndex: sequenceIndex,
			seqPartContainer: seqPartContainer,
			sequenceContainer: sequenceContainer,
		});
	}

	updateTopRow() {
		console.log('updating top row');
		const topRow = document.querySelector('.top-row');
		// console.log(topRow);
		const timeSig = this.state.timeSig;
		// console.log(timeSig);
		const matrix = this.generateSeqMatrix();
		const finalMatrix = this.readCheckboxes(matrix);
		console.log(finalMatrix);
	}

	updateBottomRow() {
		console.log('updating bottom row');
		const bottomRow = document.querySelector('.bottom-row');
		// console.log(bottomRow);
		const timeSig = this.state.timeSig;
		// console.log(timeSig);
		const matrix = this.generateSeqMatrix();
	}

	updateProgressBar() {
		console.log('updating progress bar');
		const progressBar = document.querySelector('.progress-bar');
		// console.log(progressBar);
		const timeSig = this.state.timeSig;
	}

	generateStepSequence() {
		console.log('updating top row');
		const topRow = document.querySelector('.top-row');
		// console.log(topRow);
		const timeSig = this.state.timeSig;
		// console.log(timeSig);
		const matrix = this.generateSeqMatrix();
		console.log(matrix);
		if (timeSig[1] >= 8) {
			topRow.innerHTML = '';
			for (let i = 0; i < timeSig[0]; i++) {
				const element = document.createElement('input');
				element.type = 'checkbox';
				element.key = 'a' + i;
				element.id = 'tr' + i;
				element.className = 'top-row-btn';
				element.checked = i === 0 ? true : false;
				element.onclick = () => {
					this.updateTopRow();
					this.updateMetronome();
				};
				topRow.appendChild(element);
			}
		} else if (timeSig[1] <= 4) {
			topRow.innerHTML = '';
			for (let i = 0; i < timeSig[0] * 2; i++) {
				const element = document.createElement('input');
				element.type = 'checkbox';
				element.key = 'b' + i;
				element.id = 'tr' + i;
				element.className = 'top-row-btn';
				element.checked = matrix[0] === 1 && i === 0 ? true : false;
				element.onclick = () => {
					this.updateTopRow();
					this.updateMetronome();
				};
				topRow.appendChild(element);
			}
		}

		console.log('updating bottom row');
		const bottomRow = document.querySelector('.bottom-row');
		// console.log(bottomRow);

		console.log(matrix);
		if (timeSig[1] >= 8) {
			bottomRow.innerHTML = '';
			for (let i = 0; i < timeSig[0]; i++) {
				const element = document.createElement('input');
				element.type = 'checkbox';
				element.key = 'a' + i;
				element.id = 'br' + i;
				element.className = 'bottom-row-btn';
				element.checked = matrix[i] === 1 && i !== 0 ? true : false;
				element.onclick = () => this.updateBottomRow();
				bottomRow.appendChild(element);
			}
		} else if (timeSig[1] <= 4) {
			bottomRow.innerHTML = '';
			for (let i = 0; i < timeSig[0] * 2; i++) {
				const element = document.createElement('input');
				element.type = 'checkbox';
				element.key = 'b' + i;
				element.id = 'br' + i;
				element.className = 'bottom-row-btn';
				element.checked = matrix[i] === 1 && i !== 0 ? true : false;
				element.onclick = () => this.updateBottomRow();
				bottomRow.appendChild(element);
			}
		}

		console.log('updating progress bar');
		const progressBar = document.querySelector('.progress-bar');
		// console.log(progressBar);

		if (timeSig[1] >= 8) {
			progressBar.innerHTML = '';
			for (let i = 0; i < timeSig[0]; i++) {
				const element = document.createElement('input');
				element.type = 'checkbox';
				element.key = 'a' + i;
				element.id = 'id' + i;
				element.onclick = () => console.log('checkbox button clicked');
				progressBar.appendChild(element);
			}
		} else if (timeSig[1] <= 4) {
			progressBar.innerHTML = '';
			for (let i = 0; i < timeSig[0] * 2; i++) {
				const element = document.createElement('input');
				element.type = 'checkbox';
				element.key = 'b' + i;
				element.id = 'id' + i;
				element.onclick = () => console.log('checkbox button clicked');
				progressBar.appendChild(element);
			}
		}
	}

	render() {
		return (
			<div className="App">
				<div className="title">
					<h1>Multimeter Metronome</h1>
				</div>
				<Transport
					togglePlaying={this.togglePlaying.bind(this)}
					playing={this.state.playing}
					bpm={this.state.bpm}
					updateBPM={this.updateBPM.bind(this)}
					updateMetronome={this.updateMetronome.bind(this)}
				/>
				<Dimension
					timeSig={this.state.timeSig}
					updateTimeSig={this.updateTimeSig.bind(this)}
					exportMeasure={this.exportMeasure.bind(this)}
				/>
				<StepSequence
					updateTopRow={this.updateTopRow.bind(this)}
					generateStepSequence={this.generateStepSequence.bind(this)}
				/>
				<Sequence
					generateSequence={this.generateSequence.bind(this)}
					seqIsPlaying={this.state.seqIsPlaying}
					loopStatus={this.state.loopStatus}
					clearSequence={this.clearSequence.bind(this)}
					sequenceContainer={this.state.sequenceContainer}
					playSequence={this.playSequence.bind(this)}
				/>
			</div>
		);
	}
}

export default App;
