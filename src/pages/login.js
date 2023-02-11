import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Card, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import UserContext from '../userContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);
  const [update, setUpdate] = useState(0);

  function myFunction() {
    var x = document.getElementById('myInput');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
    setUpdate({});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function loginUser(e) {
    e.preventDefault();

    fetch('https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed.',
            text: data.message,
          });
        } else {
          localStorage.setItem('token', data.accessToken);

          fetch(
            'https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/profile',
            {
              headers: {
                Authorization: `Bearer ${data.accessToken}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem('email', data.email);
              localStorage.setItem('isAdmin', data.isAdmin);
              setUser({
                email: data.email,
                isAdmin: data.isAdmin,
              });

              setWillRedirect(true);

              Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Thank you for logging in, ${data.firstName}!`,
              });
            });
        }
      });
    setEmail('');
    setPassword('');
  }

  return user.email || willRedirect ? (
    <Redirect to='/products' />
  ) : (
    <Container>
      <Row xs={12} className='justify-content-center mt-5'>
        <h1>
          {' '}
          Login to your{' '}
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
      <Row xs={12} md={2} className='justify-content-center'>
        <Card className='my-5 px-5 py-5 login-card'>
          <Form onSubmit={(e) => loginUser(e)}>
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
              <Form.Label>Password:</Form.Label>
              <Form.Control
                id='myInput'
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type='checkbox'
                label='Show Password'
                onClick={() => myFunction()}
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
