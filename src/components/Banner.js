import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import '../App.css';

// export default function Banner({ bannerProp, bannerContent }) {
//   const { user } = useContext(UserContext);

export default function Banner() {
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
  let shuffledProducts2 = shuffle(activeProducts);

  return (
    <Carousel className='carouselBanner'>
      {shuffledProducts2.map((product) => (
        <Carousel.Item interval={4000}>
          <img
            className='d-block w-100 carouselImg'
            src={product.picture}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>{product.name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
