import React, {useState, useEffect, useContext} from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'
import '../App.css'
import{Redirect} from 'react-router-dom'
import Update from '../components/Update'


export default function Updates(){

	const [update,setUpdate] = useState(0)
	const {user} = useContext(UserContext)

	useEffect(()=>{
		fetch(`https://cryptic-crag-81593.herokuapp.com/api/products/${localStorage.getItem('productId')}`
			)
			.then(res => res.json())
			.then(data => {
				console.log(data.data)
				let product = data.data

				localStorage.setItem('productPicture', product.picture)
				localStorage.setItem('productName', product.name)
				localStorage.setItem('productDescription', product.description)
				localStorage.setItem('productPrice', product.price)	
			
			})
			
	},[update])
	

	let updateContent = 
	{
		_id: localStorage.getItem('productId'),
		picture: localStorage.getItem('productPicture'),
		name: localStorage.getItem('productName'),
		description: localStorage.getItem('productDescription'),
		price: localStorage.getItem('productPrice')
	}

	return(

		user.isAdmin === false || user.isAdmin === null
		?
		<Redirect to="/login" />
		:
	
		<>
			<Update updateProp={updateContent} />
		</>
	)

}






