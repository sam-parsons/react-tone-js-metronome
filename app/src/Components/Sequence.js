import React from 'react';
import ClearButton from './Sequence/ClearButton.js';
import LoopButton from './Sequence/LoopButton.js';
import PlayPauseButton from './Sequence/PlayPauseButton.js';

class Sequence extends React.Component {
	render() {
		return (
			<div className="sequence-transport">
				<PlayPauseButton
					generateSequence={this.props.generateSequence}
					seqIsPlaying={this.props.seqIsPlaying}
					sequenceContainer={this.props.sequenceContainer}
					playSequence={this.props.playSequence}
				/>
				<LoopButton
					loopStatus={this.props.loopStatus}
					updateSeqLoop={this.props.updateSeqLoop}
					seqIsPlaying={this.props.seqIsPlaying}
				/>
				<ClearButton clearSequence={this.props.clearSequence} />
			</div>
		);
	}
}

export default Sequence;
