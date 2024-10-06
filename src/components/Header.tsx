import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NotificationCenter from './NotificationCenter';

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" className='mb-3'>
        <Container>
          <Navbar.Brand href="/">AOMS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/assets">Asset Management</Nav.Link>
            <Nav.Link href="/interviews">Exit Interviews</Nav.Link>
            <Nav.Link href="/audit">Audit Logs</Nav.Link>
            <Nav.Link href="#"><NotificationCenter /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;