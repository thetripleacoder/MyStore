import React from 'react'
import{Jumbotron, Button, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Banner({bannerProp}) {
	return(

			<Row>
				<Col>
					<Jumbotron>
						<h1>{bannerProp.title}</h1>
						<p>{bannerProp.description}</p>
						<Link to={bannerProp.destination} className="btn btn-primary">{bannerProp.label}</Link>
					</Jumbotron>
				</Col>
			</Row>
		)
}