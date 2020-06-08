import React, { Component } from 'react';
import './FirstResponderSelector.css';

import StatusHeader from '../StatusHeader/StatusHeader';

class FirstResponderSelector extends Component {
    render() {
        return (
            <div id="first-responder-selector-container">
                <div id="first-responder-header-content">
                    <StatusHeader statusHeaderText={this.props.statusHeaderText} />
                    <hr />
                </div>

                <div id="selector-text">
                    <span>You are a:</span>
                </div>

                <div id="selector-buttons-container">
                    <button onClick={this.props.toggleFirstResponderResourcesView} type="submit">first responder</button>
                    <button onClick={this.props.toggleFirstResponderResourcesView} type="submit">roadside assistance</button>
                    <button onClick={this.props.toggleFirstResponderResourcesView} type="submit">other</button>
                </div>
            </div>
        )
    }
}

export default FirstResponderSelector;