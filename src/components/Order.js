import React, { useState, useContext } from 'react';
import '../App.css';
import UserContext from '../userContext';
import { Card, Table, Button } from 'react-bootstrap';
import { Collapse, CardBody } from 'reactstrap';
import Swal from 'sweetalert2';

export default function Order({ orderProp }) {
  const { user, setUpdate } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let orderElement = orderProp ? orderProp.products : null;

  let products = orderElement
    ? orderElement.map((product) => {
        return (
          <tr key={product._id}>
            <td>{product.quantity}</td>
            <td>{product.name}</td>
            <td>{parseFloat(product.price).toFixed(2)}</td>
          </tr>
        );
      })
    : null;

  function setAsCompletedOrder(orderId) {
    fetch(
      `https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/admin/orders/completed/${orderId}`,
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
          setUpdate({});
        });
      });
  }
  function setAsPendingOrder(orderId) {
    fetch(
      `https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/admin/orders/pending/${orderId}`,
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
          setUpdate({});
        });
      });
  }

  return (
    <Card>
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
                <tr>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{products}</tbody>
            </Table>
            <Card.Text>
              Shipping Fee: ₱{parseFloat(orderProp.shippingFee).toFixed(2)}
            </Card.Text>
            <Card.Text>
              Total Amount: ₱{parseFloat(orderProp.totalAmount).toFixed(2)}
            </Card.Text>
            <Card>
              {user.isAdmin === true ? (
                orderProp ? (
                  orderProp.isPending === true ? (
                    <Button
                      variant='success'
                      onClick={() => setAsCompletedOrder(orderProp._id)}
                    >
                      Set as Completed
                    </Button>
                  ) : (
                    <Button
                      variant='danger'
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
