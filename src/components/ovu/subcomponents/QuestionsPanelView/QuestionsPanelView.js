import React, { Component } from 'react';
import './QuestionsPanelView.css';

import StatusHeader from '../StatusHeader/StatusHeader';
const questions = ["Are you someone involved in the collision?", "Do you or anyone in your car require medical assistance?"];

class QuestionsPanelView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0
        }
    }

    increment = (e) => {
        e.preventDefault();

        if (this.state.current < questions.length - 1) {
            this.setState({
                current: this.state.current + 1
            });
        }
    }

    decrement = (e) => {
        e.preventDefault();

        if ( this.state.current > 0) {
            this.setState({
                current: this.state.current - 1
            });
        }
    }

    componentDidMount() {
        console.log(this.props.statusHeaderText);
    }

    render() {
        return (
            <div id="questions-container" className="questions-container">

                <div id="status-header-questions-content">
                    <StatusHeader statusHeaderText={this.props.statusHeaderText} />
                    <hr />
                </div>

                <div>
                <span id="question-text">{ questions[this.state.current] }</span>
                </div>

                <div id="confirmation-button">
                    <button onClick={ this.increment } className="button-yes" type="submit">yes</button>
                    {/* <button onClick={ this.decrement } className="button-no" type="submit">no</button> */}
                    <button onClick={this.state.current !== 0 ? this.props.toggleWaiting : this.props.toggleFirstResponder} className="button-no" type="submit">no</button>
                </div>
            </div>
        );
    }
};

export default QuestionsPanelView;