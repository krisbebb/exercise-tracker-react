import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: '',
      reps: '',
      weight: 0,
      date: new Date(),
      activities: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          activity: response.data.activity,
          reps: response.data.reps,
          weight: response.data.weight,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.activity),
          })
        }
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

  onChangeDescription = (e) => {
    this.setState({
      reps: e.target.value
    })
  }

  onChangeDuration = (e) => {
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

    const exercise = {
      activity: this.state.activity,
      reps: this.state.reps,
      weight: this.state.weight,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Activity: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.activity}
              onChange={this.onChangeUsername}>
              {
                this.state.activities.map(function(activity) {
                  return <option 
                    key={activity}
                    value={activity}>{activity}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Reps: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.reps}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Weight (in kilos): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.weight}
              onChange={this.onChangeDuration}
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
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}