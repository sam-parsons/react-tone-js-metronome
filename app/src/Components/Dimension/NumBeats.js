import React from 'react';

class NumBeats extends React.Component {
	render() {
		return (
			<div className="num-beats-div">
				<input
					type="number"
					id="num-beats-input"
					min="2"
					max="20"
					defaultValue="4"
					onChange={() => this.props.updateTimeSig()}
				/>
			</div>
		);
	}
}

export default NumBeats;
