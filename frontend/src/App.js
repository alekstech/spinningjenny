import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
	constructor () {
		super()
		this.state = {
			'movies': 'moo',
			'developers': []
		}
	}
	componentWillMount() {
		const _this = this
		axios.get('http://localhost:5035/api/developers')
		  .then(function (response) {
		  	_this.setState( {developers: response.data} )
		  })
		  .catch(function (error) {
		  });
	}

	componentWillUnmount() {
	  this.serverRequest.abort();
	}

  render() {
    return (
      <div className="App">
        <h3>Welcome, Textile Museum Volunteer</h3>
        {
        	Object.keys(this.state.developers)
        	.map( dev => `${this.state.developers[dev].name} `)
        }
      </div>
    );
  }
}

export default App;
