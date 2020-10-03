import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Set from './set';

import Spinner from '../../img/spinner.gif'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SetsList = () => {
 
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(BASE_URL + '/sets/')
      .then((response) => {
        setSets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteSet = (id) => {
    axios.delete(BASE_URL + '/sets/' + id).then((response) => {
      console.log(response.data);
    });
    setSets(sets.filter((el) => el._id !== id));
  
  };

  const setList = () => {
    return sets.map((currentSet) => {
      return (
        <Set set={currentSet} deleteSet={deleteSet} key={currentSet._id} />
      );
    });
  };

  return (
    <div>
      <h3>Logged Sessions</h3>
      {loading === true ? (
        <div>
          <img src={Spinner} alt='LOADING' />
          <p>LOADING</p>
        </div>
      ) : (
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Activity</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{setList()}</tbody>
        </table>
      )}
    </div>
  );
};

export default SetsList;
