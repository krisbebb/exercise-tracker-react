import React from 'react';
import { Link } from 'react-router-dom';


const Set = (props) => {
  return (
    <tr>
      <td>{props.set.activityName}</td>
      <td>{props.set.reps}</td>
      <td>{props.set.weight}</td>
      <td>{props.set.date.substring(0, 10)}</td>
      <td>
        <Link to={'/edit/' + props.set._id}>edit</Link> |{' '}
        <a
          href='#'
          onClick={() => {
            props.deleteSet(props.set._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default Set;
