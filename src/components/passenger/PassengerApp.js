import React, { Component } from 'react';
import './PassengerApp.css';

import Panel from './../shared/Panel/Panel';
import {clientPASS} from '../../utils/router.js';
import {setTransitionTimeout} from '../../utils/helper.js';

import video1 from './img/video1.mp4';
import video2 from './img/video2.mp4';
import video3 from './img/video3.mp4';
import video4 from './img/video4.mp4';
import video5 from './img/video5.mp4';
import video6 from './img/video6.mp4';

import png1 from './img/video1.png';
import png2 from './img/video2.png';
import png3 from './img/video3.png';
import png4 from './img/video4.png';
import png5 from './img/video5.png';
import png6 from './img/video6.png';

import alertClaimID from './img/alert-claimID.png';
import alertRoboTaxi from './img/alert-roboTaxi.png';

const viewContainer = [video1, video2, video3, video4, video5, video6];
const pngContainer = [png1, png2, png3, png4, png5, png6];

let imgSrc = '';

class PassengerApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientIdentity: clientPASS,
            isPanel: false,
            current: 0,
        }
    }

    toggleNextView = (e) => {
        if (e) {
            e.preventDefault();
        }

        // check whether or not Panel Component should be toggled based on current View value
        this.togglePanel();
        
        // increment current state value based on length of Container array
        if (this.state.current < viewContainer.length-1) {
            this.setState({
                current: this.state.current + 1,
            });
        } 
    }

    togglePanel = () => {
        if (this.state.current === 0 && this.state.current < 4) {
            this.setState({
                isPanel: true,
            });
        } else if (this.state.current === 4) {
            this.setState({
                isPanel: false,
            });
        }
    }

    componentDidMount() {
        setTransitionTimeout(11900, this.toggleNextView);
    }

    render() {
        let viewCounter = this.state.current;
        let videoPath = viewContainer[viewCounter];
        let pngPath = pngContainer[viewCounter];

        return (
            <div className="App">
                <div id="content-area">
                    <div id="content-panel-wrapper" className={this.state.isPanel ? "is-content-panel-visible" : "content-panel-wrapper"}>
                        {
                            ( () => {
                                if (this.state.isPanel) {
                                    return (
                                        <Panel clientIdentity={this.state.clientIdentity}  updateStatusText={this.updatePanelStatusText} waitingStatus={this.state.isWaiting} />
                                    );
                                } else {
                                    return null;
                                }
                            })()
                        }
                    </div>

                    <div id="content-area-wrapper" className="content-area-wrapper">
                        <div id="primary-content-container">
                            
                            {( () => {
                                let {imgSrc} = '';
                                switch (this.state.current) {
                                    case 4:
                                        imgSrc = alertClaimID;
                                        break;
                                    // case 5:
                                    //     imgSrc = alertRoboTaxi;
                                    //     break;
                                    default:
                                        return;
                                }

                                return (
                                    <div style={ this.state.current === 5 ? {width: 120 + '%'} : {}}  onClick={this.toggleNextView} id="alert-container">
                                        <img style={ this.state.current === 5 ? {marginLeft: 33 + '%'} : {}} src={imgSrc} alt="alert" />
                                    </div>
                                )
                            })()
                            }

                            <button onClick={ this.toggleNextView } type="submit" id="media-button" alt="media view">
                                <video key={videoPath} autoPlay>
                                    <source src={videoPath} type="video/mp4" />
                                </video>
                                    <img src={pngPath} alt="buffer" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassengerApp;