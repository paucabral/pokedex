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
import { bg_img } from './data/api';

function App() {
  return (
    <Router>
      <div style={{ backgroundImage: `url(${bg_img})`}}>

        <div className="container">
          <Navigation />
        </div>

        <div className="container" style={{ paddingTop: "5rem" }}>
          <div>
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
        </div>
      
      </div>
      
    </Router>
  );
}

export default App;
