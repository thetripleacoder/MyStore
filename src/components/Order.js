import React, { useState, useContext } from 'react';
import '../App.css';
import UserContext from '../userContext';
import { Card, Table, Button } from 'react-bootstrap';
import { Collapse, CardBody } from 'reactstrap';
import Swal from 'sweetalert2';

export default function Order({ orderProp }) {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(0);
  const toggle = () => setIsOpen(!isOpen);

  let orderElement = orderProp ? orderProp.products : null;
  console.log(orderElement);

  let products = orderElement
    ? orderElement.map((product) => {
        return (
          <tr key={product._id}>
            <td>{product.quantity}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
          </tr>
        );
      })
    : null;

  function setAsCompletedOrder(orderId) {
    fetch(
      `https://cryptic-crag-81593.herokuapp.com/api/admin/orders/completed/${orderId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Order Completed Successfully!',
          text: 'Order has been completed.',
        });

        setUpdate({});
      });
  }
  function setAsPendingOrder(orderId) {
    fetch(
      `https://cryptic-crag-81593.herokuapp.com/api/admin/orders/pending/${orderId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Order set as Pending Successful!',
          text: 'Order has been moved to Pending.',
        });

        setUpdate({});
      });
  }
  console.log(orderProp.isPending);

  return (
    <Card className=''>
      <Button variant='dark' onClick={toggle} style={{ width: '100%' }}>
        Order # : {orderProp._id}{' '}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {/* {user.isAdmin ? ( */}
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

              {user.isAdmin == true ? (
                orderProp ? (
                  orderProp.isPending == true ? (
                    <Button
                      variant='success'
                      className='alignItem'
                      onClick={() => setAsCompletedOrder(orderProp._id)}
                    >
                      Set as Completed
                    </Button>
                  ) : (
                    <Button
                      variant='danger'
                      className='mx-2'
                      onClick={() => setAsPendingOrder(orderProp._id)}
                    >
                      Set as Pending
                    </Button>
                  )
                ) : null
              ) : null}
            </>
            {/* ) : (
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
            )} */}
          </CardBody>
        </Card>
      </Collapse>
    </Card>
  );
}
