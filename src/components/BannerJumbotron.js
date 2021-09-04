import React, { useContext } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import '../App.css';

export default function BannerJumbotron({ bannerProp }) {
  const { user } = useContext(UserContext);

  return (
    <Jumbotron className={bannerProp.image}>
      <h1 className='jumbotron-title'>{bannerProp.title}</h1>
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
  );
}
