import React from 'react'
import { Link } from 'react-router-dom';

const Activity = (props) => (
    <tr>
      <td>{props.activity.activityName}</td>
  
      <td>
        <Link to={'/activity/edit/' + props.activity._id}>edit</Link> |{' '}
        <a
          href='#'
          onClick={() => {
            props.deleteActivity(props.activity._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );

  export default Activity