import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap/';
// logo
import logo from "../../assets/logo/masterball.png"

const Navigation = () => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect fixed="top" expand='sm' bg="dark" variant="dark" className="navigation">
        <Container>
          <img width="33em" src={logo} alt="logo"/>
          <h2 className="text-white brand">PokeDex</h2>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsove-navbar-nav" className="justify-content-end" style={{ width: "100%" }}>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="/" className="navigationItem">Home</Nav.Link>
              <Nav.Link href="/list" className="navigationItem">Entries</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

export default Navigation
