import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Highlights({ featuredProp }) {
  return (
    <Row className='my-0'>
      {/* <Card className='my-2 featured-card'> */}
      <Card.Img
        variant='top'
        className='cardImageDetail'
        src={featuredProp.picture}
      />
      {/* <Card.Body>
          <Card.Title>{featuredProp.name}</Card.Title>
          <Card.Text>{featuredProp.description}</Card.Text>
          <Card.Text>Price: {featuredProp.price} PHP</Card.Text>
        </Card.Body> */}
      {/* <Link
          to={`/products/${featuredProp._id}`}
          onClick={() => localStorage.setItem('productId', featuredProp._id)}
          className='btn btn-primary'
        >
          Details
        </Link> */}
      {/* </Card> */}
    </Row>
  );
}
