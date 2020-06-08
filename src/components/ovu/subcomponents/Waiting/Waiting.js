import React ,{ Component } from 'react';
import './Waiting.css';

class Waiting extends Component {
    render() {
        return (
            <div id="waiting-container">
                <QuestionsPanel />
            </div>
        );
    }
};

export default Waiting;