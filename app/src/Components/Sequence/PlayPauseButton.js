import React from 'react';

class PlayPauseButton extends React.Component {
	render() {
		return (
			<div className="play-pause-btn-div">
				<button
					id="play-pause-btn"
					onClick={() => {
						this.props.generateSequence();
					}}
				>
					Play
				</button>
			</div>
		);
	}
}

export default PlayPauseButton;
