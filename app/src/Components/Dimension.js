import React from 'react';
import NumBeats from './Dimension/NumBeats.js';
import RecordButton from './Dimension/RecordButton.js';
import Subdivision from './Dimension/Subdivision.js';
import PlayStopButton from './Dimension/PlayStopButton.js';
import TempoSlider from './Dimension/TempoSlider.js';

class Dimension extends React.Component {
	render() {
		return (
			<div className="dimension">
				<div className="time-signature">
					<NumBeats
						timeSig={this.props.timeSig}
						updateTimeSig={this.props.updateTimeSig}
						generateMetronome={this.props.generateMetronome}
					/>
					<Subdivision
						timeSig={this.props.timeSig}
						updateTimeSig={this.props.updateTimeSig}
					/>
				</div>
				<div className="play-export">
					<PlayStopButton
						togglePlaying={this.props.togglePlaying}
						playing={this.props.playing}
						updateMetronome={this.props.updateMetronome}
					/>
					<RecordButton exportMeasure={this.props.exportMeasure} />
				</div>
				<TempoSlider
					updateBPM={this.props.updateBPM}
					bpm={this.props.bpm}
				/>
			</div>
		);
	}
}

export default Dimension;
