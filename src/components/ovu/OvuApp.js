import React, { Component } from 'react';
import './OvuApp.css';

import Header from './../shared/Header/Header';
import StatusHeader from './subcomponents/StatusHeader/StatusHeader';
import DefaultView from './subcomponents/DefaultView/DefaultView';
import EngageButton from './subcomponents/EngageButton/EngageButton';
import Panel from './../shared/Panel/Panel';
import QuestionsPanelView from './subcomponents/QuestionsPanelView/QuestionsPanelView';
import FirstResponderSelector from './subcomponents/FirstResponderSelector/FirstResponderSelector';
import FirstResponderResourcesView from './subcomponents/FirstResponderResourcesView/FirstResponderResourcesView';
import FirstResponderRoboTaxiInfoView from './subcomponents/FirstResponderRobotaxiInfoView/FirstResponderRoboTaxiInfoView';
import FirstResponderTimelineView from './subcomponents/FirstResponderTimelineView/FirstResponderTimelineView';
import FirstResponderVideoUIView from './subcomponents/FirstResponderVideoUIView/FirstResponderVideoUIView';
import FirstResponderVideoStreamView from './subcomponents/FirstResponderVideoStreamView/FirstResponderVideoStreamView';
import WaitingView from './subcomponents/WaitingView/WaitingView';
import PrimaryInfoView from './subcomponents/PrimaryInfoView/PrimaryInfoView';
import TowingView from './subcomponents/TowingView/TowingView';
import DriverInfoView from './subcomponents/DriverInfoView/DriverInfoView';
import VehicleInfoView from './subcomponents/VehicleInfoView/VehicleInfoView';
import RoboTaxiInfoView from './subcomponents/RoboTaxiInfoView/RoboTaxiInfoView';
import ClaimView from './subcomponents/ClaimView/ClaimView';
import Footer from './subcomponents/Footer/Footer';
import DriverOCR from './subcomponents/DriverOCR/DriverOCR';
import InsuranceOCR from './subcomponents/InsuranceOCR/InsuranceOCR';
import {clientOVU} from '../../utils/router.js';

class OvuApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientIdentity: clientOVU,
            onPhone: false,
            log: 'awaiting...',
            incoming: false,
            inboundConnectionStatus: null,
            isDefault: false,
            isDetected: true,
            isQuestions: false,
            isPanel: false,
            isFooter: true,
            isFirstResponder: false,
            isFirstResponderResourcesView: false,
            isFirstResponderRoboTaxiInfoView: false,
            isFirstResponderTimelineView: false,
            isFirstResponderVideoUIView: false,
            isFirstResponderVideoStreamView: false,
            isWaiting: false,
            isPrimaryInfo: false,
            isTowing: false,
            isDriverInfo: false,
            isVehicleInfo: false,
            isRoboTaxiInfo: false,
            isClaimView: false,
            isDriverOCR: false,
            isInsuranceOCR: false,
            headerStatusText: 'The robo-taxi has detected a collision',
            footerStatusText: 'Current Location',
            currentLocationText: '960 Kifer Road, Santa Clara, 9400',
        }
    }

    toggleQuestions = (e) => {
        e.preventDefault();

        this.setState({
            isDetected: false,
            isQuestions: true
        });
    }

    toggleFirstResponder = (e) => {
        e.preventDefault();

        this.setState({
            isQuestions: false,
            isFirstResponder: true,
        });
    }

    toggleFirstResponderResourcesView = (e) => {
        e.preventDefault();

        this.setState({
            isFirstResponder: false,
            isFirstResponderResourcesView: true,
        }, () => {
            this.togglePanel();
            this.toggleFooter();
        });
    }

    toggleFirstResponderRoboTaxiInfoView = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isFirstResponderResourcesView: false,
            isFirstResponderRoboTaxiInfoView: true,
        });
    }

    toggleFirstResponderTimelineView = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isFirstResponderRoboTaxiInfoView: false,
            isFirstResponderTimelineView: true,
        });
    }

    toggleFirstResponderVideoUIView = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isFirstResponderTimelineView: false,
            isFirstResponderVideoUIView: true,
        });
    }

    toggleFirstResponderVideoStreamView = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isFirstResponderVideoUIView: false,
            isFirstResponderVideoStreamView: true,
        })
    }

    toggleFooter = () => {
        this.setState({
            isFooter: !this.state.isFooter
        });
    }

    //testing panel
    togglePanel = () => {
        this.setState({
            isPanel: !this.state.isPanel
        });
    }

    toggleWaiting = (e) => {
        e.preventDefault();

        this.setState({
            isQuestions: false,
            isWaiting: true
        }, () => {
            this.togglePanel();
            this.toggleFooter();
        });
    }

    togglePrimaryInfo = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isWaiting: false,
            isPrimaryInfo: true,
        });
    }

    toggleTowingView = (e) => {
        e.preventDefault();

        this.setState({
            isPrimaryInfo: false,
            isTowing: true
        });
    }

    toggleDriverInfo = (e) => {
        e.preventDefault();

        this.setState({
            isDriverOCR: false,
            isDriverInfo: true
        });
    }

    toggleVehicleInfo = (e) => {
        e.preventDefault();

        this.setState({
            isInsuranceOCR: false,
            isVehicleInfo: true
        });
    }

    toggleRoboTaxiInfoView = (e) => {
        e.preventDefault();

        this.setState({
            isVehicleInfo: false,
            isRoboTaxiInfo: true,
        });
    }

    toggleClaimView = () => {
        this.setState({
            isRoboTaxiInfo: false,
            isClaimView: true
        });
    }

    toggleDriverOCR = () => {
        this.setState({
            isTowing: false,
            isDriverOCR: true,
        });
    }

    toggleInsuranceOCR = () => {
        this.setState({
            isDriverInfo: false,
            isInsuranceOCR: true,
        });
    }

    updatePanelStatusText = (s) => {
        this.setState({
            panelStatusText: s
        });
    }

    render() {
        return (
            <div className="App">
                <div id="header-container-wrapper" className="header-container-wrapper">
                    {
                        (() => {
                            if (this.state.isQuestions || this.state.isFirstResponder || this.state.isFirstResponderResourcesView || this.state.isFirstResponderRoboTaxiInfoView || this.state.isFirstResponderTimelineView || this.state.isFirstResponderVideoUIView || this.state.isFirstResponderVideoStreamView || this.state.isWaiting || this.state.isPrimaryInfo || this.state.isTowing || this.state.isDriverInfo || this.state.isVehicleInfo || this.state.isRoboTaxiInfo || this.state.isClaimView || this.state.isDriverOCR || this.state.isInsuranceOCR) {
                                return (<Header currentLocationText={this.state.currentLocationText} />);
                            } else {
                                return (<StatusHeader statusHeaderText={this.state.headerStatusText} />);
                            }
                        })()
                    }
                </div>

                <div id="content-area">
                    <div id="content-panel-wrapper" className={this.state.isPanel ? "is-content-panel-visible" : "content-panel-wrapper"}>
                        {
                            (() => {
                                if (this.state.isPanel) {
                                    return (<Panel clientIdentity={this.state.clientIdentity} togglePrimaryInfo={this.togglePrimaryInfo} updateStatusText={this.updatePanelStatusText} waitingStatus={this.state.isWaiting} />);
                                } else {
                                    return null;
                                }
                            })()
                        }
                    </div>
                    <div id="content-area-wrapper" className="content-area-wrapper">
                        {
                            (() => {
                                if (this.state.isDefault) {
                                    return (<DefaultView />);
                                } else if (this.state.isDetected) {
                                    return (<EngageButton toggleQuestions={this.toggleQuestions} />);
                                } else if (this.state.isQuestions) {
                                    return (<QuestionsPanelView toggleWaiting={this.toggleWaiting} toggleFirstResponder={this.toggleFirstResponder} statusHeaderText={this.state.headerStatusText} />);
                                } else if (this.state.isFirstResponder) {
                                    return (<FirstResponderSelector statusHeaderText={this.state.headerStatusText} toggleFirstResponderResourcesView={this.toggleFirstResponderResourcesView} />);
                                } else if (this.state.isFirstResponderResourcesView) {
                                    return (<FirstResponderResourcesView toggleFirstResponderRoboTaxiInfoView={this.toggleFirstResponderRoboTaxiInfoView} />);
                                } else if (this.state.isFirstResponderRoboTaxiInfoView) {
                                    return (<FirstResponderRoboTaxiInfoView toggleFirstResponderTimelineView={this.toggleFirstResponderTimelineView} />);
                                } else if (this.state.isFirstResponderTimelineView) {
                                    return (<FirstResponderTimelineView toggleFirstResponderVideoUIView={this.toggleFirstResponderVideoUIView} />);
                                } else if (this.state.isFirstResponderVideoUIView) {
                                    return (<FirstResponderVideoUIView toggleFirstResponderVideoStreamView={this.toggleFirstResponderVideoStreamView} />);
                                } else if (this.state.isFirstResponderVideoStreamView) {
                                    return (<FirstResponderVideoStreamView />);
                                } else if (this.state.isWaiting) {
                                    return (<WaitingView togglePrimaryInfo={this.togglePrimaryInfo} />);
                                } else if (this.state.isPrimaryInfo) {
                                    return (<PrimaryInfoView toggleTowingView={this.toggleTowingView} />)
                                } else if (this.state.isTowing) {
                                    return (<TowingView toggleDriverOCR={this.toggleDriverOCR} />);
                                } else if (this.state.isDriverOCR) {
                                    return (<DriverOCR toggleDriverInfo={this.toggleDriverInfo} />);
                                } else if (this.state.isDriverInfo) {
                                    return (<DriverInfoView toggleInsuranceOCR={this.toggleInsuranceOCR} />);
                                } else if (this.state.isInsuranceOCR) {
                                    return (<InsuranceOCR toggleVehicleInfo={this.toggleVehicleInfo} />);
                                } else if (this.state.isVehicleInfo) {
                                    return (<VehicleInfoView toggleRoboTaxiInfoView={this.toggleRoboTaxiInfoView} />);
                                } else if (this.state.isRoboTaxiInfo) {
                                    return (<RoboTaxiInfoView toggleClaimView={this.toggleClaimView} />);
                                } else if (this.state.isClaimView) {
                                    return (< ClaimView />);
                                }
                            })()
                        }
                    </div>
                </div>

                <div id="footer-container-wrapper" className={this.state.isFooter ? "footer-container-wrapper" : "is-footer-visible"}>
                    {
                        this.state.isDetected ?
                            <Footer footerStatusText={this.state.footerStatusText} currentLocationText={this.state.currentLocationText} />
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default OvuApp;
