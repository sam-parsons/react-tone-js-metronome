import React from 'react';
import ClearButton from './Sequence/ClearButton.js';
import LoopButton from './Sequence/LoopButton.js';
import PlayPauseButton from './Sequence/PlayPauseButton.js';

class Sequence extends React.Component {
	render() {
		return (
			<div>
				<div>
					<h4>Sequence Controls</h4>
				</div>
				<PlayPauseButton
					generateSequence={this.props.generateSequence}
					seqIsPlaying={this.props.seqIsPlaying}
				/>
				<LoopButton loopStatus={this.props.loopStatus} />
				<ClearButton clearSequence={this.props.clearSequence} />
			</div>
		);
	}
}

export default Sequence;
