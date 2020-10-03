import React from 'react'
import { Link } from 'react-router-dom';

const SplitDay = (props) => (
    <tr>
      <td>{props.splitDay.splitDay}</td>
  
      <td>
        <Link to={'/splitDays/edit/' + props.splitDay._id}>edit</Link> |{' '}
        <a
          href='#'
          onClick={() => {
            props.deleteSplitDay(props.splitDay._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );

  export default SplitDay