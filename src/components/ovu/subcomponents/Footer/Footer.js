import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div id="footer-container">
                <div id="footer-content">
                    <span id="footer-status">{this.props.footerStatusText}</span><br />
                    <span className="footer-status-secondary">{this.props.currentLocationText}</span>
                </div>
            </div>
        )
    }
}

export default Footer;