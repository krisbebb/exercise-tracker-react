import React, { Component } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default class CreateSplitDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SplitDay: '',
      activities: [],
      existingActivities: [],
      activityName: '',
    };
  }
  
  componentDidMount() {
    console.log('componentDidMount just ran!!!')
    axios
      .get(BASE_URL + '/activities/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            existingActivities: response.data.map(
              (activityName) => activityName.activityName
            ),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(BASE_URL + '/splitDays/' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          SplitDay: response.data.splitDay,
          activities: response.data.activities
        })
        let existing = this.state.existingActivities
        
        existing = existing.filter(activity => !this.state.activities.includes(activity))
        this.setState({
          existingActivities: existing,
          activityName: existing[0],

        })
  })}


  componentDidUpdate() {
    console.log('COMPONENT DID UPDATE')
  }
  onChangeSplitDay = (e) => {
    this.setState({
      splitDay: e.target.value,
    });
  };

  onChangeActivityName = (e) => {
    console.log('ONCHANGE just ran')
    this.setState({
      activityName: e.target.value,
    });
  };

  onSelect = (e) => {
     e.preventDefault();
    console.log('ONSUBMIT just ran')

     let existing = this.state.existingActivities
    existing = existing.filter((activity) => 
         activity !== this.state.activityName
      )
    this.setState({
      activities: [...this.state.activities, this.state.activityName],
      // activities: [...this.state.activities, e.target.value],
      existingActivities: existing,
      // activityName: e.currentTarget.value
      activityName: existing[0]
    });
    
  };

  onSave = () => {
    console.log('saving');
    const splitDay = {
      splitDay: this.state.splitDay,
      activities: this.state.activities,
    };
    axios
      .post(BASE_URL + '/splitDays/update/' + this.props.match.params.id, splitDay)
      .then((res) => {
    console.log(res.data);
    this.setState({
      splitDay: '',
      // activities: [],
    });
    window.location = '/splitDays/list';
    });
    console.log('split day is saved: ', splitDay);
  };

  render() {
    return (
      <div>
        <h3>Add activities</h3>

        <div>
        <ul>
          {this.state.activities.length > 0
            ? this.state.activities.map((activityName) => (
                <li key={activityName}>{activityName}</li>
              ))
            : null}
        </ul>
      </div>


        <form onSubmit={this.onSelect} form='activityForm'>
          <div className='form-group'>
            <label>Activity: </label>
            <select
              // ref='userInput'
              placeholder="select activity"
              required
              className='form-control'
              defaultValue={this.state.activityName }
              form='activityForm'
              onChange={this.onChangeActivityName}
              // onChange={this.onSelect}
            >
            
            {this.state.existingActivities.length > 0 ?
              this.state.existingActivities.map(function (activityName) {
                return (
                  <option key={activityName} value={activityName}>
                    {activityName}
                
                  </option>
                );
                })
              : <option value='No values'>No Values</option>
            }
            </select>
          </div>
          <div className='form-group'>
          
            <input type='submit' disabled={!this.state.existingActivities.length > 0} className='btn btn-primary'
              value='Add Activity'/>
          </div>
         
        </form>
        <button onClick={this.onSave} className='btn btn-primary'>
          Save
        </button>
      </div>
    );
  }
}
