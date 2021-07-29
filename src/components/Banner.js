import React, {useContext} from 'react'
import{Jumbotron, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserContext from '../userContext'

export default function Banner({bannerProp}) {

	const {user} = useContext(UserContext)

	return(


			<Row>
				<Col>
					<Jumbotron>
						<h1>{bannerProp.title}</h1>
						<p>{bannerProp.description}</p>
						{
							!user.email
							? 
								<Link to={bannerProp.destination} className="btn btn-primary">{bannerProp.label}</Link>
							: null
						}
					</Jumbotron>
				</Col>
			</Row>
		)
}