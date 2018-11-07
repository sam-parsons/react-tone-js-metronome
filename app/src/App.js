import React, { Component } from 'react';
import './App.css';
import Transport from './Components/Transport.js';
import Dimension from './Components/Dimension.js';
import Sequence from './Components/Sequence.js';
import StepSequence from './Components/StepSequence.js';
import Tone from 'tone';

const synth = new Tone.Synth().toMaster();

// Sample data begin
// const sampleNotes = [];
// for (let i = 0; i < 8; i++) {
// 	sampleNotes.push({
// 		note: 'C5',
// 		time: `0:${i}`,
// 		velocity: 0.1,
// 	});
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
			notes: ['C5', 'EB5'],
			tempDivisor: 4,
			beatTicks: 8,
			placement: 0,
			playing: false,
			bpm: 120,
		};
	}

	//lifecycle methods

	computeTime(index) {
		console.log('computer time');
	}

	togglePlaying() {
		if (this.state.playing) {
			this.setState({ playing: false });
			Tone.Transport.stop();
			console.log('playing stopped');
		} else {
			this.setState({ playing: true });
			Tone.Transport.start('+0.0');
			console.log('playing initiated');
		}
	}

	updateBPM() {
		const slider = document.querySelector('#tempo-sld').value;
		document.querySelector(
			'#tempo-value-header'
		).innerHTML = `Quarters per minute: ${slider}`;
		console.log('updating bpm to ' + slider);
		this.setState(
			{
				bpm: parseInt(slider),
			},
			() => console.log(this.state.bpm)
		);
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
				console.log(this.state.timeSig);
				this.generateMetronome();
			}
		);
		bottomDisplay.innerHTML = Math.pow(2, parseInt(bottom.value));
	}

	exportMeasure() {
		console.log('exporting measure');
	}

	calcMetLength(timeSig) {
		console.log('calculate metronome length');
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
		console.log('calculate beat ticks');
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

	// need to make calcMetLength and calcBeatTicks for this to dynamically function
	generateMetronome() {
		console.log('generate metronome');
		// erase or stop all previous parts
		Tone.Transport.cancel();
		const metContainer = this.state.metronomeContainer; // holds rendered part so it can be erased or stopped in future
		metContainer.forEach(part => part.removeAll());
		let metContainerSize = 0;
		const timeSig = this.state.timeSig;
		console.log(timeSig);
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
				console.log('time: 0:' + i / beatTicks);
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

	generateSequence() {
		console.log('generate sequence');
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
				/>
				<Dimension
					timeSig={this.state.timeSig}
					updateTimeSig={this.updateTimeSig.bind(this)}
					exportMeasure={this.exportMeasure.bind(this)}
				/>
				<StepSequence />
				<Sequence />
			</div>
		);
	}
}

export default App;
