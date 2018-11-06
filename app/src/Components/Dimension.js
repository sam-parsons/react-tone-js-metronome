import React from 'react';
import NumBeats from './Dimension/NumBeats.js';
import RecordButton from './Dimension/RecordButton.js';
import Subdivision from './Dimension/Subdivision.js';

class Dimension extends React.Component {
    render() {
        return (
            <div>
                <div>Dimensions</div>
                <NumBeats />
                <Subdivision />
                <RecordButton />
            </div>
        )
    }
}

export default Dimension;