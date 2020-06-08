import React, { Component } from 'react';
import './App.css';

import OvuApp from './components/ovu/OvuApp';
import PassengerApp from './components/passenger/PassengerApp';
import MobilityManagerApp from './components/mm/MobilityManagerApp';

import {clientOVU, clientPASS, clientMM} from './utils/router.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      app: 1,
      identity: "",
      bgColor: '#292c2d',
    }
  }

  handleClientSelected = (client) => {
    this.setState({
      identity: client
    }, () => {
      if (client === clientPASS) {
        this.setState({
          bgColor: '#292c2d',
        });
      } else if (client === clientOVU) {
        this.setState({
          bgColor: '#fff',
        });
      } else {
        this.setState({
          bgColor: '#eee',
        });
      }
    });
  }

  render() {
    const PASS = clientPASS;
    const OVU = clientOVU;
    const MM = clientMM;

    return (
      <div style={{backgroundColor: this.state.bgColor}} className="App">
        {/* <OvuApp /> */}
        {/* <PassengerApp /> */}

        {
          ( () => {
            if (this.state.identity === clientOVU) {
              return (<OvuApp />);
            } else if (this.state.identity === clientPASS) {
              return (<PassengerApp />);
            } else if (this.state.identity === clientMM) {
              return (<MobilityManagerApp />);
            } else {
              return (
                <>
                <button className="select-app-button" onClick={() => this.handleClientSelected(PASS)} type="submit">{PASS}</button>
                <button className="select-app-button" onClick={() => this.handleClientSelected(OVU)} type="submit">{OVU}</button>
                <button className="select-app-button" onClick={() => this.handleClientSelected(MM)} type="submit">{MM}</button>
                </>
              )
            }
          })()
        }

        <div id="bottom-anchor" />
      </div>
    );
  }
}

export default App;
