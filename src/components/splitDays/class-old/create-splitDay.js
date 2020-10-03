import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class CreateSplitDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splitDay: '',
      activities: [],
      existingActivities: [],
      activityName: '',
    };
  }

  componentDidMount() {
   
    axios
      .get(BASE_URL +'/activities/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            existingActivities: response.data.map(
              (activityName) => activityName.activityName
            ),
            activityName: response.data[0].activityName,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeSplitDay = (e) => {
    this.setState({
      splitDay: e.target.value,
    });
  };

  onAddActivityName = (activity) => {
    this.setState({
      activities: [...this.state.activities, activity],
    });
    console.log('added ' + activity);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const splitDay = {
      splitDay: this.state.splitDay,
      activities: this.state.activities,
    };

    console.log('split day is ', splitDay);

    axios
      .post(BASE_URL + '/splitDays/add', splitDay)
      .then((res) => {
        console.log(res.data._id);
        this.setState({
          splitDayId: res.data._id,
          activities: [],
        });
        window.location = '/splitDays/edit/' + this.state.splitDayId;
      });
  };

  render() {
    return (
      <div>
        <h3>Create New Split Group</h3>
        <form onSubmit={this.onSubmit} form='splitDayForm'>
          <div className='form-group'>
            <label>Group Name: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.splitDay}
              onChange={this.onChangeSplitDay}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Save Group'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
