import React from 'react';

class PlayPauseButton extends React.Component {
	render() {
		return (
			<div className="play-pause-btn-div">
				<button
					id="play-pause-btn"
					className="bottom-btns"
					onClick={() => {
						if (this.props.sequenceContainer.length === 0) {
							console.log('nothing to play');
						} else {
							if (this.props.seqIsPlaying === true) {
								console.log(
									'stopping, not generating sequence'
								);
								this.props.playSequence();
							} else {
								this.props.generateSequence();
							}
						}
					}}
				>
					{this.props.seqIsPlaying ? 'Stop' : 'Play'}
				</button>
			</div>
		);
	}
}

export default PlayPauseButton;
