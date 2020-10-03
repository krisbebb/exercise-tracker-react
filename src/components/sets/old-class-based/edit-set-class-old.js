import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default class EditSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityName: '',
      reps: '',
      weight: 0,
      date: new Date(),
      activities: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        BASE_URL + '/sets/' +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          activityName: response.data.activityName,
          reps: response.data.reps,
          weight: response.data.weight,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(BASE_URL + '/activities/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            activities: response.data.map((activity) => activity.activityName),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeActivityName = (e) => {
    this.setState({
      activityName: e.target.value,
    });
  };

  onChangeReps = (e) => {
    this.setState({
      reps: e.target.value,
    });
  };

  onChangeWeight = (e) => {
    this.setState({
      weight: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const set = {
      activityName: this.state.activityName,
      reps: this.state.reps,
      weight: this.state.weight,
      date: this.state.date,
    };

    console.log(set);

    axios
      .post(
        BASE_URL + '/sets/update/' +
          this.props.match.params.id,
        set
      )
      .then((res) => {
        console.log(res.data);
        window.location = '/';
      });
  };

  render() {
    return (
      <div>
        <h3>Edit Session Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Activity: </label>
            <select
              ref='userInput'
              required
              className='form-control'
              value={this.state.activityName}
              onChange={this.onChangeActivityName}
            >
              {this.state.activities.map(function (activityName) {
                return (
                  <option key={activityName} value={activityName}>
                    {activityName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Reps: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.reps}
              onChange={this.onChangeReps}
            />
          </div>
          <div className='form-group'>
            <label>Weight (in kilos): </label>
            <input
              type='text'
              className='form-control'
              value={this.state.weight}
              onChange={this.onChangeWeight}
            />
          </div>
          <div className='form-group'>
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className='form-group'>
            <input
              type='submit'
              value='Edit Session Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
