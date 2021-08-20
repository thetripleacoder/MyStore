import React, { useState, useContext } from 'react';
import { Card, Button, InputGroup, Form } from 'react-bootstrap';
import UserContext from '../userContext';
import '../App.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Detail({ detailProp }) {
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [update, setUpdate] = useState(0);

  function add() {
    setQuantity(quantity + 1);
  }
  function subtract() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function addToCart() {
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

        var date1 = new Date();
        window.localStorage.setItem('date', date1.getTime());

        var date2 = new Date(Number(window.localStorage.getItem('date')));
        date2.setDate(date2.getDate() + 7);
        window.localStorage.setItem('date', date2.getTime());
      });

    let data = {
      date: localStorage.getItem('date'),
      _id: localStorage.getItem('productId'),
      name: localStorage.getItem('productName'),
      price: localStorage.getItem('productPrice'),
      quantity: quantity,
    };

    var cart = [];
    cart = JSON.parse(localStorage.getItem('session')) || [];

    cart.push(data);

    Swal.fire({
      icon: 'success',
      title: 'Add to Cart Successful!',
      text: `Product added to cart.`,
    });
    localStorage.setItem('session', JSON.stringify(cart));

    setUpdate({});
  }

  return (
    <Card>
      <Card.Img
        variant='top'
        className='cardImageUpdate'
        src={detailProp.picture}
      />
      <Card.Body>
        <Card.Title>{detailProp.name}</Card.Title>
        <Card.Text>{detailProp.description}</Card.Text>
        <Card.Text>Price: ₱{parseFloat(detailProp.price).toFixed(2)}</Card.Text>
        <InputGroup className='mb-3'>
          <Button
            variant='outline-secondary'
            id='button-addon1'
            onClick={subtract}
          >
            -
          </Button>
          <Form.Control
            className='inputValue'
            type='number'
            placeholder='Enter Quantity'
            min='1'
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            required
          />

          <Button variant='outline-secondary' id='button-addon1' onClick={add}>
            +
          </Button>
        </InputGroup>
      </Card.Body>

      {user.email ? (
        quantity >= 1 ? (
          <Button variant='primary' onClick={addToCart}>
            Add To Cart
          </Button>
        ) : (
          <Button variant='primary' disabled>
            Add To Cart
          </Button>
        )
      ) : (
        <Link to={'/login'} className='btn btn-dark px-4 py-2 link'>
          {' '}
          Login to Order
        </Link>
      )}
    </Card>
  );
}
