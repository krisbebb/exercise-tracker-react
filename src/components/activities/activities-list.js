import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Activity from './activity';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + '/activities/')
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteActivity = (id) => {
    axios.delete(BASE_URL + '/activities/' + id).then((response) => {
      console.log(response.data);
      setActivities(activities.filter((el) => el._id !== id));
    });
  };

  const activityList = () => {
    return activities.map((currentActivity) => {
      return (
        <Activity
          activity={currentActivity}
          deleteActivity={deleteActivity}
          key={currentActivity._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Activities</h3>
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
  );
};

export default ActivitiesList;
