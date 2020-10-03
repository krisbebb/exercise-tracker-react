import React from 'react'
import { Link } from 'react-router-dom';

const Activity = (props) => (
    <tr>
      <td>{props.activity}</td>
  
      <td>
        {/*<Link to={'/activity/edit/' + props.activity._id}>edit - not working</Link> |{' '} */}
        <a
          href='#'
          onClick={() => {
            props.deleteActivity(props.activity);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );

  export default Activity