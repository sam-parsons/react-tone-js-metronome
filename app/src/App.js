import React, { Component } from 'react';
import './App.css';
import Transport from './Components/Transport.js';
import Dimension from './Components/Dimension.js';
import Sequence from './Components/Sequence.js';
import StepSequence from './Components/StepSequence.js';
import MeasureContainer from './Components/MeasureContainer.js';
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
			visualizeIndex: 0,
			eventCache: [],
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
		).innerHTML = `Quarter notes per minute: ${slider}`;
		// console.log('updating bpm to ' + slider);
		this.setState({
			bpm: parseInt(slider),
		});
		Tone.Transport.bpm.value = parseInt(slider);
	}

	updateTimeSig() {
		const top = document.querySelector('#num-beats-input');
		// redo this with new select tag
		const bottom = document.querySelector('#subdivision-input');
		// console.log(bottom.value);
		const bottomDisplay = document.querySelector('#subdivision-display');
		// console.log(bottomDisplay);
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
		// bottomDisplay.innerHTML = Math.pow(2, parseInt(bottom.value));
	}

	updateMeasureSequence() {
		console.log('updating measure sequencing');
		const measureBoxDiv = document.querySelector('#measure-box');
		const square = document.createElement('div');
		square.className = 'square';
		square.key = 'm' + this.state.seqContainerSize;
		const content = document.createElement('div');
		content.className = 'content';
		content.key = 'c' + this.state.seqContainerSize;
		const contentContent =
			this.state.timeSig[0] + ' / ' + this.state.timeSig[1];
		content.innerHTML = contentContent;
		square.appendChild(content);
		measureBoxDiv.appendChild(square);
	}

	clearMeasureSequence() {
		console.log('clearing measure sequencer');
		const masterDiv = document.querySelectorAll('#measure-box div.square');
		console.log('masterDiv: ' + masterDiv.length);
		for (let i = 0; i < masterDiv.length; i++) {
			masterDiv[i].remove();
		}
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
				this.updateMeasureSequence();
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

	calcSeqLength() {
		console.log('calculating the length of the sequence');
		const seqContainer = this.state.sequenceContainer;
		let total = 0;
		for (let i = 0; i < seqContainer.length; i++) {
			total += seqContainer[i][2];
		}
		console.log('total: ' + total);
		return total;
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
		let j;
		const sequenceContainer = this.state.sequenceContainer;
		// console.log('sequenceContainer: ' + sequenceContainer[0][2]);
		const seqPartContainer = this.state.seqPartContainer;
		seqPartContainer.forEach(part => part.removeAll());
		let sequenceIndex = 0;
		let totalSeqLength = 0;
		for (let i = 0; i < sequenceContainer.length; i++) {
			totalSeqLength += sequenceContainer[i][2];
		}
		console.log('total sequence length: ' + totalSeqLength);
		const notes = this.state.notes;
		console.log(sequenceContainer);
		console.log('sequence container length: ' + sequenceContainer.length);
		const renderedNotes = [];
		const eventCache = this.state.eventCache;
		if (eventCache.length !== 0) {
			eventCache.forEach(ID => Tone.Transport.clear(ID));
		}
		for (let i = 0; i < sequenceContainer.length; i++) {
			console.log(i);
			if (i === 0) {
				j = 0;
			}

			const beatTicks = this.calcBeatTicks(sequenceContainer[i][1]);
			const partLength = sequenceContainer[i][2];
			const loopLength = sequenceIndex + partLength;
			console.log(sequenceContainer[i][3]);
			// schedule visualization change here

			const tempEventID = this.repeatSchedule(j, totalSeqLength);
			eventCache.push(tempEventID);

			for (j = sequenceIndex; j < loopLength; j++) {
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
				eventCache: eventCache,
			},
			() => {
				this.calcSeqLength();
				this.playSequence();
			}
		);
	}

	playSequence() {
		// this.loopUpdate(false);
		if (this.state.seqIsPlaying) {
			// pause the sequence
			this.setState({ seqIsPlaying: false, playing: false });
			Tone.Transport.stop();
			this.removeVisualizeClass();
			console.log('sequence stopped');
		} else {
			console.log('loopStart ' + Tone.Transport.loopStart);
			console.log('loopEnd ' + Tone.Transport.loopEnd);
			console.log('loop: ' + Tone.Transport.loop);
			if (this.state.loopStatus === false) {
				this.scheduleSeqTermination();
			}
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
				visualizeIndex: 0,
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
		this.setState(
			{
				sequenceIndex: sequenceIndex,
				seqPartContainer: seqPartContainer,
				sequenceContainer: sequenceContainer,
			},
			() => {
				this.clearMeasureSequence();
			}
		);
	}

	scheduleSeqTermination() {
		console.log('scheduling sequence termination');
		const time = this.computeTime(this.calcSeqLength() + 1);
		Tone.Transport.scheduleOnce(() => {
			this.playSequence();
			this.setState({
				sequenceIndex: 0,
				visualizeIndex: 0,
				seqIsPlaying: false,
				loopStatus: false,
				playing: false,
			});
		}, time);
	}

	updateSeqLoop() {
		console.log('updating sequence loop settings');
		if (this.state.loopStatus === true) {
			Tone.Transport.loopEnd = 0;
			Tone.Transport.loop = false;
			this.setState({
				loopStatus: false,
			});
		} else {
			Tone.Transport.loopEnd = this.computeTime(this.calcSeqLength());
			Tone.Transport.loop = true;
			console.log(Tone.Transport.loop);
			this.setState({
				loopStatus: true,
				visualizeIndex: 0,
			});
		}
	}

	repeatSchedule(index, duration) {
		return Tone.Transport.scheduleRepeat(
			this.visualizeNextSquare.bind(this),
			duration,
			this.computeTime(index)
		);
	}

	visualizeNextSquare() {
		console.log('visualizing next square');
		console.log(this.state.visualizeIndex);
		const size = this.state.seqContainerSize;
		let index = this.state.visualizeIndex;
		const box = document.querySelectorAll('#measure-box div.square');
		if (index === 0) {
			box[0].classList.add('visualize');
			if (box[size - 1].classList.contains('visualize')) {
				box[size - 1].classList.remove('visualize');
			}
		} else {
			box[index - 1].classList.remove('visualize');
			box[index].classList.add('visualize');
		}
		let indexPlusOne = index + 1;
		if (indexPlusOne === size) {
			indexPlusOne = 0;
		}
		this.setState({ visualizeIndex: indexPlusOne });
	}

	removeVisualizeClass() {
		console.log('removing visualize classes from squares');
		const squares = document.querySelectorAll('#measure-box div.square');
		squares.forEach(square => {
			if (square.classList.contains('visualize')) {
				square.classList.remove('visualize');
			}
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
				const div = document.createElement('div');
				div.key = 'd' + i;
				div.className = 'top-row-shell';
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
				const label = document.createElement('label');
				label.key = 'k' + i;
				label.for = 'top-row';

				div.appendChild(element);
				div.appendChild(label);
				topRow.appendChild(div);
			}
		} else if (timeSig[1] <= 4) {
			topRow.innerHTML = '';
			for (let i = 0; i < timeSig[0] * 2; i++) {
				const div = document.createElement('div');
				div.key = 'd' + i;
				div.className = 'top-row-shell';
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
				const label = document.createElement('label');
				label.key = 'k' + i;
				label.for = 'top-row';
				div.appendChild(element);
				div.appendChild(label);
				topRow.appendChild(div);
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
					<h3>Multimeter Metronome</h3>
				</div>
				<Transport />
				<Dimension
					timeSig={this.state.timeSig}
					updateTimeSig={this.updateTimeSig.bind(this)}
					exportMeasure={this.exportMeasure.bind(this)}
					updateMetronome={this.updateMetronome.bind(this)}
					togglePlaying={this.togglePlaying.bind(this)}
					playing={this.state.playing}
					bpm={this.state.bpm}
					updateBPM={this.updateBPM.bind(this)}
				/>
				<StepSequence
					updateTopRow={this.updateTopRow.bind(this)}
					generateStepSequence={this.generateStepSequence.bind(this)}
				/>
				<div className="sequence-section">
					<h3>Measure Sequencer</h3>
				</div>
				<Sequence
					generateSequence={this.generateSequence.bind(this)}
					seqIsPlaying={this.state.seqIsPlaying}
					loopStatus={this.state.loopStatus}
					clearSequence={this.clearSequence.bind(this)}
					sequenceContainer={this.state.sequenceContainer}
					playSequence={this.playSequence.bind(this)}
					updateSeqLoop={this.updateSeqLoop.bind(this)}
				/>
				<MeasureContainer />
			</div>
		);
	}
}

export default App;
