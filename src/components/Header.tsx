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
            <Nav.Link href="/offboarding">Offboarding Processes</Nav.Link>
            <Nav.Link href="/tasks">Task Management</Nav.Link>
            <Nav.Link href="/assets">Asset Returns</Nav.Link>
            <Nav.Link href="/interviews">Exit Interviews</Nav.Link>
            <Nav.Link href="/audit">Audit Logs</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
            <Nav.Link href="#"><NotificationCenter /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        {/* <header>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/offboarding">Offboarding Processes</Link></li>
                    <li><Link to="/tasks">Task Management</Link></li>
                    <li><Link to="/assets">Asset Returns</Link></li>
                    <li><Link to="/interviews">Exit Interviews</Link></li>
                    <li><Link to="/audit">Audit Logs</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </header> */}
        </>
    );
};

export default Header;