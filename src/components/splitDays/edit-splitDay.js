import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Activity from './activity';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateSplitDay = (props) => {
  const [splitDay, setSplitDay] = useState({
    splitDay: '',
    activities: [],
  });
  const [activityName, setActivityName] = useState('');
  const [existingActivities, setExistingActivities] = useState([]);

  useEffect(() => {
    // let isMounted = true;
    let existing = [];
    let splitDayName = '';
    let splitDayActivities = [];
    axios
      .get(BASE_URL + '/activities/')
      .then((response) => {
        // if (isMounted) {
          if (response.data.length > 0) {
            existing = response.data.map((activity) => activity.activityName);
          }
        // }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(BASE_URL + '/splitDays/' + props.match.params.id)
      .then((response) => {
        // if (isMounted) {
          splitDayName = response.data.splitDay;
          splitDayActivities = response.data.activities;

          existing = existing.filter(
            (activity) => !splitDayActivities.includes(activity)
          );
          setExistingActivities(existing);
          setActivityName(existing[0]);
          setSplitDay({
            splitDay: splitDayName,
            activities: splitDayActivities,
          });
        // }
      });
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  const onChangeActivityName = (e) => {
    setActivityName(e.target.value);
  };

  const onSelect = (e) => {
    e.preventDefault();
    let existing = existingActivities;
    existing = existing.filter((activity) => activity !== activityName);
    setSplitDay({
      ...splitDay,
      activities: [...splitDay.activities, activityName],
    });

    setExistingActivities(existing);
    setActivityName(existing[0]);
  };

  const onSave = () => {
    axios
      .post(BASE_URL + '/splitDays/update/' + props.match.params.id, splitDay)
      .then((res) => {
        window.location = '/splitDays/list';
      });
  };

  const deleteActivity = (activityName) => {
    let splitActivities = splitDay.activities;
    splitActivities = splitActivities.filter(
      (activity) => activity !== activityName
    );
    let existing = existingActivities;
    existing.push(activityName);
    setExistingActivities(existing);
    setSplitDay({
      ...splitDay,
      activities: splitActivities,
    });
  };

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
              existingActivities.map(function (activity) {
                return (
                  <option key={activity} value={activity}>
                    {activity}
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
