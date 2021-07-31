import React, {useContext} from 'react'
import{Jumbotron, Row, Col, Carousel, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'
import '../App.css'

export default function Banner({bannerProp}) {

	const {user} = useContext(UserContext)

	return(
		<Jumbotron className="mt-5">
			<h1>{bannerProp.title}</h1>
			<p>{bannerProp.description}</p>
			{
				!user.email
				? 
					<Link to={bannerProp.destination} className="btn btn-primary">{bannerProp.label}</Link>
				: <Button href= "/products" variant="primary">Browse all products</Button>
			}
			
		</Jumbotron>
	
				
		)
}