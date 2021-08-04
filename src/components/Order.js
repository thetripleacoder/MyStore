// import React, {useState} from 'react'

// import { Collapse, Button, CardBody, Card } from 'reactstrap'
// import { Row} from 'react-bootstrap'

// export default function OrderComp({orderProp}){

//   const [isOpen, setIsOpen] = useState(false)
//   const toggle = () => setIsOpen(!isOpen)

//       return (

//        <>
//                   <Button color="secondary" onClick={toggle} style={{ width: '100%'}}>Order ID: {orderProp._id} </Button>
//                   <Collapse isOpen={isOpen}>
//                     <Card>
//                       <CardBody>
//                         {/*{map(orderProp.products)}*/}
//                         <Card.Text>
//                         Purchased On: {orderProp.purchasedOn}
//                         </Card.Text>
//                         <Card.Text>
//                         Total Amount: {orderProp.totalAmount}
//                         </Card.Text>
//                       </CardBody>
//                     </Card>
//                   </Collapse>
//              </>
//       )

//   }
