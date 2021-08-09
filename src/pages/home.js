import React, { useState, useEffect } from 'react';

/*import components here*/
import Banner from '../components/Banner';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);

  useEffect(() => {
    fetch('https://cryptic-crag-81593.herokuapp.com/api/products')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setAllProducts(data.data);
        let productsTemp = data.data;
        /*temporary array to hold filtered items. only active courses*/
        let tempArray = productsTemp.filter((product) => {
          return product.isActive === true;
        });

        setActiveProducts(tempArray);
      });
  }, []);

  let bannerContent = {
    title: 'Welcome to MyStore',
    description: 'Get your very own MyProducts',
    label: 'Be a MyOwner',
    destination: '/register',
    label2: 'Browse All Products',
    destination2: '/products',
  };

  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
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

  return (
    <>
      <Banner bannerProp={bannerContent} />

      <Row className=' alignItem mt-5'>
        <h1>Featured</h1>
      </Row>
      <Row className=' alignItem mt-3'>{productComponents}</Row>
    </>
  );
}
