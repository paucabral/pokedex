// import logo from './logo.svg';
import './App.css';
import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Navigation from './components/pages/Navigation';
import Home from './components/pages/Home';
import List from './components/pages/List';
import Pokemon from './components/pages/Pokemon';
import NotFound from './components/error/NotFound';

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
      </div>

      <div className="container" style={{ marginTop: "5rem" }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/pokemon/:id">
            <Pokemon />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
