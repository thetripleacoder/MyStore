import React, {useState, useEffect, useContext} from 'react'

import { Collapse, Button, CardBody, Card } from 'reactstrap'
import { Row} from 'react-bootstrap'
import UserContext from '../userContext'

export default function Orders(){

	const {user} = useContext(UserContext)
	const [update, setUpdate] = useState()
	const [order, setOrder] = useState()
 	const [isOpen, setIsOpen] = useState(false);
 	const toggle = () => setIsOpen(!isOpen);

	useEffect(()=>{

		user.isAdmin
		?
		fetch('https://cryptic-crag-81593.herokuapp.com/api/admin/orders', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setOrder(data.data)

			setUpdate({})
			})

		:
		fetch('https://cryptic-crag-81593.herokuapp.com/api/user/orders', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setOrder(data.data)

			setUpdate({})
			})
	},[])

	console.log(order)


	



		let orderComponents = order ? order.map((order)=>{
			console.log(order)
			
	

	  return (
	   	<Row  xs={12} md={2} className="rowCenter">
			<Card className="my-2" bg="light" >
				<Card className="">

			      <Button color="dark" onClick={toggle} style={{ width: '100%'}}>Order ID: {order._id} </Button>
			      <Collapse isOpen={isOpen}>
			        <Card>
			          <CardBody>
			          {
			          user.isAdmin
			          ?
			          <>
				          	<Card>
				          	Buyer ID: {order.buyer}
				          	</Card>
				          	{/*[{order.products}]*/}
				          	<Card>
				          	Purchased On: {order.purchasedOn}
				          	</Card>
				          	<Card>
				          	Total Amount: {order.totalAmount}
				          	</Card>
				          	</>
			          	:
			          	<>
			          		<Card>
			          		Purchased On: {order.purchasedOn}
				          	</Card>
				          	<Card>
				          	Total Amount: {order.totalAmount}
				          	</Card>
				          	</>
			          }
			          </CardBody>
			        </Card>
			      </Collapse>
			     </Card>
			 </Card>
		</Row> 
	    
	  )
	})
		: null

	  return (
	  		<>
	  		<Card className="viewFull textCenter">
	  		<Row  xs={12} md={1} className=" mt-5 rowCenter">
	  		{
				user.isAdmin
				?
				<h2>Admin</h2>
				: null

				}
	  			{orderComponents}
			</Row>
			</Card>


	  		</>

	  	)
}

