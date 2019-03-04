import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';

import PrimarySearchAppBar from './components/navbar/mainNavigation';
import MenuNav from './components/navbar/subNavigation';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingPage from './pages/Booking';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <PrimarySearchAppBar/>
      <MenuNav/>
      <Switch>
      <Redirect from="/" to="/auth" exact/>
      <Route path="/auth" component={AuthPage}></Route>
      <Route path="/events" component={EventsPage}></Route>
      <Route path="/booking" component={BookingPage}></Route>
      </Switch>
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
