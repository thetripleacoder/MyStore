import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../App.css';

export default function BannerCarousel() {
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

  let shuffledProducts2 = shuffle(activeProducts);

  return (
    <Carousel>
      {shuffledProducts2.map((product) => (
        <Carousel.Item interval={4000}>
          <img
            className='d-block w-100 carousel-image'
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
