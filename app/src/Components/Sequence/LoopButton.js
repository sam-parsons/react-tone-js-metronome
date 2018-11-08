import React from 'react';

// I really messed up this loop button, really need to rework this entirely
class LoopButton extends React.Component {
	render() {
		return (
			<div className="loop-btn-div">
				<button
					id="loop-btn"
					onClick={() => {
						console.log(this.props.loopStatus);
						const loopStatus =
							this.props.loopStatus === true ? false : true;
						console.log(loopStatus);
						this.setState(
							{
								loopStatus: loopStatus,
							},
							() => {
								const btn = document.querySelector('#loop-btn');
								console.log(btn);
								console.log(
									this.state.loopStatus
										? 'Loop Off'
										: 'Loop On'
								);
								btn.innerHTML = this.props.loopStatus
									? 'Loop Off'
									: 'Loop On';
							}
						);
					}}
				>
					{this.props.loopStatus ? 'Loop Off' : ' Loop On'}
				</button>
			</div>
		);
	}
}

export default LoopButton;
