import React, { useState, useEffect } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import BannerJumbotron from '../components/BannerJumbotron';
import Product from '../components/Product';
import { Row, Col, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.data);
        let productsTemp = data.data;
        let tempArray = productsTemp.filter((product) => {
          return product.isActive === true;
        });

        setActiveProducts(tempArray);
      });
  }, []);

  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  let shuffledProducts = shuffle(activeProducts).slice(0, 3);

  let productComponents = shuffledProducts.map((product) => {
    return <Product key={product._id} productProp={product} />;
  });
  console.log(shuffledProducts);

  let bannerContent = {
    title: 'Welcome to MyStore',
    description: 'Get your very own MyProducts',
    label: 'Be a MyOwner',
    destination: '/register',
    label2: 'Browse All Products',
    destination2: '/products',
    image: 'home-jumbotron',
  };
  return (
    <div>
      <BannerCarousel />
      <div className=' home-jumbotron-section text-center'>
        <Container>
          <BannerJumbotron bannerProp={bannerContent} />
        </Container>
      </div>
      <div className='home-todays-picks-section py-5 '>
        <div className='d-flex justify-content-center '>
          <Row>
            <h1 id='home-todays-picks-header'>Today's Picks</h1>
          </Row>
        </div>
        <div class='d-flex justify-content-center'>
          <Col xs={12} md={9}>
            <Row>{productComponents}</Row>
          </Col>
        </div>

        <div className='d-flex justify-content-center py-3'>
          <Row>
            <Nav.Link
              as={NavLink}
              to={'/products'}
              className='home-view-more-link'
            >
              Go To Shop Page
            </Nav.Link>
          </Row>
        </div>
      </div>
    </div>
  );
}
