import React, { Component } from 'react';
import './EngageButton.css';

import clickButton from '../../img/pointer-click-bg.png';

class ExtendButton extends Component {
    render() {
        return (
            <div id="engage-button-container">
                <button onClick={ this.props.toggleQuestions } type="submit" id="engage-button" alt="confirmation button">
                    <img src={clickButton} alt="click"/>
                    <span id="engage-button-text">press here for assistance</span>
                </button>
            </div>
        )
    }
}

export default ExtendButton;