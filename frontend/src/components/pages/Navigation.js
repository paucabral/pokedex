import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap/';
// logo
import logo from "../../assets/logo/masterball.png"

const Navigation = () => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect fixed="top" expand='md' variant="dark" className="navigation" style={{ backgroundColor: "rgb(0, 0, 0, 1)" }}>
        <Container>
          <img className="brandLogo" width="33em" src={logo} alt="logo"/>
          <Link to="/" style={{ textDecoration: "none" }}><h2 className="text-white brand">PokeDex</h2></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsove-navbar-nav" className="justify-content-end" style={{ width: "100%" }}>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="/" className="navigationItem">Home</Nav.Link>
              <Nav.Link href="/scan" className="navigationItem">Scan</Nav.Link>
              <Nav.Link href="/entries" className="navigationItem">Entries</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

export default Navigation
