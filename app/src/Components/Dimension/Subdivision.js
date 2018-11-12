import React from 'react';

class Subdivision extends React.Component {
	render() {
		return (
			<div className="subdivision-div">
				<select
					id="subdivision-input"
					defaultValue="2"
					onChange={() => this.props.updateTimeSig()}
				>
					<option value="1">2</option>
					<option value="2">4</option>
					<option value="3">8</option>
					<option value="4">16</option>
					<option value="5">32</option>
				</select>
				<div id="subdivision-desc">subdivision</div>
			</div>
		);
	}
}

export default Subdivision;

/**
 * 					type="range"
					min="1"
					max="5"
					defaultValue="2"
 */
