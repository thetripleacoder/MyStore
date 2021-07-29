import React, {useState, useEffect} from 'react'
import{Card, Button} from 'react-bootstrap'

export default function Course({courseProp}){

	const[count, setCount] = useState(0)
	const[seats, setSeats] = useState(30)
	const [isActive,setIsActive] = useState(true)

	useEffect(()=>{

		if(seats === 0){
			setIsActive(false)
		}

	},[seats])

	function enroll() {
		setCount (count+1)
		setSeats (seats-1)
	}

	return(
		<Card>
					<Card.Body>
						<Card.Title>
						<h2>{courseProp.name}</h2>
						</Card.Title>
						<Card.Text>
							{courseProp.description}
						</Card.Text>
						{/*<Card.Text>
							Price: {courseProp.price} PHP
						</Card.Text>*/}
						<Card.Text>
							Enrollees: {
								count === 0 

								? <span className = "text-danger">"No Enrollees Yet."</span>

								: <span className
								="text-success">{count}</span>
							}
						</Card.Text>
						<Card.Text>
							Seats: {
								seats === 0 

								? <span  className = "text-danger">"No More Seats Available."</span>

								: <span className
								="text-success">{seats}</span>
							}
						</Card.Text>

					{/*	<Button variant="primary" onClick={enroll} disabled ={seats == 0}>
						Enroll

						</Button>*/}

					{
						isActive === false

						? <Button variant="primary" disabled>Enroll</Button>
						: <Button variant="primary" onClick={enroll}>Enroll</Button>
					}

					</Card.Body>
				</Card>

		)
}