import React, { Component } from 'react';
import './DriverInfoView.css';
import '../../../shared/assistance.css';

// import driverInfoImage from '../../img/driver-license-v2.png';

class DriverInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 3,
            driverLicenseDetails: {
                number: "",
                expiration: "",
                address: "",
            }
        }
    }

    render() {
        return (
            <div className="assistance-content-container">
            <div className="subheader-breadcrumb-container">
                <div className="header-breadcrumb-counter">{`${this.state.currentView}/4`}</div>
                <span className="subheader-breadcrumb-text">Information Exchange</span>
            </div>
            <div className="header-breadcrumb-container">
                <span>Driver's License</span>
            </div>

            <div className="driver-main-content">
                    {/* <img src={driverInfoImage} alt="driverInfo"></img> */}

                    <div className="driver-license-details">
                        <div className="driver-license-detail">
                            <span className="secondary-license-detail">Driver License No.</span>
                            <input className="input-license" value={this.state.driverLicenseDetails.number} />
                        </div>
                        <div className="driver-license-detail">
                            <span className="secondary-detail">Driver License Expiration Date</span>
                            <input className="input-license" value={this.state.driverLicenseDetails.expiration} />
                        </div>
                    </div>
                    <div className="driver-license-details">
                        <div className="driver-license-detail full">
                            <span className="secondary-license-detail">Driver License No.</span>
                            <input className="input-license" value={this.state.driverLicenseDetails.address} />
                        </div>
                    </div>
            </div>

            <div className="assistance-footer-content">
                <button className="driver-info-confirm-button" type="submit" onClick={ this.props.toggleInsuranceOCR }>Confirm &#x3e;</button>
            </div>

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

export default DriverInfoView;