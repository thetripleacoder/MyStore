import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Banner2 from '../components/Banner2';
import Product from '../components/Product';
import Highlights from '../components/Highlights';
import { Row, Container, Col, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);

  useEffect(() => {
    fetch('https://cryptic-crag-81593.herokuapp.com/api/products')
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
  // let shuffledProducts5 = shuffle(activeProducts).slice(0, 5);
  let shuffledProducts2 = shuffle(activeProducts);
  let productComponents = shuffledProducts.map((product) => {
    return (
      <Col xs={12} md={12}>
        <Highlights key={product._id} featuredProp={product} />;
      </Col>
    );
  });
  let productComponents2 = shuffledProducts.map((product) => {
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
  };
  return (
    <div className='homeContainer'>
      <Banner bannerProp={shuffledProducts2} />
      <div className='d-flex justify-content-center mt-5 px-5'>
        <Col xs={12} md={9}>
          <Row className=''>
            <Col xs={10}>
              <h4 className=''>Shop</h4>
            </Col>
            <Col xs={2} className='align-right '>
              <Nav.Link
                as={NavLink}
                to={'/products'}
                className='view-more-link'
              >
                View More>>
              </Nav.Link>
            </Col>
          </Row>
        </Col>
      </div>
      <div class='d-flex justify-content-center shop-section'>
        <Col xs={12} md={9}>
          <Row className=' alignItem '>{productComponents2}</Row>
        </Col>
      </div>
      <Banner2 bannerProp={bannerContent} />
      {/* <div class=' featured-section'>{productComponents}</div> */}
    </div>
  );
}
