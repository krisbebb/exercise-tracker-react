import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <Link to='/' className='navbar-brand'>
          Session Tracker
        </Link>
        <div className='navbar-collapse'>
          <ul className='navbar-nav mr-auto'>
            <li className='navbar-item'>
              <Link to='/' className='nav-link'>
                Session Log
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/create' className='nav-link'>
                Create Set
              </Link>
            </li>
            <li className='navbar-item'>
            <Link to='/activities' className='nav-link'>
              Activities
            </Link>
          </li>
            <li className='navbar-item'>
              <Link to='/activity' className='nav-link'>
                Create Activity
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/splitDays/create' className='nav-link'>
                Create Split Group
              </Link>
            </li>
            <li className='navbar-item'>
            <Link to='/splitDays/list' className='nav-link'>
              Show Split Groups
            </Link>
          </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
