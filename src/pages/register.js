import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import UserContext from '../userContext';

export default function Register() {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /*conditional rendering for button*/
  const [isActive, setIsActive] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      address !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    firstName,
    lastName,
    address,
    email,
    mobileNo,
    password,
    confirmPassword,
  ]);

  function registerUser(e) {
    e.preventDefault();
    // console.log("The page will no longer refresh because of submit.")

    fetch('https://cryptic-crag-81593.herokuapp.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        password: password,
        mobileNo: mobileNo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed.',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Thank you for registering.',
          });
          setWillRedirect(true);
        }
      });

    setFirstName('');
    setLastName('');
    setAddress('');
    setMobileNo('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }
  return user.email || willRedirect ? (
    <Redirect to='/login' />
  ) : (
    <Row xs={12} md={2} className='rowCenter'>
      <Card className='mt-5 px-5 py-5 formStyle '>
        {/* <Card.Img
          variant='top'
          className='loginCard mb-5 cardImageUpdate'
          src={
            'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80'
          }
        /> */}
        <Form onSubmit={(e) => registerUser(e)}>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter First Name'
              value={firstName}
              onChange={(event) => {
                // console.log(event.target)
                setFirstName(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Last Name'
              value={lastName}
              onChange={(event) => {
                // console.log(event.target)
                setLastName(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={address}
              onChange={(event) => {
                // console.log(event.target)
                setAddress(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(event) => {
                // console.log(event.target)
                setEmail(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile No:</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter 11-Digit Mobile No'
              value={mobileNo}
              onChange={(event) => {
                // console.log(event.target)
                setMobileNo(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Password'
              value={password}
              onChange={(event) => {
                // console.log(event.target)
                setPassword(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(event) => {
                // console.log(event.target)
                setConfirmPassword(event.target.value);
              }}
              required
            />
          </Form.Group>
          {isActive ? (
            <Button variant='primary' type='submit'>
              {' '}
              Submit
            </Button>
          ) : (
            <Button variant='primary' disabled>
              {' '}
              Submit
            </Button>
          )}
        </Form>
      </Card>
    </Row>
  );
}
