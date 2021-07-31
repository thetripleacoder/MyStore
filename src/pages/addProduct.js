import React, {useState,useEffect, useContext} from 'react'
import {Form,Button, Image, Col} from 'react-bootstrap'
import Swal from 'sweetalert2'
import{Redirect} from 'react-router-dom'
import UserContext from '../userContext'
import "bootstrap/dist/css/bootstrap.css";




export default function AddProduct(){

	const {user} = useContext(UserContext)
	const [picture, setPicture] = useState()
	const [name, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)
	const [isActive, setIsActive] = useState(false)
	const [willRedirect, setWillRedirect]= useState(false)
	console.log(picture)
	useEffect(()=>{
		if(name!=="" && description!=="" && price > 0){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [name, description, price])

	function addProduct(e){
	
		e.preventDefault()
		console.log("The page will no longer refresh because of submit.")

	fetch('https://cryptic-crag-81593.herokuapp.com/api/products', {
		method: "POST",
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
				title: "Product Creation Failed!",
				text: data.message
			})
		} else {
			
			Swal.fire({
				icon: "success",
				title: "Product Creation Successful!",
				text: "Product has been added."
			})	
		}
	})
		setProductName("")
		setDescription("")
		setPrice(0)
	}
	return (

		user.isAdmin === false || user.isAdmin === null
		?
		<Redirect to="/login" />
		:
		<Form onSubmit={e=>addProduct(e)}>
			 {/*<ImageUpload
			      handleImageSelect={handleImageSelect}
			      imageSrc={imageSrc}
			      setImageSrc={setImageSrc}
			      style={{
			        width: 700,
			        height: 500,
			        background: 'gold'
			      }}
			    />*/}
			<Form.Group>
				<Form.Label>Picture:</Form.Label>
				<Form.Control type="text" placeholder="Enter URL" value={picture} onChange={event=>{
					console.log(event.target)
					setPicture(event.target.value)}} required/>
			    <div style={{ display: "block", width: "auto", padding: 30 }}>
			      <Image src={picture} rounded fluid />
			    </div>
			</Form.Group>    
			<Form.Group>
				<Form.Label>Product Name:</Form.Label>
				<Form.Control type="text" placeholder="Enter Product Name" value={name} onChange={event=>{
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
				<Form.Control type="text" placeholder="Enter Price" value={price} onChange={event=>{
					console.log(event.target)
					setPrice(event.target.value)}} required/>
			</Form.Group>
		
			{
				isActive
				? <Button variant="primary" type="submit"> Submit</Button>
				: <Button variant="primary" disabled> Submit</Button>
			}
		</Form>
		)

}

