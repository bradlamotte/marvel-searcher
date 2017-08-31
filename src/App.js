import React, { Component } from 'react';
import './App.css';
import HeroPage from './pages/hero-page'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/header'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <div className="App-body">
            <Switch>
              <Route exact path="/">
                <Redirect to="/hero" />
              </Route>
              <Route path="/hero" component={HeroPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
