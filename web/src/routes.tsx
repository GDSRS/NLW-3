import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphangesMap from './pages/OrphanagesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch> {/* certifica-se de que apenas uma rota seja chamada */}
        <Route exact path='/' component={Landing} />
        <Route path='/app' component={OrphangesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;