import React from 'react';
import BannerJumbotron from '../components/BannerJumbotron';

export default function NotFound() {
  let bannerContent = {
    title: 'Page not found!',
    description: 'Go Back to Home Page',
    label: 'MyStore',
    destination: '/',
    label2: 'MyStore',
    destination2: '/',
    image: 'jumbotron-not-found',
  };

  return (
    <>
      <BannerJumbotron bannerProp={bannerContent} />
    </>
  );
}
