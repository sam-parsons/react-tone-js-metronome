import React from 'react';

class PlayStopButton extends React.Component {
	render() {
		return (
			<div id="play-stop-div">
				<button
					id="play-stop-btn"
					onClick={() => {
						this.props.updateMetronome();
						this.props.togglePlaying();
					}}
				>
					{this.props.playing ? 'Stop' : 'Play'}
				</button>
			</div>
		);
	}
}

export default PlayStopButton;
