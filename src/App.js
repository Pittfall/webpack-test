import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Users from './containers/Users';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const AsyncPizza = asyncComponent(() => {
   return import('./containers/Pizza');
});

class App extends Component {
   render () {
      <div>
         <div>
            <Link to="/">Users</Link> |
            <Link to="/pizza">Pizza</Link>
         </div>
         <div>
            <Route path='/' exact component={Users} />
            <Route path='/pizza' exact component={AsyncPizza} />
         </div>
      </div>
   }
}

export default App;