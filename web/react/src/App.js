import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import * as firebase from './utility/Firebase';
import UsersTable from './components/UsersTable';

class App extends Component {
  state = { result: 0 };
  load = () => {
    /* Only mobile part calls Express API 
    fetch(config.api_home + '/groups/1/all/1')
      .then(res => res.json(), error => console.log(error))
      .then(res => this.setState({result: "done"}), error => console.log(error));
    */
  }


  addUser = () => { 
    const update = {
      firstname: 'brandon',
      lastname: 'chinn',
      birthday: '19960807',
      date: '20170920',
      bloodpressure: 123,
      medications: 'tylenol',
      symptoms: 'hot',
      notes: 'sexy'
    }

    firebase.addUpdates([update], 1);
  };

  render() {
    var result = this.state.result;
    // this.load();

    return(
        <div className="App">
          <h1>Users</h1>
          <UsersTable />
          <p className="App-intro">{result}
          </p>
          <button onClick={this.addUser}>Add</button>
        </div>
        );
    /*
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    */
  }
}

export default App;
