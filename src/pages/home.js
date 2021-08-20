import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Banner2 from '../components/Banner2';
import Product from '../components/Product';
import { Row, Col, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
  let shuffledProducts2 = shuffle(activeProducts);

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
      <Banner2 bannerProp={bannerContent} />
      <div className='d-flex justify-content-center mt-5 '>
        <Row className=''>
          <h1 className=''>Today's Picks</h1>
        </Row>
      </div>
      <div class='d-flex justify-content-center shop-section'>
        <Col xs={12} md={9}>
          <Row className=' alignItem '>{productComponents2}</Row>
        </Col>
      </div>

      <div className='d-flex justify-content-center'>
        <Row className=''>
          <Nav.Link as={NavLink} to={'/products'} className='view-more-link'>
            View More >>>
          </Nav.Link>
        </Row>
      </div>
    </div>
  );
}
