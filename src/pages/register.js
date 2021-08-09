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
    <Row xs={12} md={2} className='rowCenter'>
      <Card className='mt-5 px-5 py-5 formStyle '>
        <Form onSubmit={(e) => registerUser(e)}>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
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
              type='number'
              placeholder='Enter 11-Digit Mobile No'
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
              type='text'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(event) => {
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
