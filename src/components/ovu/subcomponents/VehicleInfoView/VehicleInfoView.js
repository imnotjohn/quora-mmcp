import React, { Component } from 'react';
import './VehicleInfoView.css';
import '../../helpers/assistance.css';

// import vehicleInfoImage1 from '../../img/vehicle-view-1.png';
// import vehicleInfoImage2 from '../../img/vehicle-view-2.png';
// import vehicleInfoImage3 from '../../img/vehicle-view-3.png';
import insuranceDocumentImage from '../../img/insurance-document-v2.png';

class VehicleInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 3,
            image: 1
        }
    }

    changeImageHandler = (e) => {
        e.preventDefault();

        this.setState({
            image: this.state.image + 1
        }, () => {
            console.log(this.state.image)
        });
    }

    render() {
        return (

            <div className="assistance-content-container">
            <div className="subheader-breadcrumb-container">
                <div className="header-breadcrumb-counter">{`${this.state.currentView}/4`}</div>
                <span className="subheader-breadcrumb-text">Information Exchange</span>
            </div>
            <div className="header-breadcrumb-container">
                <span>Insurance Document</span>
            </div>

            <div className="vehicle-main-content">
                {/* { this.state.image === 4 ? 
                    <img src={vehicleInfoImage3} alt="img3"></img> 
                :
                    this.state.image === 2 ?
                        <img src={vehicleInfoImage2} alt="img2"></img>
                    :
                        <img src={vehicleInfoImage1} alt="img1"></img> 
                } */}
                <img src={insuranceDocumentImage} alt="insurance document"/>
            </div>
            <div className="assistance-footer-content">
                {/* { this.state.image === 4 ? 
                    <button className="confirm-button" type="submit" onClick={ this.props.toggleClaimView }>Finish</button>
                :
                    <button className="confirm-button" type="submit" onClick={ this.changeImageHandler }>Next</button>
                } */}
                    <button className="vehicle-info-confirm-button" type="submit" onClick={ this.props.toggleRoboTaxiInfoView }>Confirm &#x3e;</button>
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

export default VehicleInfoView;