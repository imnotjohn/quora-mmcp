import React, { Component } from 'react';
import './FirstResponderVideoUIView.css';
import '../../helpers/assistance.css';

import videoUIView from '../../img/fr-video-ui.png';

class FirstResponderVideoUIView extends Component {
    render() {
        return (
            <div id="fr-video-container">
                <button type="submit" onClick={this.props.toggleFirstResponderVideoStreamView}><img src={videoUIView} alt="Video UI"/></button>
            </div>
        );
    }
};

export default FirstResponderVideoUIView;