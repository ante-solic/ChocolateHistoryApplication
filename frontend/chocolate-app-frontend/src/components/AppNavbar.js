import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AppNavbar() {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return !!localStorage.getItem('jwtToken'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Chocolate history
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate('/products')}
            >
              Products
            </Button>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate('/manufacturers')}
            >
              Manufacturers
            </Button>

            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate('/users')}
            >
              Users
            </Button>
            {isLoggedIn() ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
