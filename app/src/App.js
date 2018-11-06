import React, { Component } from 'react';
import './App.css';
import Transport from './Components/Transport.js';
import Dimension from './Components/Dimension.js';
import Sequence from './Components/Sequence.js';
import StepSequence from './Components/StepSequence.js';

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
          placement: 0  
      }
  }

  computeTime(index) {
        console.log('computer time');
  }

  render() {
    return (
      <div className="App">
        <Transport />
        <Dimension />
        <StepSequence />
        <Sequence />
      </div>
    );
  }
}

export default App;
