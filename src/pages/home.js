import React, {useState, useEffect} from 'react'

/*import components here*/
import Banner from '../components/Banner'
import Highlights from '../components/Highlights'
import Product from '../components/Product'
import {Row} from 'react-bootstrap'

export default function Home() {
    const [allProducts, setAllProducts] = useState([])
    const [activeProducts, setActiveProducts] = useState([])
    const [update,setUpdate] = useState(0)

	


    useEffect(()=>{
	
		fetch('https://cryptic-crag-81593.herokuapp.com/api/products')
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setAllProducts(data.data)
			let productsTemp = data.data
			/*temporary array to hold filtered items. only active courses*/
			let tempArray = productsTemp.filter(product => {
				return product.isActive === true
			})

			setActiveProducts(tempArray)
		})
	},[])

	  let bannerContent = 
    {
      title: "Welcome to My Store",
      description: "Buy Now! Die Later!",
      label: "Shop with us!",
      destination: "/register"
    }

  function shuffle(array) {
	  var currentIndex = array.length,  randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex--;

	    // And swap it with the current element.
	    [array[currentIndex], array[randomIndex]] = [
	      array[randomIndex], array[currentIndex]];
	  }

	  return array;
	}

	let shuffledProducts = shuffle(activeProducts)


    let productComponents = shuffledProducts.map((product)=>{
		// console.log(product)

	  return (

	      <Highlights key = {product._id} featuredProp={product}/>
	     
	    )
	})

	return (
		<>
			<Banner bannerProp={bannerContent}/>
			<h1 className="text-center">Featured Products</h1>
			{productComponents}
			
		</>
	)
}