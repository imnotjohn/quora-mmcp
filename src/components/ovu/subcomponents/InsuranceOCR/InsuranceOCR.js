import React, { Component } from 'react';
import './InsuranceOCR.css';
import '../../helpers/assistance.css';

import insuranceOCRImage from '../../img/insurance-document-ocr.png';

class InsuranceOCR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 1,
        }
    }

    render() {
        return (
            <div className="insurance-ocr-main-content">
                <button onClick={this.props.toggleVehicleInfo}><img src={insuranceOCRImage} alt="insurance ocr"></img></button>
            </div>
        );
    }
}

export default InsuranceOCR;