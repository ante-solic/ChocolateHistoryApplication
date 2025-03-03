import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function ManufacturerDetails() {
  const { id } = useParams();
  const [manufacturer, setManufacturer] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`/manufacturers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        });
        setManufacturer(response.data.manufacturer);
      } catch (error) {
        setError('Failed to fetch manufacturer details.');
      }
    };
    fetchManufacturer();
  }, [id]);

  if (!manufacturer) {
    return <Container>{error && <Alert variant="danger">{error}</Alert>}</Container>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <Card.Title>{manufacturer.name}</Card.Title>
          <Card.Text>
            <strong>Year:</strong> {manufacturer.year}
          </Card.Text>
          <Card.Text>
            <strong>Country:</strong> {manufacturer.country}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {manufacturer.description}
          </Card.Text>
          {manufacturer.logo && (
            <Card.Img variant="top" src={manufacturer.logo} alt={`${manufacturer.name} logo`} />
          )}
          <Button variant="secondary" className="mt-3" onClick={() => navigate('/manufacturers')}>
            Back to List
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ManufacturerDetails;
