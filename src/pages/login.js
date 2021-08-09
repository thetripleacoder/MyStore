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
    // console.log("The page will no longer refresh because of submit.")

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
        console.log(data);
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed.',
            text: data.message,
          });
        } else {
          // console.log(data)

          localStorage.setItem('token', data.accessToken);

          fetch('https://cryptic-crag-81593.herokuapp.com/api/profile', {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data)

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
        {/* <Card.Img
          variant='top'
          className='loginCard mb-5 cardImageUpdate'
          src={
            'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80'
          }
        /> */}

        <Form className='' onSubmit={(e) => loginUser(e)}>
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
