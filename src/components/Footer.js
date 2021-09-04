import React from 'react';
import '../App.css';

import { Form, Row, Col, Button } from 'react-bootstrap';

const Footer = () => (
  <div className='main-footer'>
    <Col xs={12} md={10}>
      <Row className=''>
        <Col
          xs={12}
          md={4}
          lg={2}
          className='align-self-center text-center mr-5'
        >
          <img
            src='/images/logo.png'
            className='d-inline-block align-top mystore-logo'
            alt='logo'
          />
        </Col>

        <Col>
          <h4>SUPPORT</h4>
          <ul className='list-unstyled'>
            <li>
              <a href='#' target='_blank'>
                Trade In
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Repairs & Services
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Store Locations
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Career Opportunities
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                About MyStore
              </a>
            </li>
          </ul>
        </Col>
        <Col>
          <h4>PROGRAMS</h4>
          <ul className='list-unstyled'>
            <li>
              <a href='#' target='_blank'>
                My for Education
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                My for Business
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Original Artwork
              </a>
            </li>
          </ul>
        </Col>
        <Col>
          <h4>LEGAL</h4>
          <ul className='list-unstyled'>
            <li>
              <a href='#' target='_blank'>
                Refund Policy
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Terms of Service
              </a>
            </li>
          </ul>
        </Col>
        <Col>
          <h4>GET UPDATES</h4>

          <p>
            Get the latest product announcements, deals and promotions from
            MyStore.
          </p>
          <Form className='' action='/sampleserver.com'>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              // value={email}
              // onChange={(event) => {
              //   // console.log(event.target)
              //   setEmail(event.target.value);
              // }}
              required
            />
            <Button className='mt-3' variant='dark' type='submit'>
              {' '}
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col>
          <p>Follow Us</p>
          <a
            class='btn btn-outline-secondary rounded-circle footer-button-links'
            href='#'
            role='button'
            target='_blank'
          >
            <i class='fab fa-facebook'></i>
          </a>
          <a
            class='btn btn-outline-secondary rounded-circle footer-button-links'
            href='#'
            role='button'
            target='_blank'
          >
            <i class='fab fa-instagram'></i>
          </a>
          <a
            class='btn btn-outline-secondary rounded-circle footer-button-links'
            href='#'
            role='button'
            target='_blank'
          >
            <i class='far fa-envelope'></i>
          </a>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col>
          <p>&copy;{new Date().getFullYear()} MyStore | All rights reserved</p>
        </Col>
      </Row>
    </Col>
  </div>
);

export default Footer;
