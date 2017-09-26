import React, { Component } from 'react';
import '../style/App.css';
import HeroPage from '../pages/hero-page'
import ComicPage from '../pages/comic-page'
import FavoritePage from '../pages/favorite-page'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './header'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <div className="App-body container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/heroes" />
              </Route>
              <Route path="/heroes/:characterId?" component={HeroPage} />
              <Route path="/comics/:comicId?" component={ComicPage} />
              <Route path="/favorites" component={FavoritePage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
