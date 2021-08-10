import React from 'react';
import '../App.css';

import { Form, Row, Col, Button } from 'react-bootstrap';

const Footer = () => (
  <div className='main-footer mt-5'>
    <Row className='mx-5'>
      <Col>
        <h4>SHOP MYSTORE</h4>
        <ul className='list-unstyled'>
          <li>
            <a href='#' target='_blank'>
              Computer
            </a>
          </li>
          <li>
            <a href='#' target='_blank'>
              Phone
            </a>
          </li>
          <li>
            <a href='#' target='_blank'>
              Watch
            </a>
          </li>
          <li>
            <a href='#' target='_blank'>
              Drone
            </a>
          </li>
          <li>
            <a href='#' target='_blank'>
              Mic
            </a>
          </li>
        </ul>
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
      <Col md={3}>
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
          <Button className='mt-3' variant='primary' type='submit'>
            {' '}
            Submit
          </Button>
        </Form>
      </Col>
    </Row>

    <Row className='mt-3 mx-5 pb-5'>
      <Col>
        <p>&copy;{new Date().getFullYear()} MyStore | All rights reserved</p>
      </Col>
      <Col>
        <p>Follow Us</p>
        <a
          class='btn btn-outline-secondary rounded-circle socMedLinks'
          href='#'
          role='button'
          target='_blank'
        >
          <i class='fab fa-facebook'></i>
        </a>
        <a
          class='btn btn-outline-secondary rounded-circle socMedLinks'
          href='#'
          role='button'
          target='_blank'
        >
          <i class='fab fa-instagram'></i>
        </a>
        <a
          class='btn btn-outline-secondary rounded-circle socMedLinks'
          href='mailto:inquiry@mystore.co'
          role='button'
          target='_blank'
        >
          <i class='far fa-envelope'></i>
        </a>
      </Col>
    </Row>
  </div>
);

export default Footer;
