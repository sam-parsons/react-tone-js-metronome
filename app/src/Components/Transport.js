import React from 'react';
import PlayStopButton from './Transport/PlayStopButton.js';
import TempoSlider from './Transport/TempoSlider.js';

class Transport extends React.Component {
    render() {
        return (
            <div>
                <div>Transport Layer</div>
                <PlayStopButton playing={this.props.playing} togglePlaying={this.props.togglePlaying} />
                <TempoSlider bpm={this.props.bpm} updateBPM={this.props.updateBPM} />
            </div>
        )
    }
}

export default Transport;