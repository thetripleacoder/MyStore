import React, { useState, useEffect, useContext } from 'react';

import { Row } from 'react-bootstrap';
import UserContext from '../userContext';
import Order from '../components/Order';
import { Card } from 'reactstrap';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [update, setUpdate] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    user.isAdmin
      ? fetch('https://cryptic-crag-81593.herokuapp.com/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)

            setOrder(data.data);

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
            setOrder(data.data);
            setUpdate({});
          });
  }, []);

  console.log(order);

  let orderComponents = order
    ? order.map((order) => {
        console.log(order);

        return <Order orderProp={order} />;
      })
    : null;

  return (
    <Card className=' textCenter'>
      <Row xs={12} md={1} className=' mt-5 rowCenter'>
        {user.isAdmin ? <h2>Admin</h2> : null}
        {orderComponents}
        {/* {elementProducts} */}
      </Row>
    </Card>
  );
}
