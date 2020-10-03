import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CreateActivity = () => {
  const [activityName, setActivityName] = useState('');

  const onChangeActivityName = (e) => {
    setActivityName(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const activity = {
      activityName: activityName,
    };

    console.log(activity);

    axios.post(BASE_URL + '/activities/add', activity).then((res) => {
      console.log(res.data);
      setActivityName('');

      window.location = '/activities';
    });
  };

  return (
    <div>
      <h3>Create New Activity</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Activity: </label>
          <input
            type='text'
            required
            className='form-control'
            value={activityName}
            onChange={onChangeActivityName}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create Activity'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;
