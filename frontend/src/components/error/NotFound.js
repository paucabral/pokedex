import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap/';

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="text-white container" style={{ height: "100vh", display: "flex", justifyContent: "center", alignContent: "center", marginBottom: "3rem" }}>
        <Container style={{ margin: "2em" }}>
          <Row>
            <Col style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              <h1 style={{ fontSize: "4em", textAlign: "center" }}>Error 404: Page not found.</h1>
            </Col>
          </Row>
          <Row style={{ marginTop: "3em" }}>
            <Col style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              <p style={{ textAlign: "center", width: "80%", fontSize: "1.3em" }}>The page you tried to access does not exist.</p>
            </Col>
          </Row>
          <Row style={{ marginTop: "3em" }}>
            <Col style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              <p style={{ textAlign: "center", width: "90%", fontSize: "1.3em" }}>To raise an issue, or for any other concerns, please send a message from the <Link to={{ pathname: "https://paucabral.github.io/#contact" }} target="_blank" className="text-white" style={{ textDecoration: "none" }}><b className="contact">Contact Section</b></Link>.</p>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "2rem" }}>
            <Col style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Link to="/" className="btn btn-info" style={{ fontWeight: "bold" }}>Back to Home <FontAwesomeIcon icon={faHome}/></Link>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default NotFound
