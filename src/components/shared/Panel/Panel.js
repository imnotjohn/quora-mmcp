import React, { Component } from 'react';
import './Panel.css';

import mobilitymanagerlogo from './../img/Mobility-Manager-Logo.png';
import mobilitymanager from './../img/Mobility-Manager.png';
import Video from './../Video/Video';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoIsReady: false,
            timerDuration: 10,
            minutes: null,
            seconds: null,
            timerIsRunning: true,
            mmText: '',
            mmTitle: 'Mobility Manager:',
            mmName: 'James Cameron',
        }
    }

	componentDidMount() {
        this.setClientState(this.props.clientIdentity);
    }

    setClientState = (client) => {
        switch(client) {
            case 'PASS':
                this.setState({
                    mmText: 'The Mobility Manager is talking to the other passenger. They will contact you on this device in a moment.',
                });
                break;
            case 'OVU':
                this.setState({
                    mmText: "Our Mobility Manager will talk to you on this interface in: ",
                }, () => {
                    this.handleTimerStart();
                });
                break;
            default:
                return;
        }
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
        const mmText = this.state.mmText;
        const mmTitle = this.state.mmTitle;
        const mmName = this.state.mmName;

        return (
            <div id="panel-container">
                { 
                    ( () => {
                        if (this.props.clientIdentity === 'PASS') {
                            return (
                                <div className="panel-header">
                                    <div className="panel-header-img-container">
                                        <img src={mobilitymanagerlogo} className="panel-header-img" alt="mobility-manager-logo"></img>
                                    </div>
                                    <div className="panel-header-mm-details">
                                        <span className="title">{mmTitle}</span>
                                        <span className="name">{mmName}</span>
                                    </div>
                                </div>
                            ) 
                        } else {
                            return null;
                        }
                    })()
                }

                <div className="panel-content-area">
                    {
                        ( () => {
                            if (this.props.clientIdentity === 'OVU' && this.state.timerDuration !== 0) {
                                return (
                                    <div className="passenger-panel-video-img">
                                        <img alt="mobilitymanager" src={mobilitymanager} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="passenger-panel-video-content">
                                        <Video clientIdentity={this.props.clientIdentity} togglePrimaryInfo={this.props.togglePrimaryInfo} timerDuration={this.state.timerDuration}/>
                                    </div>
                                )
                            }
                        })()
                    }

                    <div className="passenger-panel-status-text">
                        {
                            ( () => {
                                if (this.props.clientIdentity === 'OVU' && this.state.timerDuration !== 0) {
                                    return (
                                        <>
                                            <span>{mmText}</span><p />
                                            <span>{this.format(time)}</span>
                                        </>
                                    );
                                } else {
                                    return (
                                        <div id="passenger-panel-mobility-manager-nametag">
                                            {mmTitle}<br /><span>{mmName}</span>
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
