import React, { Component } from 'react';
import './MobilityManagerApp.css';
import Twilio from 'twilio-client';
import Video from '../shared/Video/Video';
import {clientMM} from '../../utils/router.js';
// import PrimaryInfo from './subcomponents/PrimaryInfoView/PrimaryInfo';

class MobilityManagerApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onPhone: false,
            log: 'awaiting...',
            incoming: false,
            inboundStatus: null,
            clientIdentity: clientMM,
            timerDuration: 0, //need this to pass to Video Component 
        }
    }

    createCall = () => {
        const callParameters = { To: 'MMSAM' };
        this.setState({
            log: 'Calling...',
        }, () => {
            Twilio.Device.connect(callParameters);
        });
    }

    endCall = () => {
        Twilio.Device.disconnectAll(() => {
            this.setState({
                onPhone: false,
                log: 'Call ended'
            });
        });
    }

    acceptIncoming = () => {
        this.state.inboundStatus.accept();
        console.log('accept incoming');
    }

    render() {
        return (
            <div className="MobilityManagerApp">
                    <h1><code>SAM5000</code></h1>
                    <Video timerDuration={this.state.timerDuration} clientIdentity={this.state.clientIdentity} />
            </div>
        );
    }
}

export default MobilityManagerApp;