import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ManufacturerList = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('jwtToken');

  const fetchManufacturers = async () => {
    try {
        const token = getToken();
      const response = await axios.get('/manufacturers', {
        headers: {
            'Authorization': `Bearer ${token}`,
          }
      });
      setManufacturers(response.data.manufacturers);
    } catch (err) {
      setError('Failed to fetch manufacturers.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this manufacturer?')) {
      try {
        const token = getToken();
        const { role } = jwtDecode(token)

        if (role !== 'admin'){
          window.alert('Must be of role admin to do this action!')
          navigate('/manufacturers')
          return;
        }

        await axios.delete(`/manufacturers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        });
        fetchManufacturers(); 
      } catch (err) {
        setError('Failed to delete manufacturer.');
      }
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return (
    <Container>
      <h1 className="my-4 text-center">All Manufacturers</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="text-end mb-4">
        <Button variant="primary" onClick={() => navigate('/manufacturers/add')}>Add New Manufacturer</Button>
      </div>

      <Row>
        {manufacturers.length > 0 ? (
          manufacturers.map((manufacturer) => (
            <Col key={manufacturer.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{manufacturer.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {manufacturer.country} ({manufacturer.year})
                  </Card.Subtitle>
                  <Card.Text>
                    {manufacturer.description.slice(0, 100)}...
                  </Card.Text>
                  <Button variant="info" onClick={() => navigate(`/manufacturers/${manufacturer.id}`)} className="me-2">
                    View
                  </Button>
                  <Button variant="warning" onClick={() => navigate(`/manufacturers/edit/${manufacturer.id}`)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(manufacturer.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No manufacturers found.</p>
        )}
      </Row>
    </Container>
  );
};

export default ManufacturerList;
