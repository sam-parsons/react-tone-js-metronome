import React from 'react';
import ClearButton from './Sequence/ClearButton.js';
import LoopButton from './Sequence/LoopButton.js';
import PlayPauseButton from './Sequence/PlayPauseButton.js';
import StopButton from './Sequence/StopButton.js';

class Sequence extends React.Component {
    render() {
        return (
            <div>
                <div>Sequence</div>
                <PlayPauseButton />
                <StopButton />
                <LoopButton />
                <ClearButton />
            </div>
        )
    }
}

export default Sequence;