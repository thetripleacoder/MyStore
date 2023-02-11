import React, { useState, useEffect } from 'react';
import { Card, Row, Container } from 'react-bootstrap';
import '../App.css';

import Detail from '../components/Detail';

export default function Details() {
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/products/${localStorage.getItem(
        'productId'
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        let product = data.data;

        localStorage.setItem('productPicture', product.picture);
        localStorage.setItem('productName', product.name);
        localStorage.setItem('productDescription', product.description);
        localStorage.setItem('productPrice', product.price);

        setUpdate({});
      });
  }, []);

  let detailContent = {
    _id: localStorage.getItem('productId'),
    picture: localStorage.getItem('productPicture'),
    name: localStorage.getItem('productName'),
    description: localStorage.getItem('productDescription'),
    price: localStorage.getItem('productPrice'),
  };

  return (
    <Container>
      <Row xs={12} md={2} className='justify-content-center '>
        <Card className='my-5'>
          <Detail detailProp={detailContent} />
        </Card>
      </Row>
    </Container>
  );
}
