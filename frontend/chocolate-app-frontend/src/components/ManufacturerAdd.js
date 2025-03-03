import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ManufacturerAdd() {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    country: '',
    description: '',
    logo: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('jwtToken');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = getToken();
      await axios.post('/manufacturers', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
          }
      });
      setSuccess('Manufacturer added successfully.');
      setTimeout(() => navigate('/manufacturers'), 2000);
    } catch (error) {
      setError('Failed to add manufacturer.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add Manufacturer</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter manufacturer name"
          />
        </Form.Group>
        <Form.Group controlId="year" className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year established"
          />
        </Form.Group>
        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group controlId="logo" className="mb-3">
          <Form.Label>Logo URL</Form.Label>
          <Form.Control
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Enter logo URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Manufacturer
        </Button>
      </Form>
    </Container>
  );
}

export default ManufacturerAdd;
