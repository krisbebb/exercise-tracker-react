import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activity: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)

    .then(response => {
        console.log(response.data)
        this.setState({
          activity: response.data.activity,
        })
    })
    .catch((error) => {
      console.log(error);
    })
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

    axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    this.setState({
      activity: ''
    })

    window.location = '/users';
  }

  render() {
    return (
      <div>
        <h3>Edit Activity</h3>
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
            <input type="submit" value="Edit User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}