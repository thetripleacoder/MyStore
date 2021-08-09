import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row } from 'react-bootstrap';
import UserContext from '../userContext';
import '../App.css';
import Swal from 'sweetalert2';

export default function Updates() {
  const { user } = useContext(UserContext);
  const [update, setUpdate] = useState(0);
  const [picture, setPicture] = useState('');
  const [name, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetch(
      `https://cryptic-crag-81593.herokuapp.com/api/products/${localStorage.getItem(
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
        setPicture(localStorage.productPicture);
        setProductName(localStorage.productName);
        setDescription(localStorage.productDescription);
        setPrice(localStorage.productPrice);
        setUpdate({});
      });
  }, []);

  useEffect(() => {
    if (
      picture !== localStorage.productPicture ||
      name !== localStorage.productName ||
      description !== localStorage.productDescription ||
      price !== localStorage.productPrice
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    setUpdate({});
  }, [picture, name, description, price]);

  function updateProduct(productId) {
    fetch(
      `https://cryptic-crag-81593.herokuapp.com/api/products/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          picture: picture,
          name: name,
          description: description,
          price: price,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed!',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Update Successful!',
            text: 'Product Information has been updated.',
          });
        }
      });
  }

  return (
    <Row xs={12} md={2} className='rowCenter'>
      <Card className='mt-5 '>
        <Card.Img variant='top' className='cardImageUpdate' src={picture} />
        <Card.Body>
          <Form.Group>
            <Form.Label>Picture:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter URL'
              value={picture}
              onChange={(event) => {
                setPicture(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(event) => {
                setProductName(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Description'
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Price'
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              required
            />
          </Form.Group>
        </Card.Body>

        {isActive ? (
          <Button
            variant='success'
            className=''
            onClick={() => updateProduct(localStorage.productId)}
          >
            Update Product Information
          </Button>
        ) : (
          <Button variant='success' className='' disabled>
            Update Product Information
          </Button>
        )}
      </Card>
    </Row>
  );
}
