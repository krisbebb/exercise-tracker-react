import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const EditSet = (props) => {
  const [setInfo, setSetInfo] = useState({
    activityName: '',
    reps: '',
    weight: 0,
    date: new Date(),
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + '/sets/' + props.match.params.id)
      .then((response) => {
        setSetInfo({
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
          setActivities(response.data.map((activity) => activity.activityName));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeActivityName = (e) => {
    setSetInfo({
      ...setInfo,
      activityName: e.target.value,
    });
  };

  const onChangeReps = (e) => {
    setSetInfo({
      ...setInfo,
      reps: e.target.value,
    });
  };

  const onChangeWeight = (e) => {
    setSetInfo({
      ...setInfo,
      weight: e.target.value,
    });
  };

  const onChangeDate = (date) => {
    setSetInfo({
      ...setInfo,
      date: date,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const set = {
      activityName: setInfo.activityName,
      reps: setInfo.reps,
      weight: setInfo.weight,
      date: setInfo.date,
    };

    console.log(set);

    axios
      .post(BASE_URL + '/sets/update/' + props.match.params.id, set)
      .then((res) => {
        console.log(res.data);
        window.location = '/';
      });
  };

  return (
    <div>
      <h3>Edit Session Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Activity: </label>
          <select
            required
            className='form-control'
            value={setInfo.activityName}
            onChange={onChangeActivityName}
          >
            {activities.map(function (activityName) {
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
            value={setInfo.reps}
            onChange={onChangeReps}
          />
        </div>
        <div className='form-group'>
          <label>Weight (in kilos): </label>
          <input
            type='text'
            className='form-control'
            value={setInfo.weight}
            onChange={onChangeWeight}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={setInfo.date} onChange={onChangeDate} />
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
};

export default EditSet;
