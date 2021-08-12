import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Product from '../components/Product';
import { Row } from 'react-bootstrap';

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
  let shuffledProducts2 = shuffle(activeProducts).slice(1, 4);
  let productComponents = shuffledProducts.map((product) => {
    return <Product key={product._id} productProp={product} />;
  });
  console.log(shuffledProducts);

  // let bannerContent = {
  //   title: 'Welcome to MyStore',
  //   description: 'Get your very own MyProducts',
  //   label: 'Be a MyOwner',
  //   destination: '/register',
  //   label2: 'Browse All Products',
  //   destination2: '/products',
  // };
  return (
    <>
      <Banner bannerProp={shuffledProducts2} />

      <Row className=' alignItem mt-5'>
        <h1>Featured</h1>
      </Row>
      <Row className=' alignItem mt-3'>{productComponents}</Row>
    </>
  );
}
