import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Home from '../pages/Home';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/home" component={Home} />
  </Switch>
);

export default Routes;
