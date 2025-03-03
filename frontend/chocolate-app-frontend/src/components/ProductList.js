import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import api from '../api/axios';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('jwtToken');

  const fetchProducts = async () => {
    try {
        const token = getToken();
      const response = await axios.get('/products', {
        headers: {
            'Authorization': `Bearer ${token}`,
          }
      }); 
      setProducts(response.data.products);
    } catch (err) {
      setError('Failed to fetch products.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = getToken();
        const { role } = jwtDecode(token)

        if (role !== 'admin'){
          window.alert('Must be of role admin to do this action!')
          navigate('/products')
          return;
        }
        await axios.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        });
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product.');
      }
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  return (
    <Container>
      <h1 className="my-4 text-center">All Products</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="text-end mb-4">
        <Button variant="primary" onClick={() => navigate('/products/add')}>Add New Product</Button>
      </div>

      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {product.type} - {product.price} €
                  </Card.Subtitle>
                  <Card.Text>
                    {product.color}...
                  </Card.Text>
                  <Button variant="info" onClick={() => navigate(`/products/${product.id}`)} className="me-2">
                    View
                  </Button>
                  <Button variant="warning" onClick={() => navigate(`/products/edit/${product.id}`)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
