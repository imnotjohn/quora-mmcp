import React, { Component } from 'react';
import './FirstResponderResourcesView.css';
import { setTransitionTimeout } from '../../../../utils/helper';

class FirstResponderResourcesView extends Component {
    componentDidMount() {
        setTransitionTimeout(4000, this.props.toggleFirstResponderRoboTaxiInfoView);
    }

    render() {
        return (
            <div id="first-responder-resources-container">

                <div id="resources-text-container">
                    <span className="resources-list-header">Hi, I am a Mobility Manager</span>
                    <br />
                    <span className="resources-list-header">Available resources are :</span>

                    <div className="resources-list-item">
                        <span className="resources-list-bullet">•</span> robo-taxi registration and info
                    </div>
                    <div className="resources-list-item">
                        <span className="resources-list-bullet">•</span> accident timeline
                    </div>
                    <div className="resources-list-item">
                        <span className="resources-list-bullet">•</span> footage of accident captured by vehicle
                    </div>
                </div>
            </div>
        )
    }
}

export default FirstResponderResourcesView;