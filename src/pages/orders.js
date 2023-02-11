import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import UserContext from '../userContext';
import Order from '../components/Order';
import { Redirect } from 'react-router-dom';

export default function Orders() {
  const { user, update } = useContext(UserContext);
  const [orders, setOrders] = useState();
  const [pendingOrders, setPendingOrders] = useState();
  const [completedOrders, setCompletedOrders] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    user.isAdmin
      ? fetch(
          'https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/admin/orders',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            let ordersTemp = data.data;
            setOrders(ordersTemp);
            let tempArray = ordersTemp.filter((order) => {
              return order.isPending === true;
            });
            setPendingOrders(tempArray);

            let tempArray2 = ordersTemp.filter((order) => {
              return order.isPending === false;
            });
            setCompletedOrders(tempArray2);
          })
      : fetch(
          'https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/user/orders',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            let ordersTemp = data.data;
            setOrders(ordersTemp);
            let tempArray = ordersTemp
              ? ordersTemp.filter((order) => {
                  return order.isPending === true;
                })
              : null;
            setPendingOrders(tempArray);
            let tempArray2 = ordersTemp
              ? ordersTemp.filter((order) => {
                  return order.isPending === false;
                })
              : null;
            setCompletedOrders(tempArray2);
          });
  }, [update]);

  let pendingOrderComponents = pendingOrders
    ? pendingOrders.map((order) => {
        return <Order key={order._id} orderProp={order} />;
      })
    : null;

  let completedOrderComponents = completedOrders
    ? completedOrders.map((order) => {
        return <Order key={order._id} orderProp={order} />;
      })
    : null;

  return user.isAdmin || user.email ? (
    pendingOrderComponents < 1 && completedOrderComponents < 1 ? (
      <Container>
        <Row className='justify-content-center'>
          <Card className='mt-5 px-4 py-4' bg='light'>
            <h3 className='text-center'>
              {' '}
              You haven't checked out any order yet.
            </h3>
          </Card>
        </Row>
      </Container>
    ) : (
      <Container>
        <Row className='mt-5 justify-content-center'>
          {user.isAdmin ? <h1>Customer Orders</h1> : <h1>User Orders</h1>}
        </Row>
        <Row className='mb-5'>
          <Col xs={12} md={6}>
            <h4 className='text-center'>Pending Orders</h4>
            {pendingOrderComponents}
          </Col>

          <Col xs={12} md={6}>
            <h4 className='text-center'>Completed Orders</h4>
            {completedOrderComponents}
          </Col>
        </Row>
      </Container>
    )
  ) : (
    <Redirect to='/login' />
  );
}
