import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('jwtToken');

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const response = await axios.get('/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <h1 className="my-4 text-center">User List</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {users.length > 0 ? (
          users.map((user) => (
            <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Role: {user.role}</Card.Subtitle>
                  <Button variant="info" onClick={() => navigate(`/users/${user.id}`)} className="me-2">
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </Row>
    </Container>
  );
};

export default UserList;
