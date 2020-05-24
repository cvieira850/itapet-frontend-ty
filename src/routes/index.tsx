import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Test from '../pages/Test';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Test} />
  </Switch>
);

export default Routes;
