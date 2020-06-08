import React, { Component } from 'react';
import './FirstResponderVideoStreamView.css';
import '../../helpers/assistance.css';

import videoStream from '../../img/rearend.mp4';

class FirstResponderVideoStreamView extends Component {
    render() {
        return (
            <div id="fr-stream-container">
                <video type="video/mp4" autoPlay={true} src={videoStream} />
            </div>

        );
    }
};

export default FirstResponderVideoStreamView;