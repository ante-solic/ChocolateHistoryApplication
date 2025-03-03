import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function RegisterPage() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: 'user', 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!userData.username || !userData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('/register', userData); 
      console.log('Registration successful:', response.data);

      setSuccess('Registration successful. Redirecting to login page...');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
