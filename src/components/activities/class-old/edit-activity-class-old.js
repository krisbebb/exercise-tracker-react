import React, { Component } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class EditActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityName: '',
    };
  }

  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        BASE_URL + '/activities/' +
          this.props.match.params.id
      )

      .then((response) => {
        console.log(response.data);
        this.setState({
          activityName: response.data.activityName,
        });
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

  onSubmit = (e) => {
    e.preventDefault();

    const activity = {
      activityName: this.state.activityName,
    };

    console.log(activity);

    axios
      .post(
        BASE_URL + '/activities/update/' +
          this.props.match.params.id,
        activity
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          activityName: '',
        });

        window.location = '/activities';
      });
  };

  render() {
    return (
      <div>
        <h3>Edit Activity</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Activity: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.activityName}
              onChange={this.onChangeActivityName}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Edit Activity'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
