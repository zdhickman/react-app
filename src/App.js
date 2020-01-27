import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Browser from './components/Browser';
import Search from './components/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import VinylImg from './vinyl.png';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <img className="Vinyl-logo" src={VinylImg} />
            </li>
            <li>
              <Link to="/">Browse</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </header>
        <Switch>
          <Route exact path="/">
            <Browser />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  albumCovers: state.get('albumCovers'),
});

export default connect(mapStateToProps)(App);
