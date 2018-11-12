import React from 'react';

class PlayStopButton extends React.Component {
	render() {
		return (
			<div id="play-stop-div">
				<button
					className="top-btns"
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
