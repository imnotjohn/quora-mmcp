import React, { Component } from 'react';
import './DriverOCR.css';
import '../../helpers/assistance.css';

import driverOCRImage from '../../img/driver-license-ocr.png';

class DriverOCR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 1,
        }
    }

    render() {
        return (
            <div className="driver-ocr-main-content">
                <button onClick={this.props.toggleDriverInfo} ><img src={driverOCRImage} alt="driver license ocr"></img></button>
            </div>
        );
    }
}

export default DriverOCR;