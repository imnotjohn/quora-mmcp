import React, { Component } from 'react';
import './FirstResponderTimelineView.css';
import '../../helpers/assistance.css';
import {setTransitionTimeout} from '../../../../utils/helper.js';

import timelineImage from '../../img/fr-timeline.png';

class FirstResponderTimelineView extends Component {
    componentDidMount() {
        setTransitionTimeout(4000, this.props.toggleFirstResponderVideoUIView);
    }

    render() {
        return (
            <div id="fr-spacer-container">
                <div className="header-breadcrumb-container">
                    <span>Accident Timeline</span>
                </div>

                <div className="fr-timeline-main-content">
                    <img src={timelineImage} alt="accident timeline"/>
                </div>
            </div>

        );
    }
};

export default FirstResponderTimelineView;