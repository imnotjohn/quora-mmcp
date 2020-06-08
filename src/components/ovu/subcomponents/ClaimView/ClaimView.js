import React, { Component } from 'react';
import './ClaimView.css';
import '../../helpers/assistance.css';

import email from './../../img/claim-view-email.png';
import chat from './../../img/claim-view-chat.png';
import voice from './../../img/claim-view-voice.png';

class ClaimView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 4,
        }
    }

    render() {
        return (
            <div className="assistance-content-container">
            <div className="subheader-breadcrumb-container">
                <div className="header-breadcrumb-counter">{`${this.state.currentView}/4`}</div>
                <span className="subheader-breadcrumb-text">Followup Instructions</span>
            </div>
            <div className="header-breadcrumb-container">
                <span>Claim ID: #1234ABCD21</span>
            </div>

            <div className="claim-main-content">
                <span className="assistance-row">
                    {/* <span className="assistance-img-text"> */}
                        <img alt="chat" src={chat}/>
                        You will receive text message updates on the status of assistance you have requested.
                    {/* </span> */}
                </span>
                <span className="assistance-row">
                    {/* <span className="assistance-img-text"> */}
                        <img alt="email" src={email}/>
                        An email with post-accident follow up instructions and your Claim ID will be sent to you.
                    {/* </span> */}
                </span>
                <span className="assistance-row">
                    {/* <span className="assistance-img-text"> */}
                        <img alt="voice" src={voice}/>
                        Our claim helpline is +1 (657) 894 9783<br />
                    {/* </span> */}
                </span>
            </div>
            <div className="assistance-footer-content">
                {/* <button className="confirm-button" type="submit" onClick={ this.props.toggleClaimView }>Done</button> */}
            </div>

            <div className="footer-breadcrumb-container">
                <div className="footer-breadcrumb active"/>
                <div className="footer-breadcrumb active"/>
                <div className="footer-breadcrumb active"/>
                <div className="footer-breadcrumb active"/>
            </div>
            </div>
        );
    }
};

export default ClaimView;