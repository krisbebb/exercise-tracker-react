import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Activity from './activity'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateSplitDay = (props) => {
  const [splitDay, setSplitDay] = useState({
    splitDay: '',
    activities: [],
  });
  const [activityName, setActivityName] = useState('');
  const [existingActivities, setExistingActivities] = useState([]);

  useEffect(() => {
    let existing = [];
    let splitDayName = '';
    let splitDayActivities = [];
    axios
      .get(BASE_URL + '/activities/')
      .then((response) => {
        console.log('get all activities', response.data);
        if (response.data.length > 0) {
          existing = response.data.map((activity) => activity.activityName);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(BASE_URL + '/splitDays/' + props.match.params.id)
      .then((response) => {
        console.log('get splitday info', response.data);
        splitDayName = response.data.splitDay;
        splitDayActivities = response.data.activities;

        console.log('existing - pre filter', existing);
        existing = existing.filter(
          (activity) => !splitDayActivities.includes(activity)
        );
        console.log('existing post filter', existing);
        setExistingActivities(existing);
        setActivityName(existing[0]);
        setSplitDay({
          splitDay: splitDayName,
          activities: splitDayActivities,
        });
      });
  }, []);

  const onChangeActivityName = (e) => {
    console.log('ONCHANGE just ran');
    setActivityName(e.target.value);
  };

  const onSelect = (e) => {
    e.preventDefault();
    console.log('ONSUBMIT just ran');
    console.log('activityName at start of onSelect', activityName);
    console.log('splitDay prior to onselect changes', splitDay);
    let existing = existingActivities;
    existing = existing.filter((activity) => activity !== activityName);
    setSplitDay({
      ...splitDay,
      activities: [...splitDay.activities, activityName],
    });
    console.log(
      'splitDay after onselect changes (may not have updated)',
      splitDay
    );
    setExistingActivities(existing);
    setActivityName(existing[0]);
  };

  const onSave = () => {
    console.log('saving');
    console.log('splitday just before save', splitDay);
    axios
      .post(BASE_URL + '/splitDays/update/' + props.match.params.id, splitDay)
      .then((res) => {
        console.log(res.data);
        window.location = '/splitDays/list';
      });
    console.log('split day is saved: ', splitDay);
  };


  const deleteActivity = (id) => {
    // axios.delete(BASE_URL + '/activities/' + id).then((response) => {
    //   console.log(response.data);
    //   setActivities(activities.filter((el) => el._id !== id));
    // });
  };

  // FROM ACTIVITIES-LIST
  const activityList = () => {
    return splitDay.activities.map((currentActivity) => {
      return (
        <Activity
          activity={currentActivity}
          deleteActivity={deleteActivity}
          key={currentActivity}
        />
      );
    });
  };

  // FROM ACTIVITIES-LIST
  // <div>
  //     <h3>Activities</h3>
  //     <table className='table'>
  //       <thead className='thead-light'>
  //         <tr>
  //           <th>Activity</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>{activityList()}</tbody>
  //     </table>
  //   </div>


  // FROM THIS FILE
  // <h3>Add activities</h3>
  //     <div>
  //       <ul>
  //         {splitDay.activities.length > 0
  //           ? splitDay.activities.map((activityName) => (
  //               <li key={activityName}>{activityName}</li>
  //             ))
  //           : null}
  //       </ul>
  //     </div>

  return (
    <div>

    <div>
      <h3>Split Group - {splitDay.splitDay}</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{activityList()}</tbody>
      </table>
    </div>
      

      <form onSubmit={onSelect} form='activityForm'>
        <div className='form-group'>
          <label>Activity: </label>
          <select
            placeholder='select activity'
            required
            className='form-control'
            defaultValue={activityName}
            form='activityForm'
            onChange={onChangeActivityName}
          >
            {existingActivities.length > 0 ? (
              existingActivities.map(function (activityName) {
                return (
                  <option key={activityName} value={activityName}>
                    {activityName}
                  </option>
                );
              })
            ) : (
              <option value='No values'>No Values</option>
            )}
          </select>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            disabled={!existingActivities.length > 0}
            className='btn btn-primary'
            value='Add Activity'
          />
        </div>
      </form>
      <button onClick={onSave} className='btn btn-primary'>
        Save
      </button>
    </div>
  );
};

export default CreateSplitDay;
