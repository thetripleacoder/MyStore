import React, { useContext } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import '../App.css';

export default function Banner2({ bannerProp }) {
  const { user } = useContext(UserContext);

  return (
    <Row className='mx-5 justify-content-center'>
      <Col xs={12} md={10}>
        <Jumbotron className='mt-4 jumbotron-footer'>
          <h1>{bannerProp.title}</h1>
          <p>{bannerProp.description}</p>
          {!user.email ? (
            <Link
              to={bannerProp.destination}
              className='btn btn-outline-dark bannerButton px-4 py-2 link'
            >
              {bannerProp.label}
            </Link>
          ) : bannerProp.destination2 && bannerProp.label2 ? (
            <Link
              to={bannerProp.destination2}
              className='btn btn-outline-dark bannerButton px-4 py-2 link'
            >
              {bannerProp.label2}
            </Link>
          ) : null}
        </Jumbotron>
      </Col>
    </Row>
  );
}
