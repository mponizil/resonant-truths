import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Page from './components/Page'
import Index from './pages/Index'
import Entry from './pages/Entry'
import Record from './pages/Record'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Page>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/entries/:id/record" component={Record} />
            <Route path="/entries/:id" component={Entry} />
          </Switch>
        </Page>
      </Router>
    )
  }
}

export default App;
