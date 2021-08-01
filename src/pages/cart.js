import React, {useState, useEffect, useContext} from 'react'

/*import components here*/
import Banner from '../components/Banner'
import Highlights from '../components/Highlights'
import Product from '../components/Product'
import Detail from '../components/Detail'
import {Row, Card, Table, Button, Form, InputGroup} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import UserContext from '../userContext'

export default function Cart() {
    const [allProducts, setAllProducts] = useState([])
    const [activeProducts, setActiveProducts] = useState([])
    const [cart, setCart] = useState([])
  
    const [update,setUpdate] = useState(0)
    const {user} = useContext(UserContext)
    const [willRedirect, setWillRedirect] = useState(false)
    const [quantity, setQuantity] = useState(1)


    useEffect(()=>{
  //   	fetch('https://cryptic-crag-81593.herokuapp.com/api/products')
		// .then(res => res.json())
		// .then(data => {
		// 	// console.log(data)
		// 	setAllProducts(data.data)
		// 	let productsTemp = data.data
		// 	/*temporary array to hold filtered items. only active courses*/
		// 	let tempArray = productsTemp.filter(product => {
		// 		return product.isActive === true
		// 	})
		// 	setActiveProducts(tempArray) 
			setCart(JSON.parse(localStorage.getItem('session')) || [])
			console.log(cart)

			setUpdate({})
		// })	
	},[])


	function add() {
		setQuantity (quantity+1)
	}
	function subtract() {
		setQuantity (quantity-1)
	}

	function removeProduct(arr, value) {
	  var index = arr.indexOf(value);
	  if (index > -1) {
	    arr.splice(index, 1);
	  }
	  return arr;
	}
	
		    // Parse the serialized data back into an aray of objects

	let productRows = cart.map(product=>{

	// console.log(product)

	
	
	return (
			<tr key={product._id} >
					
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td>
					<InputGroup >
				    <Button variant="outline-secondary" id="button-addon1" onClick={subtract}>
				      -
				    </Button>
				    <Form.Control className="inputValue" size="lg" type="number" value={product.quantity} onChange={event=>{
					// console.log(event.target)
					setQuantity(event.target.value)}} required/>
					<Button variant="outline-secondary" id="button-addon1" onClick={add}>
				      +
				    </Button>
				  </InputGroup>
				  </td>
				  <td>
				  		{product.quantity*product.price}
				  </td>
				
					<td>
					<Button variant="success" className="mx-2" onClick={()=>removeProduct(cart, product)}>Delete</Button>

					</td>
			</tr>
		
		)

})

	let productComponents = activeProducts.map((product)=>{
		// console.log(product)

	  return (
	      <Detail key = {product._id} detailProp={product}/>
	     
	    )
	})

		return (
		
				user.email && user.isAdmin === false
				?
					
				<>
					<Row  className="rowCenter">
						<Card className="mt-5 px-4 py-4" bg="light" >
						<Card className="mx-3 my-3">
							<h1  className="text-center">Cart</h1>
							</Card>
							<Table striped bordered hover variant="light">
								<thead>
									<tr className="textCenter">
									
										<th>Name</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Sub-Total</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{productRows}
								</tbody>
							</Table>
						</Card>
					</Row>

				{/*	<Row xs={12} md={3} className="mt-5 rowCenter">	
						{productComponents}				
					</Row>	*/}
				</>
				:
				<Redirect to="/login" /> 
		)
}