import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CreateSet = () => {
  const [setInfo, setSetInfo] = useState({
    activityName: '',
    reps: '8',
    weight: 0,
    date: new Date(),
    activities: [],
  });

  useEffect(() => {
    axios
      .get(BASE_URL + '/activities/')
      .then((response) => {
        if (response.data.length > 0) {
          setSetInfo({
            ...setInfo,
            activities: response.data.map(
              (activityName) => activityName.activityName
            ),
            activityName: response.data[0].activityName,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeActivityName = (e) => {
    setSetInfo({
      ...setInfo,
      ...setInfo.activities,
      activityName: e.target.value,
    });
  };

  const onChangeReps = (e) => {
    setSetInfo({
      ...setInfo,
      ...setInfo.activities,
      reps: e.target.value,
    });
  };

  const onChangeWeight = (e) => {
    setSetInfo({
      ...setInfo,
      ...setInfo.activities,
      weight: e.target.value,
    });
  };

  const onChangeDate = (date) => {
    setSetInfo({
      ...setInfo,
      ...setInfo.activities,
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

    axios.post(BASE_URL + '/sets/add', set).then((res) => {
      console.log(res.data);
      window.location = '/';
    });
  };

  return (
    <div>
      <h3>Create New Set</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Activity: </label>
          <select
            required
            className='form-control'
            value={setInfo.activityName}
            onChange={onChangeActivityName}
          >
            {setInfo.activities.map(function (activityName) {
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
            type='number'
            required
            className='form-control'
            value={setInfo.reps}
            onChange={onChangeReps}
          />
        </div>
        <div className='form-group'>
          <label>Weight without bar (in kilos): </label>
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
          <input type='submit' value='Create Set' className='btn btn-primary' />
        </div>
      </form>
    </div>
  );
};

export default CreateSet;
