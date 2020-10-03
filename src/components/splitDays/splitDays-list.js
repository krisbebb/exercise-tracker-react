import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SplitDay from './splitDay'

const BASE_URL = process.env.REACT_APP_BASE_URL;


const SplitDayList = ()  => {

  const [splitDays, setSplitDays] = useState([])

  useEffect(() => {
    axios
      .get(BASE_URL + '/splitDays/')
      .then((response) => {
        setSplitDays(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const deleteSplitDay = (id) => {
    axios
      .delete(BASE_URL + '/splitDays/' + id)
      .then((response) => {
        console.log(response.data);
        setSplitDays(splitDays.filter((el) => el._id !== id))
      });
  };

  const splitDayList = () => {
    return splitDays.map((currentGroup) => {
      return (
        <SplitDay
          splitDay={currentGroup}
          deleteSplitDay={deleteSplitDay}
          key={currentGroup._id}
        />
      );
    });
  }

    return (
      <div>
        <h3>Split Day Groups</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{splitDayList()}</tbody>
        </table>
      </div>
    );
}

export default SplitDayList
