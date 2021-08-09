import React from 'react';
import Banner from '../components/Banner';

export default function NotFound() {
  let bannerContent = {
    title: 'Page cannot be found!',
    description: 'Buy Now! Die Later!',
    label: 'Go back to home page',
    destination: '/',
  };

  return (
    <>
      <Banner bannerProp={bannerContent} />
    </>
  );
}
