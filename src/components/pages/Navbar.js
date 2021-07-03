import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <React.Fragment>
      <h3>navbar</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default navbar
