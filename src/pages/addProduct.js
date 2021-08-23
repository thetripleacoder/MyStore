import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row, Container } from 'react-bootstrap';
import UserContext from '../userContext';
import '../App.css';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

export default function AddProduct() {
  const { user } = useContext(UserContext);
  const [picture, setPicture] = useState(
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  );
  const [name, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (name !== '' && description !== '' && price > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, description, price]);

  function addProduct(e) {
    fetch('https://cryptic-crag-81593.herokuapp.com/api/products', {
      method: 'POST',
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
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Product Creation Failed!',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Product Creation Successful!',
            text: 'Product has been added.',
          });
        }
      });
    setPicture('');
    setProductName('');
    setDescription('');
    setPrice(0);
  }
  return user.isAdmin === false || user.isAdmin === null ? (
    <Redirect to='/login' />
  ) : (
    <Container>
      <Row xs={12} md={2} className='justify-content-center'>
        <Card className='my-5 '>
          {picture ===
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' ? (
            <h3 className='text-center'>Sample Product Image</h3>
          ) : null}
          <Card.Img
            variant='top'
            className='addproduct-card-image'
            src={picture}
          />
          <Card.Body>
            <Form.Group>
              <Form.Label>Image:</Form.Label>
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
                min='1'
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                required
              />
            </Form.Group>
          </Card.Body>

          {isActive ? (
            <Button variant='success' onClick={() => addProduct()}>
              Add Product
            </Button>
          ) : (
            <Button variant='success' disabled>
              Add Product
            </Button>
          )}
        </Card>
      </Row>
    </Container>
  );
}
