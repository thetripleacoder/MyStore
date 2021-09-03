import React, { useContext } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import '../App.css';

export default function BannerJumbotron({ bannerProp }) {
  const { user } = useContext(UserContext);

  return (
    <Row className='mt-5 justify-content-center'>
      <Col xs={12} md={10}>
        <Jumbotron className={bannerProp.image}>
          <h1>{bannerProp.title}</h1>
          <p>{bannerProp.description}</p>
          {!user.email ? (
            <Link
              to={bannerProp.destination}
              className='btn btn-outline-dark jumbotron-button px-4 py-2'
            >
              {bannerProp.label}
            </Link>
          ) : bannerProp.destination2 && bannerProp.label2 ? (
            <Link
              to={bannerProp.destination2}
              className='btn btn-outline-dark jumbotron-button px-4 py-2'
            >
              {bannerProp.label2}
            </Link>
          ) : null}
        </Jumbotron>
      </Col>
    </Row>
  );
}
