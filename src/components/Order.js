import React, { useState, useContext } from 'react';
import '../App.css';
import UserContext from '../userContext';
import { Card, Table } from 'react-bootstrap';
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
                    <Card>Buyer ID: {orderProp.buyer}</Card>
                    {/*[{orderProp.products}]*/}
                    <Card>Purchased On: {orderProp.purchasedOn}</Card>
                    <Card>Total Amount: {orderProp.totalAmount}</Card>
                  </>
                ) : (
                  <>
                    <Card>Purchased On: {orderProp.purchasedOn}</Card>
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
                    <Card>Shipping Fee: {orderProp.shippingFee}</Card>
                    <Card>Total Amount: {orderProp.totalAmount}</Card>
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
