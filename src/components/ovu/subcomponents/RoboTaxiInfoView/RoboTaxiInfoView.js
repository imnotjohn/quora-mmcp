import React, { Component } from 'react';
import './RoboTaxiInfoView.css';
import '../../helpers/assistance.css';

import roboTaxiInfoImage from '../../img/robotaxi-info-v2.png';
import {setTransitionTimeout} from '../../../../utils/helper';

class RoboTaxiInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 3,
            image: 1
        }
    }

    changeImageHandler = (e) => {
        e.preventDefault();

        this.setState({
            image: this.state.image + 1
        }, () => {
            console.log(this.state.image)
        });
    }

    componentDidMount() {
        setTransitionTimeout(6000, this.props.toggleClaimView);
    }

    render() {
        return (

            <div className="assistance-content-container">
            <div className="subheader-breadcrumb-container">
                <div className="header-breadcrumb-counter">{`${this.state.currentView}/4`}</div>
                <span className="subheader-breadcrumb-text">Information Exchange</span>
            </div>
            <div className="header-breadcrumb-container">
                <span>Robo Taxi Details</span>
            </div>

            <div className="robotaxi-main-content">
                <img src={roboTaxiInfoImage} alt="robotaxi information"/>
            </div>
            {/* <div className="robotaxi-footer-content"> */}
                    {/* <button className="robotaxi-info-confirm-button" type="submit" onClick={ this.props.toggleClaimView }>Confirm &#x3e;</button> */}
            {/* </div> */}

            <div className="footer-breadcrumb-container">
                <div className="footer-breadcrumb active"/>
                <div className="footer-breadcrumb active"/>
                <div className="footer-breadcrumb active"/>
                <div className="footer-breadcrumb inactive"/>
            </div>
            </div>

        );
    }
};

export default RoboTaxiInfoView;