import React, { Component } from 'react';
import './FirstResponderRoboTaxiInfoView.css';
import '../../helpers/assistance.css';
import {setTransitionTimeout} from '../../../../utils/helper.js';

import roboTaxiInfoImage from '../../img/fr-robotaxi-info-v2.png';

class FirstResponderRoboTaxiInfoView extends Component {
    componentDidMount() {
        setTransitionTimeout(4000, this.props.toggleFirstResponderTimelineView);
    }

    render() {
        return (
            <div id="fr-spacer-container">
                <div className="header-breadcrumb-container">
                    <span>Robo-Taxi Details (Nissan Leaf)</span>
                </div>

                <div className="fr-robotaxi-main-content">
                    <img src={roboTaxiInfoImage} alt="robotaxi information"/>
                </div>
            </div>

        );
    }
};

export default FirstResponderRoboTaxiInfoView;