import React from 'react';
// image
import logoLoad from '../../assets/logo/logo-load.png';

const loading = () => {
  return (
    <React.Fragment>
      <div style={{ margin: "1rem", position: "fixed", zIndex: "2" }}>
        <div className="container row" style={{ marginLeft: "-0.5rem", display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "rgb(0, 0, 0, 0.5)", padding: "10%", borderRadius: "40px" }}>
          <div className="row" style={{ justifyContent: "center", margin: "1em"}}>
            <img width="30%" src={logoLoad} style={{ animation: "App-logo-spin infinite 15s linear" }} alt="LOADING..."/>
          </div>
          <div className="row">
            <h4 className="text-white">LOADING...</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default loading
