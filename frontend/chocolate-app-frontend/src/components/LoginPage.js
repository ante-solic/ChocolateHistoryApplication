import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post('/login', { username, password }); 
      console.log('Login successful:', response.data);

      const token = response.data.token; 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('jwtToken', token);

      navigate('/home'); 
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Login Page</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100">
              Sign in
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Not a member? <a href="/register">Register</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
