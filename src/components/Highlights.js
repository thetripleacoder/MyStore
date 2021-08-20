import React from 'react';
import { Card, Row } from 'react-bootstrap';

export default function Highlights({ featuredProp }) {
  return (
    <Row className='my-0'>
      <Card.Img
        variant='top'
        className='cardImageDetail'
        src={featuredProp.picture}
      />
    </Row>
  );
}
