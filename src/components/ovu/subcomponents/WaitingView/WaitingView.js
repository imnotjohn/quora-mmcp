import React, { Component } from 'react';
import './WaitingView.css';

import waitingview1 from '../../img/waiting-view-1.png';
import waitingview2 from '../../img/waiting-view-2.png';
import waitingview3 from '../../img/waiting-view-3.png';

class WaitingView extends Component {

    render() {
        return (
            <div id="waiting-view-container">
                <div id="waiting-view-container-header">
                    <span>while you wait</span>
                </div>
                <div id="waiting-view-container-content">
                    <div className="waiting-view-content">
                        <div className="waiting-view-img">
                            <img src={waitingview1} alt="reminder1" />
                        </div>
                        <div className="waiting-view-content-text">
                            <span>Stay Safe:</span><br />
                            Make sure you and your vehicle's passengers are in a safe place.
                        </div>
                    </div>
                    <div className="waiting-view-content">
                        <div className="waiting-view-img">
                            <img src={waitingview2} alt="reminder2" />
                        </div>
                        <div className="waiting-view-content-text">
                            <span>Prepare Documents:</span><br />
                            Driver's License, Car Registration, and Insurance Papers.
                        </div>
                    </div>
                    <div className="waiting-view-content">
                        <div className="waiting-view-img">
                            <img src={waitingview3} alt="reminder3" />
                        </div>
                        <div className="waiting-view-content-text">
                            <span>Take photographs:</span><br />
                            Photographs of the accident will help with insurance claims.
                        </div>
                    </div>
                </div>
                <div id="waiting-view-reminder">
                    <span>Please return to this interface to talk to the mobility manager</span>
                </div>
                {/* <button onClick={ this.props.togglePrimaryInfo } type="submit">primary info view</button> */}
            </div>
        );
    }
};

export default WaitingView;