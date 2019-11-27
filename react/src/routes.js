import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Operations from './pages/Operations';
import CartesianProduct from './pages/CartesianProduct';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/operacoes" exact component={Operations} />
      <Route path="/cartesiano" exact component={CartesianProduct} />
    </Switch>
  );
}
