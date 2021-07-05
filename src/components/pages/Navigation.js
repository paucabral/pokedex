import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap/';

const Navigation = () => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect fixed="top" expand='sm' bg="dark" variant="dark" className="navigation">
        <Container>
          <h2 className="text-white">PokeDex</h2>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsove-navbar-nav" className="justify-content-end" style={{ width: "100%" }}>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/list">Entries</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

export default Navigation
