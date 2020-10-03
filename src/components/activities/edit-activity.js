import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditActivity = (props) => {
  
  const [activityName, setActivityName] = useState('')

  // componentDidMount() {
  //   console.log(this.props);
  //   axios
  //     .get(
  //       BASE_URL + '/activities/' +
  //         this.props.match.params.id
  //     )

  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({
  //         activityName: response.data.activityName,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    axios
      .get(
        BASE_URL + '/activities/' +
          props.match.params.id
      )
      .then((response) => {
        console.log(response.data);
        setActivityName(response.data.activityName)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const onChangeActivityName = (e) => {
    setActivityName(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const activity = {
      activityName: activityName,
    };

    console.log(activity);

    axios
      .post(
        BASE_URL + '/activities/update/' +
          props.match.params.id,
          activity
      )
      .then((res) => {
        console.log(res.data);
        setActivityName('')
        window.location = '/activities';
      });
  };

    return (
      <div>
        <h3>Edit Activity</h3>
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
              value='Edit Activity'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
}
export default EditActivity