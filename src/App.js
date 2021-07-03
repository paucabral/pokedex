import logo from './logo.svg';
import './App.css';
import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import List from './components/pages/List';
import Pokemon from './components/pages/Pokemon';
import NotFound from './components/error/NotFound';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
      </div>

      <div className="container">
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
