import React, {useState, useEffect, useContext} from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'
import '../App.css'

export default function Product({productProp}){

	const {user} = useContext(UserContext)

	// const[count, setCount] = useState(0)
	// const[seats, setSeats] = useState(30)
	const [isActive,setIsActive] = useState(true)

	// useEffect(()=>{

	// 	if(seats === 0){
	// 		setIsActive(false)
	// 	}

	// },[seats])

	// function addToCart() {
	// 	setCount (count+1)
	// 	setSeats (seats-1)
	// }

	return(
		<Card className = "cardProduct">
					<Card.Body>
						<Card.Title>
						<h2>{productProp.name}</h2>
						</Card.Title>
						<Card.Text>
							{productProp.description}
						</Card.Text>
						<Card.Text>
							Price: {productProp.price} PHP
						</Card.Text>
						<Link to={"/"} className="btn btn-primary">Product Details</Link>
					

					</Card.Body>
				</Card>

		)
}