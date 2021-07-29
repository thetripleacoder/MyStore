import React from 'react'

// react-bootstrap components
import{Row, Col, Card} from 'react-bootstrap'

export default function Highlights(object){
	// console.log(object)
	return(
		<Row>
			<Col xs ={12} md = {4}>
				<Card className = "cardHighlight">
					<Card.Body>
						<Card.Title>
						<h2>Buy from Home</h2>
						</Card.Title>
						<Card.Text>
							Irure labore ex reprehenderit occaecat nostrud occaecat quis aliqua nostrud pariatur dolore tempor dolore laboris.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs ={12} md = {4}>
				<Card className = "cardHighlight">
					<Card.Body>
						<Card.Title>
						<h2>Buy Now, Die Later.</h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum ut sit nulla sunt tempor labore pariatur voluptate mollit fugiat laborum proident magna.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs ={12} md = {4}>
				<Card className = "cardHighlight">
					<Card.Body>
						<Card.Title>
						<h2>Be Part Of Our Online Selling Community</h2>
						</Card.Title>
						<Card.Text>
							Nulla velit dolore pariatur aliqua officia excepteur tempor minim adipisicing irure ex anim sit aliquip in irure dolor eiusmod consequat deserunt laboris occaecat velit nisi velit sunt. Exercitation magna duis deserunt elit sunt est consectetur sit nisi ea sunt dolor ut eiusmod ullamco sunt ex id labore fugiat dolore magna cupidatat duis amet tempor reprehenderit in excepteur occaecat nostrud aliquip.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</Row>
		)
}