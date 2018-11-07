import React from 'react';

class Subdivision extends React.Component {
	render() {
		return (
			<div className="subdivision-div">
				<input
					id="subdivision-input"
					type="range"
					min="1"
					max="5"
					defaultValue="2"
					onChange={() => this.props.updateTimeSig()}
				/>
				<div>
					<span id="subdivision-display">4</span>
				</div>
			</div>
		);
	}
}

export default Subdivision;
