import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, InputGroup, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'
import '../App.css'
import Swal from 'sweetalert2'
import{Redirect} from 'react-router-dom'

export default function Update({updateProp}){
	const {user} = useContext(UserContext)
	const [willRedirect, setWillRedirect] = useState(false)
	const [update,setUpdate] = useState(0)
		const [picture, setPicture] = useState(updateProp.picture)
	const [name, setProductName] = useState(updateProp.name)
	const [description, setDescription] = useState(updateProp.description)
	const [price, setPrice] = useState(updateProp.price)
	const [isActive, setIsActive] = useState(false)


	useEffect(()=>{
		if(picture !== updateProp.picture || name!== updateProp.name || description!== updateProp.description || price !== updateProp.price){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [name, description, price])


	function updateProduct(productId){

		fetch(`https://cryptic-crag-81593.herokuapp.com/api/products/${productId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			picture:picture,
			name: name,
			description: description,
			price: price
		})

		})
		.then(response => response.json()) 
		.then(data => {

			console.log(data)
			if(data.message){
				Swal.fire({
					icon: "error",
					title: "Update Failed!",
					text: data.message
				})
			} else {
				
				Swal.fire({
					icon: "success",
					title: "Update Successful!",
					text: "Product Information has been updated."
				})	
			}
		})
	}


	return(
	
		<Card >
			<Card.Img variant="top" className="cardImageUpdate" src={picture} />
			<Card.Body>
			<Form.Group>
				<Form.Label>Picture:</Form.Label>
				<Form.Control type="text" placeholder="Enter URL" value={picture} onChange={event=>{
						console.log(event.target)
						setPicture(event.target.value)}} required/>
			</Form.Group> 
			<Form.Group>
				<Form.Label>Product Name:</Form.Label>
				<Form.Control type="text" placeholder="Enter Name" value={name} onChange={event=>{
						console.log(event.target)
						setProductName(event.target.value)}} required/>
			</Form.Group> 
			<Form.Group>
				<Form.Label>Description:</Form.Label>
				<Form.Control type="text" placeholder="Enter Description" value={description} onChange={event=>{
						console.log(event.target)
						setDescription(event.target.value)}} required/>
			</Form.Group> 
			<Form.Group>
				<Form.Label>Price:</Form.Label>
				<Form.Control type="number" placeholder="Enter Price" value={price} onChange={event=>{
						console.log(event.target)
						setPrice(event.target.value)}} required/>
			</Form.Group> 
			
			
			</Card.Body>

			{
				isActive
				?
				<Button variant="success" className="mx-2" onClick={()=>updateProduct(updateProp._id)}>Update Product Information</Button>
				:
				<Button variant="success" className="mx-2" disabled>Update Product Information</Button>

			}
			
			
				
		</Card>
	)

}






