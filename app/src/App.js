import React, { Component } from 'react';
import './App.css';
import Transport from './Components/Transport.js';
import Dimension from './Components/Dimension.js';
import Sequence from './Components/Sequence.js';
import StepSequence from './Components/StepSequence.js';
import Tone from 'tone';

const synth = new Tone.Synth().toMaster();

class App extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          timeSig: [4,4],
          renderedNotes: [],
          metronomeContainer: [],
          metContainerSize: 0,
          sequenceContainer: [],
          seqContainerSize: 0,
          notes: ["C5", "EB5"],
          tempDivisor: 4,
          beatTicks: 8,
          placement: 0,
          playing: false,
          bpm: 120
      }
  }

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
      document.querySelector('#tempo-value').innerHTML = `Quarters per minute: ${slider}`;
      console.log('updating bpm to ' + slider);
      this.setState({
          bpm: parseInt(slider)
      }, () => console.log(this.state.bpm));
  }

  calcMetLength() {

  }

  calcBeatTicks() {

  }

  generateMetronome() {

  }

  generateSequence() {

  }

  render() {
    return (
      <div className="App">
        <Transport 
            togglePlaying={this.togglePlaying.bind(this)} 
            playing={this.state.playing}
            bpm={this.state.bpm}
            updateBPM={this.updateBPM.bind(this)} />
        <Dimension />
        <StepSequence />
        <Sequence />
      </div>
    );
  }
}

export default App;
