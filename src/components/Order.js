import React, { useState, useContext, useEffect } from 'react';
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

  function reloadWindow() {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

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
        Swal.fire({
          icon: 'success',
          title: 'Order Completed Successfully!',
          text: 'Order has been completed.',
        }).then(() => {
          reloadWindow();
        });
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
        Swal.fire({
          icon: 'success',
          title: 'Order set as Pending Successful!',
          text: 'Order has been moved to Pending.',
        }).then(() => {
          reloadWindow();
        });
      });
  }

  return (
    <Card className=''>
      <Button variant='dark' onClick={toggle} style={{ width: '100%' }}>
        Order ID : {orderProp._id}{' '}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Card.Text>
              Buyer: {orderProp.firstName} {orderProp.lastName}
            </Card.Text>
            <Card.Text>Address: {orderProp.address}</Card.Text>
            <Card.Text>Mobile No: {orderProp.mobileNo}</Card.Text>
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
            <Card>
              {user.isAdmin === true ? (
                orderProp ? (
                  orderProp.isPending === true ? (
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
                      className='alignItem'
                      onClick={() => setAsPendingOrder(orderProp._id)}
                    >
                      Set as Pending
                    </Button>
                  )
                ) : null
              ) : null}
            </Card>
          </CardBody>
        </Card>
      </Collapse>
    </Card>
  );
}
