import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
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

export default class SplitDayList extends Component {
  constructor(props) {
    super(props);

    this.state = { splitDays: [] };
  }

  componentDidMount() {
    axios
      .get(BASE_URL + '/splitDays/')
      .then((response) => {
        this.setState({ splitDays: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteSplitDay = (id) => {
    axios
      .delete(BASE_URL + '/splitDays/' + id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          splitDays: this.state.splitDays.filter((el) => el._id !== id),
        });
      });
  };

  splitDayList() {
    return this.state.splitDays.map((currentGroup) => {
      return (
        <SplitDay
          splitDay={currentGroup}
          deleteSplitDay={this.deleteSplitDay}
          key={currentGroup._id}
        />
      );
    });
  }

  render() {
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
          <tbody>{this.splitDayList()}</tbody>
        </table>
      </div>
    );
  }
}
