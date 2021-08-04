import React, { useState, useEffect, useContext } from 'react';

import { Row, Card } from 'react-bootstrap';
import UserContext from '../userContext';
import OrderComp from '../components/Order';

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

  let orderComponents = order ? order.map((orderElement) => {
        console.log(orderElement);

        return <OrderComp key={orderElement._id} orderProp={orderElement} />;
          
      })
  : null
   

  return (
    <>
      <Card className=' textCenter'>
        <Row xs={12} md={1} className=' mt-5 rowCenter'>
          {user.isAdmin ? <h2>Admin</h2> : null}
          {orderComponents}
        </Row>
      </Card>
    </>
  );
}
