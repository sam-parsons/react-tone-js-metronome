import React from 'react';
import NumBeats from './Dimension/NumBeats.js';
import RecordButton from './Dimension/RecordButton.js';
import Subdivision from './Dimension/Subdivision.js';

class Dimension extends React.Component {
	render() {
		return (
			<div>
				<div>
					<h4>Dimension Control</h4>
				</div>
				<NumBeats
					timeSig={this.props.timeSig}
					updateTimeSig={this.props.updateTimeSig}
				/>
				<Subdivision
					timeSig={this.props.timeSig}
					updateTimeSig={this.props.updateTimeSig}
				/>
				<RecordButton exportMeasure={this.props.exportMeasure} />
			</div>
		);
	}
}

export default Dimension;
