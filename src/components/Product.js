import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Product({ productProp }) {
  return (
    <Col xs={12} md={4}>
      <Link
        to={`/products/${productProp._id}`}
        onClick={() => localStorage.setItem('productId', productProp._id)}
        className='cardLink'
      >
        <Card
          to={`/products/${productProp._id}`}
          onClick={() => localStorage.setItem('productId', productProp._id)}
          className='my-2 cardProduct cardAnimate'
        >
          <Card.Img
            variant='top'
            className='cardImage'
            src={productProp.picture}
          />
          <Card.Body>
            <Card.Title>{productProp.name}</Card.Title>
            <Card.Text>Price: ₱{productProp.price.toFixed(2)}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
