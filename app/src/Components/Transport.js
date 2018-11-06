import React from 'react';
import PlayStopButton from './Transport/PlayStopButton.js';
import TempoSlider from './Transport/TempoSlider.js';

class Transport extends React.Component {
    render() {
        return (
            <div>
                <div>Transport Layer</div>
                <PlayStopButton />
                <TempoSlider />
            </div>
        )
    }
}

export default Transport;