import React, { Component } from 'react';
import './StatusHeader.css';

class StatusHeader extends Component {
    render() {
        return (
            <div id="status-header-container">
                <div id="status-header-content">
                    <span id="status-header-status">{this.props.statusHeaderText}</span>
                </div>
            </div>
        )
    }
}

export default StatusHeader;