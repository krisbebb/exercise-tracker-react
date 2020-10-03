import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default class CreateActivity extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activityName: ''
    }
  }

  onChangeActivityName = (e) => {
    this.setState({
      activityName: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const activity = {
      activityName: this.state.activityName
    }

    console.log(activity);

    axios.post(BASE_URL + '/activities/add', activity)
      .then(res => {
        console.log(res.data)
        this.setState({
          activityName: ''
        })
        window.location = '/activities';
      })
      
  }

  render() {
    return (
      <div>
        <h3>Create New Activity</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Activity: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.activityName}
                onChange={this.onChangeActivityName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Activity" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}