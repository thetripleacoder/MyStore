import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, InputGroup, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'
import '../App.css'
import Swal from 'sweetalert2'

export default function Detail({detailProp}){
	const {user} = useContext(UserContext)
	const [willRedirect, setWillRedirect] = useState(false)
	const [quantity, setQuantity] = useState(1)

	function add() {
		setQuantity (quantity+1)
	}
	function subtract() {
		setQuantity (quantity-1)
	}


	function addToCart(e){
		e.preventDefault()
	
	fetch('https://cryptic-crag-81593.herokuapp.com/api/users/checkout', {
		method: "POST",
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			productId: `${localStorage.getItem('productId')}`

		})

	})
	.then(response => response.json()) 
	.then(data => {
		// console.log(data)
		if(data.message){
			Swal.fire({
				icon: "error",
				title: "Add to Cart Failed!",
				text: data.message
			})
		} else {
			Swal.fire({
				icon: "success",
				title: "Added to Cart!",
				text: "Product has been added to cart."
			})
			
		}

	})
		setQuantity(1)

	}


	return(
	
		<Card >
			<Card.Img variant="top" className="cardImageDetail" src={detailProp.picture} />
			<Card.Body>
				<Card.Title>
				<h2>{detailProp.name}</h2>
				</Card.Title>
				<Card.Text>
					{detailProp.description}
				</Card.Text>
				<Card.Text>
					Price: {detailProp.price} PHP
				</Card.Text>
				 <InputGroup className="mb-3">
				    <Button variant="outline-secondary" id="button-addon1" onClick={subtract}>
				      -
				    </Button>
				    <Form.Control type="text" value={quantity} onChange={event=>{
					// console.log(event.target)
					setQuantity(event.target.value)}} required/>
					<Button variant="outline-secondary" id="button-addon1" onClick={add}>
				      +
				    </Button>
				  </InputGroup>	
			</Card.Body>

			{
				user.email
				?
				quantity > 0
					? <Button variant="primary" onClick={addToCart}>Add To Cart</Button>
					: <Button variant="primary" disabled>Add To Cart</Button>
				: <Button href= "/login" variant="primary">Login to Order</Button>
			}
				
		</Card>
	)

}





