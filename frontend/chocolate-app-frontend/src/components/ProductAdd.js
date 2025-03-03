import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductAdd() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    percentage: '',
    color: '',
    manufacturerId: '',
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
      if (!formData.name || !formData.price || !formData.type) {
        setError('Please fill in all required fields (name, price, type).');
        return;
      }
      const token = getToken();
      await axios.post('/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Product added successfully.');
      setTimeout(() => navigate('/products'), 2000);
    } catch (err) {
      setError('Failed to add product.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add Product</h2>
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
            placeholder="Enter product name"
            required
          />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </Form.Group>
        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter product type"
            required
          />
        </Form.Group>
        <Form.Group controlId="percentage" className="mb-3">
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="Enter percentage (optional)"
          />
        </Form.Group>
        <Form.Group controlId="color" className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter color (optional)"
          />
        </Form.Group>
        <Form.Group controlId="manufacturerId" className="mb-3">
          <Form.Label>Manufacturer ID</Form.Label>
          <Form.Control
            type="number"
            name="manufacturerId"
            value={formData.manufacturerId}
            onChange={handleChange}
            placeholder="Enter manufacturer ID (optional)"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default ProductAdd;
