import React from 'react';

class ClearButton extends React.Component {
	render() {
		return (
			<div className="clear-btn-div">
				<button
					id="clear-btn"
					onClick={() => this.props.clearSequence()}
				>
					Clear
				</button>
			</div>
		);
	}
}

export default ClearButton;
