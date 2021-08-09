import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import UserContext from '../userContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function loginUser(e) {
    e.preventDefault();

    fetch('https://cryptic-crag-81593.herokuapp.com/api/login', {
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

          fetch('https://cryptic-crag-81593.herokuapp.com/api/profile', {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
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
    <Row xs={12} md={2} className='rowCenter'>
      <Card className='my-5 px-5 py-5 formStyle'>
        <Form className='' onSubmit={(e) => loginUser(e)}>
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
              type='text'
              placeholder='Enter Password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
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
