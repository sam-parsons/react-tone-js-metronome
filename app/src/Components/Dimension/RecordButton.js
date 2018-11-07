import React from 'react';

class RecordButton extends React.Component {
	render() {
		return (
			<button id="record-btn" onClick={() => this.props.exportMeasure()}>
				Record
			</button>
		);
	}
}

export default RecordButton;
