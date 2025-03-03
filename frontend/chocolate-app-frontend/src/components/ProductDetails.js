import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
        setProduct(response.data.product);
      } catch (err) {
        setError('Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Container>{error && <Alert variant="danger">{error}</Alert>}</Container>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> {product.price} €
          </Card.Text>
          <Card.Text>
            <strong>Type:</strong> {product.type}
          </Card.Text>
          <Card.Text>
            <strong>Percentage:</strong> {product.percentage}%
          </Card.Text>
          <Card.Text>
            <strong>Color:</strong> {product.color}
          </Card.Text>
          <Card.Text>
            <strong>Manufacturer ID:</strong> {product.manufacturerId}
          </Card.Text>
          <Button variant="secondary" className="mt-3" onClick={() => navigate('/products')}>
            Back to List
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
