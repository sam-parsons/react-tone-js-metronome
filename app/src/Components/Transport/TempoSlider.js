import React from 'react';

class TempoSlider extends React.Component {
	render() {
		return (
			<div id="tempo-div">
				<input
					id="tempo-sld"
					type="range"
					min="30"
					max="260"
					defaultValue="120"
					onChange={() => this.props.updateBPM()}
				/>
				<div id="tempo-value">
					<h5>Quarter notes per minute: {this.props.bpm}</h5>
				</div>
			</div>
		);
	}
}

export default TempoSlider;
