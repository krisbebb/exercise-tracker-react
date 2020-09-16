import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activity: ''
    }
  }

  onChangeUsername = (e) => {
    this.setState({
      activity: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      activity: this.state.activity
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      activity: ''
    })

    window.location = '/users';
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Activity: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.activity}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}