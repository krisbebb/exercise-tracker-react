import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import spinner from '../img/spinner.gif'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Set = props => (
  <tr>
    <td>{props.set.activityName}</td>
    <td>{props.set.reps}</td>
    <td>{props.set.weight}</td>
    <td>{props.set.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.set._id}>edit</Link> | <a href="#" onClick={() => { props.deleteSet(props.set._id) }}>delete</a>
    </td>
  </tr>
)

export default class SetsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get(BASE_URL + '/sets/')
      .then(response => {
        this.setState({ 
          sets: response.data,
        loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSet = (id) => {
    axios.delete(BASE_URL + '/sets/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      sets: this.state.sets.filter(el => el._id !== id)
    })
  }

  setList() {
    return this.state.sets.map(currenteSet => {
      return <Set set={currenteSet} deleteSet={this.deleteSet} key={currenteSet._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Sessions</h3>
        { this.state.loading === true ? (
          <div>
          <img src={require('../../img/spinner.gif')} alt='LOADING'/>
          <p>LOADING</p>
          </div>
          )
        : 
        <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Activity</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
      <tbody>{this.setList()}</tbody>
      </table>
      }
      </div>
    )
  }
}