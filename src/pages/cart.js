import React, { useState, useContext, useEffect } from 'react';
import { Row, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import UserContext from '../userContext';
import Swal from 'sweetalert2';

export default function Cart() {
  const [update, setUpdate] = useState(0);
  const [userOrder, setUserOrder] = useState(0);

  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch('https://cryptic-crag-81593.herokuapp.com/api/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserOrder(data);
      });
    setUpdate({});
  }, []);

  function add(element) {
    let cart = JSON.parse(localStorage.session);
    let index = cart.findIndex((obj) => obj.name === element.name);
    cart[index].quantity = element.quantity + 1;
    localStorage.setItem('session', JSON.stringify(cart));
    setUpdate({});
  }
  function subtract(element) {
    let cart = JSON.parse(localStorage.session);
    let index = cart.findIndex((obj) => obj.name === element.name);
    if (cart[index].quantity > 1) {
      cart[index].quantity = element.quantity - 1;
      localStorage.setItem('session', JSON.stringify(cart));
    }
    setUpdate({});
  }

  function removeProduct(element) {
    let cart = JSON.parse(localStorage.session);
    let index = cart.findIndex((obj) => obj.name === element.name);
    cart.splice(index, 1);
    localStorage.setItem('session', JSON.stringify(cart));
    setUpdate({});
  }

  let cart = localStorage.session ? JSON.parse(localStorage.session) : [];

  let cartComponents = cart.map((product) => {
    let subTotal = product.quantity * product.price;

    return (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <InputGroup>
            <Button
              variant='outline-secondary'
              id='button-addon1'
              onClick={() => subtract(product)}
            >
              -
            </Button>
            <Form.Control
              className='inputValue'
              size=''
              type='number'
              value={product.quantity}
              //    onChange={event=>{
              // console.log(event.target)
              // setQuantity(event.target.value)}}

              required
            />
            <Button
              variant='outline-secondary'
              id='button-addon1'
              onClick={() => add(product)}
            >
              +
            </Button>
          </InputGroup>
        </td>
        <td>{subTotal}</td>

        <td>
          <Button
            variant='danger'
            className='mx-2'
            onClick={() => removeProduct(product)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  let total = cart.map((product) => {
    let total = 0;

    return (total += product.quantity * product.price);
  });

  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }

  total = getArraySum(total);

  let shippingFee = total * 0.05;

  function checkout() {
    fetch('https://cryptic-crag-81593.herokuapp.com/api/users/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        totalAmount: total,
        shippingFee: shippingFee,
        products: cart,
        firstName: userOrder.firstName,
        lastName: userOrder.lastName,
        email: userOrder.email,
        address: userOrder.address,
        mobileNo: userOrder.mobileNo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Order Creation Failed!',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Order Creation Successful!',
            text: 'Order has been added.',
          });
        }
      });
    localStorage.removeItem('session');
    setUpdate({});
  }

  return user.email && user.isAdmin === false ? (
    <>
      <Card className='viewFull'>
        <Row className='rowCenter'>
          <Card className='mt-5 px-4 py-4' bg='light'>
            <Card className='mx-3 my-3'>
              <h3 className='text-center'>Cart</h3>
            </Card>
            <Table striped bordered hover variant='light'>
              <thead>
                <tr className='textCenter'>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub-Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartComponents}
                <tr>
                  <th>Shipping Fee</th>
                  <th></th>
                  <th></th>
                  <th>{shippingFee.toFixed(2)}</th>
                  <th></th>
                </tr>
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                  <th>{total.toFixed(2)}</th>
                  <th></th>
                </tr>
              </tbody>
            </Table>

            <Button variant='dark' className='mx-2' onClick={() => checkout()}>
              Checkout
            </Button>
          </Card>
        </Row>
      </Card>
    </>
  ) : (
    <Redirect to='/login' />
  );
}
