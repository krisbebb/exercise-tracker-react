import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateSplitDay = () => {
  
const [splitDay, setSplitDay] = useState({
  splitDay: '',
  activities: [],
})

const [activityName, setActivityName] = useState('')
const [existingActivities, setExistingActivities] = useState([])

  // componentDidMount() {
   
  //   axios
  //     .get(BASE_URL +'/activities/')
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           existingActivities: response.data.map(
  //             (activityName) => activityName.activityName
  //           ),
  //           activityName: response.data[0].activityName,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  useEffect(() => {
    axios
    .get(BASE_URL +'/activities/')
    .then((response) => {
      if (response.data.length > 0) {
        setExistingActivities(response.data.map(
          (activityName) => activityName.activityName
        ))
        setActivityName(response.data[0].activityName)
        // this.setState({
        //   existingActivities: response.data.map(
        //     (activityName) => activityName.activityName
        //   ),
        //   activityName: response.data[0].activityName,
        // });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  const onChangeSplitDay = (e) => {
    setSplitDay({
      ...splitDay.activities,
      splitDay: e.target.value,
    })
    // this.setState({
    //   splitDay: e.target.value,
    // });
  };

  const onAddActivityName = (activity) => {
    setSplitDay({
      ...splitDay,
      activities: [...splitDay.activities, activity],
    })
    // this.setState({
    //   activities: [...activities, activity],
    // });
    console.log('added ' + activity);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // const splitDay = {
    //   splitDay: splitDay.splitDay,
    //   activities: splitDay.activities,
    // };

    console.log('split day is ', splitDay);

    axios
      .post(BASE_URL + '/splitDays/add', splitDay)
      .then((res) => {
        console.log(res.data._id);
        setSplitDay({
          splitDayId: res.data._id,
          ...splitDay,
          activities: [],
        })
        // this.setState({
        //   splitDayId: res.data._id,
        //   activities: [],
        // });
        window.location = '/splitDays/edit/' + res.data._id;
      });
  };

    return (
      <div>
        <h3>Create New Split Group</h3>
        <form onSubmit={onSubmit} form='splitDayForm'>
          <div className='form-group'>
            <label>Group Name: </label>
            <input
              type='text'
              required
              className='form-control'
              value={splitDay.splitDay}
              onChange={onChangeSplitDay}
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

export default CreateSplitDay