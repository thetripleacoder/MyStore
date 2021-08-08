import React, { useState, useContext } from 'react';
import '../App.css';
import UserContext from '../userContext';
import { Card, Table, Col } from 'react-bootstrap';
import { Collapse, Button, CardBody } from 'reactstrap';
import { Row } from 'react-bootstrap';

export default function Order({ orderProp }) {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let orderElement = orderProp.products;
  console.log(orderElement);

  let products = orderElement.map((product) => {
    return (
      <tr key={product._id}>
        <td>{product.quantity}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  });

  return (
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
                <Table striped bordered hover variant='light'>
                  <thead>
                    <tr className='textCenter'>
                      <th>Quantity</th>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>{products}</tbody>
                </Table>
                <Card.Text>Shipping Fee: {orderProp.shippingFee}</Card.Text>
                <Card.Text>Total Amount: {orderProp.totalAmount}</Card.Text>
              </>
            ) : (
              <>
                <Card.Text>Purchased On: {orderProp.purchasedOn}</Card.Text>
                <Table striped bordered hover variant='light'>
                  <thead>
                    <tr className='textCenter'>
                      <th>Quantity</th>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>{products}</tbody>
                </Table>
                <Card.Text>Shipping Fee: {orderProp.shippingFee}</Card.Text>
                <Card.Text>Total Amount: {orderProp.totalAmount}</Card.Text>
              </>
            )}
          </CardBody>
        </Card>
      </Collapse>
    </Card>
  );
}
