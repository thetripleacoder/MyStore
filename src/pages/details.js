import React, {useState, useEffect, useContext} from 'react'
import {Card, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'
import '../App.css'

import Detail from '../components/Detail'


export default function Details(){

	const [update,setUpdate] = useState(0)

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

				setUpdate({})
				
			})
		},[])

	let detailContent = 
	{
		_id: localStorage.getItem('productId'),
		picture: localStorage.getItem('productPicture'),
		name: localStorage.getItem('productName'),
		description: localStorage.getItem('productDescription'),
		price: localStorage.getItem('productPrice')
	}

	return(
	
		<>
			<Row xs={12} md={3} className="rowCenter">
				<Card className="mt-5 ">
					<Detail detailProp={detailContent} />
				</Card>
			</Row>
		</>
	)

}






