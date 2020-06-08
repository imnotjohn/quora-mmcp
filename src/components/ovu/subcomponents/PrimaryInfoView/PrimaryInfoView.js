import React, { Component } from 'react';
import './PrimaryInfoView.css';
import '../../../shared/assistance.css';

// import primaryInfoImage from '../../img/primary-info.png';

class PrimaryInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: 1,
            driverDetails: {
                firstName: "",
                lastName: "",
                mobile: "",
                email: "",
            }
        }
    }

    render() {
        return (
            <div className="assistance-content-container">
                <div className="subheader-breadcrumb-container">
                    <div className="header-breadcrumb-counter">{`${this.state.currentView}/4`}</div>
                    <span className="subheader-breadcrumb-text">Contact Information</span>
                </div>
                <div className="header-breadcrumb-container">
                    <span>Contact Information</span>
                </div>

                <div className="primary-main-content">
                    <div className="driver-details">
                        {/* <img src={primaryInfoImage} alt="primary info"></img> */}
                        <div className="driver-detail">
                            <span className="secondary-detail">First Name</span>
                            <input className="input-field" value={this.state.driverDetails.firstName} readOnly/>
                        </div>
                        <div className="driver-detail">
                            <span className="secondary-detail">Last Name</span>
                            <input className="input-field" value={this.state.driverDetails.lastName} readOnly/>
                        </div>
                    </div>
                    <div className="driver-details">
                        {/* <img src={primaryInfoImage} alt="primary info"></img> */}
                        <div className="driver-detail">
                            <span className="secondary-detail">Mobile</span>
                            <input className="input-field" value={this.state.driverDetails.mobile} readOnly/>
                        </div>
                        <div className="driver-detail">
                            <span className="secondary-detail">Email</span>
                            <input className="input-field" value={this.state.driverDetails.email} readOnly/>
                        </div>
                    </div>
                </div>
                <div className="assistance-footer-content">
                    <button className="primary-info-confirm-button" type="submit" onClick={this.props.toggleTowingView}>Confirm &#x3e;</button>
                </div>

                <div className="footer-breadcrumb-container">
                    <div className="footer-breadcrumb active" />
                    <div className="footer-breadcrumb inactive" />
                    <div className="footer-breadcrumb inactive" />
                    <div className="footer-breadcrumb inactive" />
                </div>
            </div>
        );
    }
}

export default PrimaryInfoView;