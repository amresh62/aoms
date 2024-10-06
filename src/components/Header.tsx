import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className='mb-3'>
      <Container>
        <Navbar.Brand as={Link} to="/">AOMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/assets">Asset Management</Nav.Link>
            <Nav.Link as={Link} to="/interviews">Exit Interviews</Nav.Link>
            {auth?.user?.role === 'ADMIN' && (
              <Nav.Link as={Link} to="/audit">Audit Logs</Nav.Link>
            )}
          </Nav>
          <Nav>
            <NotificationCenter />
            {auth?.user ? (
              <NavDropdown title={`Welcome, ${auth.user.username}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
