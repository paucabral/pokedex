// import logo from './logo.svg';
import './App.css';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// useEffect
import React, { useEffect } from 'react';
// components
import Navigation from './components/pages/Navigation';
import Footer from './components/pages/Footer';
import Home from './components/pages/Home';
import List from './components/pages/List';
import Pokemon from './components/pages/Pokemon';
import NotFound from './components/error/NotFound';
// img
import bg_img from './assets/background/background.png';

function App() {
  useEffect(
    () => {
      document.title = "Pau Cabral | PokéDex"
    },[]
  );

  return (
    <Router>
      <div style={{ backgroundImage: `url(${bg_img})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat" }}>
        
        <div className="container">
          <Navigation />
        </div>

        <div style={{ paddingTop: "5.5rem", paddingBottom: "3rem" }}>
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

        <div className="container">
          <Footer />
        </div>
        
      </div>
      
    </Router>
  );
}

export default App;
