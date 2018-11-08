import React from 'react';

class TopRow extends React.Component {
	render() {
		return (
			<div className="top-row" onClick={() => this.props.updateTopRow()}>
				Top Row
			</div>
		);
	}
}

export default TopRow;
