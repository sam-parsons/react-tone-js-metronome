import React from 'react';
// import PlayStopButton from './Transport/PlayStopButton.js';
// import TempoSlider from './Transport/TempoSlider.js';

class Transport extends React.Component {
	render() {
		return (
			<div>
				<div>{/* <h4>Transport Layer</h4> */}</div>
				{/* <PlayStopButton
					playing={this.props.playing}
					togglePlaying={this.props.togglePlaying}
					updateMetronome={this.props.updateMetronome}
				/> Moved to Dimension*/}
				{/* <TempoSlider
					bpm={this.props.bpm}
					updateBPM={this.props.updateBPM}
				/> Also moved to dimension */}
			</div>
		);
	}
}

export default Transport;
