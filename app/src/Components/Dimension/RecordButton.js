import React from 'react';

class RecordButton extends React.Component {
	render() {
		return (
			<button
				className="top-btns"
				id="record-btn"
				onClick={() => this.props.exportMeasure()}
			>
				Export
			</button>
		);
	}
}

export default RecordButton;
