import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default class CreateSet extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activityName: '',
      reps: '0',
      weight: 0,
      date: new Date(),
      activities: []
    }
  }

  componentDidMount() {
    axios.get(BASE_URL + '/activities/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            activities: response.data.map(activityName => activityName.activityName),
            activityName: response.data[0].activityName
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeActivityName = (e) => {
    this.setState({
      activityName: e.target.value
    })
  }

  onChangeReps = (e) => {
    this.setState({
      reps: e.target.value
    })
  }

  onChangeWeight = (e) => {
    this.setState({
      weight: e.target.value
    })
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const set = {
      activityName: this.state.activityName,
      reps: this.state.reps,
      weight: this.state.weight,
      date: this.state.date
    }

    console.log(set);

    axios.post(BASE_URL + '/sets/add', set)
      .then(res => {
        console.log(res.data)
        window.location = '/';
      });
  }

  render() {
    return (
    <div>
      <h3>Create New Set</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Activity: </label>
          <select 
              required
              className="form-control"
              value={this.state.activityName}
              onChange={this.onChangeActivityName}>
              {
                this.state.activities.map(function(activityName) {
                  return <option 
                    key={activityName}
                    value={activityName}>{activityName}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Reps: </label>
          <input  type="number"
              required
              className="form-control"
              value={this.state.reps}
              onChange={this.onChangeReps}
              />
        </div>
        <div className="form-group">
          <label>Weight without bar (in kilos): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.weight}
              onChange={this.onChangeWeight}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Set" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}