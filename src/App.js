import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/common/navbar';
import SetsList from './components/sets/sets-list';
import EditSet from './components/sets/edit-set';
import CreateSet from './components/sets/create-set';
import CreateActivity from './components/activities/create-activity';
import ActivitiesList from './components/activities/activities-list';
import EditActivity from './components/activities/edit-activity';
import SplitDaysList from './components/splitDays/splitDays-list'
import CreateSplitDay from './components/splitDays/create-splitDay'
import EditSplitDay from './components/splitDays/edit-splitDay';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/' exact component={SetsList} />
        <Route path='/edit/:id' component={EditSet} />
        <Route path='/create' component={CreateSet} />
        <Route path='/activities' exact component={ActivitiesList} />
        <Route path='/activity' exact component={CreateActivity} />
        <Route path='/activity/edit/:id' component={EditActivity} />
        <Route path='/splitDays/list' exact component={SplitDaysList} />
        <Route path='/splitDays/create' exact component={CreateSplitDay} />
        <Route path='/splitDays/edit/:id' component={EditSplitDay} />
      </div>
    </Router>
  );
}

export default App;
