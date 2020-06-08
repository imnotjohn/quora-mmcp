import React, { Component } from 'react';
import './Panel.css';

import Twilio from 'twilio-client'; //test
import MobilityManager from './../../../shared/img/Mobility-Manager.png';
// import Video from '../Video/Video';
import Video from '../../../shared/Video/Video';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            panelStatusText: "Our Mobility Manager will talk to you on this interface in: ",
            videoIsReady: false,
            timerDuration: 10,
            minutes: null,
            seconds: null,
            timerIsRunning: true,
        }
    }

	componentDidMount() {
        fetch('/api/token')
            .then(res => res.json())
            .then((data) => {
                const token = data.token;

                Twilio.Device.setup(token);
            });

        // Configure event handlers for Twilio Device
        Twilio.Device.ready(() => {
            console.log('connected to twilio');

        });

        Twilio.Device.on('disconnect', () => {
            console.log('call has ended');
        });

        Twilio.Device.on('incoming', (connection) => {
            console.log('is incoming');

            this.props.updateStatusText("Mobility Manager: John Doe");

            connection.accept();
            console.log('accepted call');
        });

        // this.useEffect();
        this.handleTimerStart();
    }

    format = (time) => {
        let seconds = time%60;
        let minutes = Math.floor(time/60);
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
        
        console.log(time);
        
        return minutes + ":" + seconds;
    }
    handleTimerStart = () => {
        this.timer = setInterval( () => {
            const newCount = this.state.timerDuration - 1;

            this.setState({
                timerDuration: newCount >= 0 ? newCount : 0
            }, () => {
                console.log(this.state.timerDuration);
            });
        }, 1000);
    }
    handleTimerStop = () => {
        if (this.timer) {
            clearInterval(this.timer);

            this.setState({
                timerIsRunning: false
            });
        }
    }

    didAccept = (e) => {
        e.preventDefault();

        this.props.inboundConnectionStatus.accept();
        console.log('did accept');
    }

    didDeny = (e) => {
        e.preventDefault();

        this.props.inboundConnectionStatus.disconnectAll();
        console.log('did deny');
    }

    render() {
        const time = this.state.timerDuration;

        return (
            <div id="ovu-panel-container">
                <div className="ovu-panel-content-area">
                    {/* <div className="ovu-panel-video-content">
                        <Video clientIdentity={this.props.clientIdentity} timerDuration={this.state.timerDuration} />
                    </div> */}
                    {
                        ( () => {
                            if (this.state.timerDuration !== 0) {
                                return (
                                    <div className="ovu-panel-video-img">
                                        <img alt="mobilitymanager" src={MobilityManager} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="ovu-panel-video-content">
                                        <Video clientIdentity={this.props.clientIdentity} timerDuration={this.state.timerDuration} />
                                    </div>
                                )
                            }
                        })()
                    }

                    <div className="ovu-panel-status-text">
                        {
                            ( () => {
                                if (this.state.timerDuration !== 0) {
                                    return (
                                        <>
                                        <span>{this.state.panelStatusText}</span><p />
                                        <span>Estimated Time:</span><br />
                                        <span>{this.format(time)}</span>
                                        </>
                                    );
                                } else {
                                    return (
                                        <div id="ovu-panel-mobility-manager-nametag">
                                            Mobility Manager : <span>James Cameron</span>
                                        </div>
                                    );
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;
