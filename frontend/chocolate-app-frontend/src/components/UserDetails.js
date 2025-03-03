import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user details.');
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <Container>{error && <Alert variant="danger">{error}</Alert>}</Container>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>
            <strong>ID:</strong> {user.id}
          </Card.Text>
          <Card.Text>
            <strong>Role:</strong> {user.role}
          </Card.Text>
          <Button variant="secondary" className="mt-3" onClick={() => navigate('/users')}>
            Back to List
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetails;
