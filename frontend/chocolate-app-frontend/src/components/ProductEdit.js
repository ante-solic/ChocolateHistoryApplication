import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const getToken = () => localStorage.getItem('jwtToken');

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data.product);
      } catch (err) {
        setError('Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Product updated successfully.');
      setTimeout(() => navigate(`/products/${id}`), 2000); 
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Edit Product</h2>
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
          />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
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
          />
        </Form.Group>
        <Form.Group controlId="percentage" className="mb-3">
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="Enter percentage"
          />
        </Form.Group>
        <Form.Group controlId="color" className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter product color"
          />
        </Form.Group>
        <Form.Group controlId="manufacturerId" className="mb-3">
          <Form.Label>Manufacturer ID</Form.Label>
          <Form.Control
            type="number"
            name="manufacturerId"
            value={formData.manufacturerId}
            onChange={handleChange}
            placeholder="Enter manufacturer ID"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default ProductEdit;
