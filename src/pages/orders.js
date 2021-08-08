import React, { useState, useEffect, useContext } from 'react';

import { Row, Col } from 'react-bootstrap';
import UserContext from '../userContext';
import Order from '../components/Order';
import { Card } from 'reactstrap';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [update, setUpdate] = useState();
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
            console.log(data);
            let ordersTemp = data.data;

            let tempArray = ordersTemp.filter((order) => {
              return order.isPending === true;
            });
            setPendingOrders(tempArray);

            let tempArray2 = ordersTemp.filter((order) => {
              return order.isPending === false;
            });
            setCompletedOrders(tempArray2);

            setUpdate({});
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

            let tempArray = ordersTemp.filter((order) => {
              return order.isPending === true;
            });
            setPendingOrders(tempArray);

            let tempArray2 = ordersTemp.filter((order) => {
              return order.isPending === false;
            });
            setCompletedOrders(tempArray2);
            setUpdate({});
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
        let i = 1;
        i++;
        console.log(i);

        return <Order orderProp={(order, i)} />;
      })
    : null;

  return (
    // <Card className=' textCenter'>
    <>
      <Row className='mt-5 rowCenter'>
        {user.isAdmin ? <h1>Customer Orders</h1> : <h1>User Orders</h1>}
      </Row>
      <Row className=' textCenter mt-3 '>
        <Col>
          <h4>Pending Orders</h4>
        </Col>
        {/* {elementProducts} */}
        <Col>
          <h4>Completed Orders</h4>
        </Col>
      </Row>
      <Row className=' mt-3 '>
        <Col>{pendingOrderComponents}</Col>
        {/* {elementProducts} */}
        <Col>{completedOrderComponents}</Col>
      </Row>
      {/* // </Card> */}
    </>
  );
}
