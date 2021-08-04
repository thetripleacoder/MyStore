
import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from '../userContext';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Row } from 'react-bootstrap';


export default function OrderComp({ orderProp }) {

	const { user } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(false);
  	const toggle = () => setIsOpen(!isOpen);

  	let orderProducts =  orderProp.products.map(product => {
  		return(

  			<Card.Text>{product.products}</Card.Text>


  			)
  	})
  	

	  return (
	    <Row xs={12} md={2} className='rowCenter'>
	            <Card className='my-2' bg='light'>
	              <Card className=''>
	                <Button color='dark' onClick={toggle} style={{ width: '100%' }}>
	                  Order ID: {orderProp._id}{' '}
	                </Button>
	                <Collapse isOpen={isOpen}>
	                  <Card>
	                    <CardBody>
	                      {user.isAdmin ? (
	                        <>
	                          <Card.Text>Buyer ID: {orderProp.buyer}</Card.Text>
	                          {/*[{orderProp.products}]*/}
	                          <Card.Text>Purchased On: {orderProp.purchasedOn}</Card.Text>
	                          <Card.Text>Total Amount: {orderProp.totalAmount}</Card.Text>
	                        </>
	                      ) : (
	                        <>
	                          <Card.Text>Purchased On: {orderProp.purchasedOn}</Card.Text>
	                          <Card.Text>Total Amount: {orderProp.totalAmount}</Card.Text>
	                        </>
	                      )}
	                    </CardBody>
	                  </Card>
	                </Collapse>
	              </Card>
	            </Card>
	          </Row>
	  );
}
