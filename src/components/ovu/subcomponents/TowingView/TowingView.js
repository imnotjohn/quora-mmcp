import React, { Component } from 'react';
import './TowingView.css';
import '../../helpers/assistance.css';

class TowingView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentView: 2
        };
    }

    onConfirmHandler = (e) => {
        e.preventDefault();

        this.setState({
            currentView: this.state.currentView + 1
        });
    }

    render() {
        return (
            <div className="assistance-content-container">
                <div className="subheader-breadcrumb-container">
                        <div className="header-breadcrumb-counter">{`${this.state.currentView}/4`}</div> 
                    <span className="subheader-breadcrumb-text">Assistance Request</span>
                </div>
                <div className="header-breadcrumb-container">
                    <span>Towing</span>
                </div>

                <div className="towing-main-content">
                    <div className="assistance-option">
                        <div className="assistance-option-type">
                            <span className="assistance-primary-detail">Premiere</span>
                            <span className="assistance-secondary-detail">4.5 / 5</span>
                        </div>
                        <div className="assistance-option-type">
                            <span className="assistance-primary-detail">10 mi</span>
                            <span className="assistance-secondary-detail">distance</span>
                        </div>
                        <div className="assistance-option-type">
                            <span className="assistance-primary-detail">$60</span>
                            <span className="assistance-secondary-detail">price</span>
                        </div>
                        <div className="assistance-option-type">
                            {/* <span className="assistance-primary-detail">$60</span>
                            <span className="assistance-secondary-detail">price</span> */}
                            <input type="radio" id="premiere" name="towing" value="premiere">
                            </input>
                                <label htmlFor="premiere"></label>
                            <div className="check"><div className="inside"></div></div>
                        </div>
                    </div>
                    <div className="assistance-option">
                        <div className="assistance-option-type">
                            <span className="assistance-primary-detail">Regular</span>
                            <span className="assistance-secondary-detail">4.2 / 5</span>
                        </div>
                        <div className="assistance-option-type">
                            <span className="assistance-primary-detail">4 mi</span>
                            <span className="assistance-secondary-detail">distance</span>
                        </div>
                        <div className="assistance-option-type">
                            <span className="assistance-primary-detail">$30</span>
                            <span className="assistance-secondary-detail">price</span>
                        </div>
                        <div className="assistance-option-type">
                            {/* <span className="assistance-primary-detail">$60</span>
                            <span className="assistance-secondary-detail">price</span> */}
                            <input type="radio" id="regular" name="towing" value="regular">
                            </input>
                                <label htmlFor="regular"></label>
                            <div className="check"><div className="inside"></div></div>
                        </div>
                    </div>
                </div>
                <div className="assistance-footer-content">
                        <button className="cancel-button" type="submit" onClick={ this.props.toggleDriverOCR } >Cancel</button>
                        <button className="confirm-button" type="submit" onClick={ this.props.toggleDriverOCR } >Confirm &#x3e;</button>
                </div>

                <div className="footer-breadcrumb-container">
                    <div className="footer-breadcrumb active"/>
                    <div className="footer-breadcrumb active"/>
                    <div className="footer-breadcrumb inactive"/>
                    <div className="footer-breadcrumb inactive"/>
                </div>
            </div>
        );
    }
};

export default TowingView;