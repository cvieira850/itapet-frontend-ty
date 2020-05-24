import React from 'react';
import { Switch } from 'react-router-dom';

import Signin from '../pages/Signin';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
  </Switch>
);

export default Routes;
