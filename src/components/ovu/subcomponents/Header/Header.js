import React, { Component } from 'react';
import './Header.css';

import currentLocation from '../../img/current-location.png';

class Header extends Component {
    render() {
        return (
            <div id="header-container">
                <div id="logo-type-container">
                    <span>Nissan Robotaxi</span>
                </div>
                <div id="location-type-container">
                    <span id="current-location"><img src={currentLocation} alt="current location"/> Your Current Location</span>
                    <span id="current-address">{this.props.currentLocationText}</span>
                </div>
            </div>
        );
    }
}

export default Header;