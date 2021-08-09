import React, { useState, useEffect, useContext } from 'react';

import { Row, Col } from 'react-bootstrap';
import UserContext from '../userContext';
import Order from '../components/Order';
import { Redirect } from 'react-router-dom';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [pendingOrders, setPendingOrders] = useState();
  const [completedOrders, setCompletedOrders] = useState();

  useEffect(() => {
    user.isAdmin
      ? fetch('https://cryptic-crag-81593.herokuapp.com/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            let ordersTemp = data.data;
            let tempArray = ordersTemp.filter((order) => {
              return order.isPending === true;
            });
            setPendingOrders(tempArray);

            let tempArray2 = ordersTemp.filter((order) => {
              return order.isPending === false;
            });
            setCompletedOrders(tempArray2);
          })
      : fetch('https://cryptic-crag-81593.herokuapp.com/api/user/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            let ordersTemp = data.data;
            console.log(ordersTemp);

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
  }, []);
  console.log(pendingOrders);

  let pendingOrderComponents = pendingOrders
    ? pendingOrders.map((order) => {
        console.log(order);

        return <Order orderProp={order} />;
      })
    : null;

  let completedOrderComponents = completedOrders
    ? completedOrders.map((order) => {
        console.log(order);

        return <Order orderProp={order} />;
      })
    : null;

  return (
    // <Card className=' textCenter'>
    user.isAdmin || user.email ? (
      <>
        <Row className='mt-5 rowCenter'>
          {user.isAdmin ? <h1>Customer Orders</h1> : <h1>User Orders</h1>}
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <h4 className='textCenter'>Pending Orders</h4>
            {pendingOrderComponents}
          </Col>
          {/* {elementProducts} */}
          <Col xs={12} md={6}>
            <h4 className='textCenter'>Completed Orders</h4>
            {completedOrderComponents}
          </Col>
        </Row>
        {/* // </Card> */}
      </>
    ) : (
      <Redirect to='/login' />
    )
  );
}
