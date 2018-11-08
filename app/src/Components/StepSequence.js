import React from 'react';
import TopRow from './StepSequence/TopRow.js';
import BottomRow from './StepSequence/BottomRow.js';
import ProgressBar from './StepSequence/ProgressBar.js';

class StepSequence extends React.Component {
	render() {
		return (
			<div>
				<TopRow onChange={() => this.props.renderStepSequence()} />
				<BottomRow onChange={() => this.props.renderStepSequence()} />
				<ProgressBar />
			</div>
		);
	}
}

export default StepSequence;
