import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Row, Container } from 'react-bootstrap';
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
  const [isActive, setIsActive] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <Container>
      <Row xs={12} className='justify-content-center mt-5'>
        <h1>
          {' '}
          Create a{' '}
          <img
            src='/images/logo.png'
            width='50'
            height='50'
            className='d-inline-block align-top'
            alt='logo'
          />
          yAccount
        </h1>
      </Row>
      <Row xs={12} md={2} className='justify-content-center mb-5'>
        <Card className='mt-5 px-5 py-5 register-card'>
          <Form onSubmit={(e) => registerUser(e)}>
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='text'
                placeholder='Enter First Name'
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='text'
                placeholder='Enter Last Name'
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile No:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='tel'
                pattern='[0-9]{11}'
                placeholder='Enter 11-digit Mobile No '
                value={mobileNo}
                onChange={(event) => {
                  setMobileNo(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='text'
                placeholder='Enter Password'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                class='register-input-field'
                type='text'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                required
              />
            </Form.Group>

            <Button variant='dark' type='submit'>
              {' '}
              Submit
            </Button>
          </Form>
        </Card>
      </Row>
    </Container>
  );
}
