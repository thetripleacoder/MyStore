import React, {useState, useEffect, useContext} from 'react'

/*import components here*/
import Banner from '../components/Banner'
import Highlights from '../components/Highlights'
import Product from '../components/Product'
import Detail from '../components/Detail'
import {Row, Card, Table, Button, Form, InputGroup} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import UserContext from '../userContext'

export default function Cart({cartProp}) {

	function add() {
		setQuantity (quantity+1)
	}
	function subtract() {
		setQuantity (quantity-1)
	}

	function removeProduct(arr, value) {
	  var index = arr.indexOf(value);
	  if (index > -1) {
	    arr.splice(index, 1);
	  }
	  return arr;
	}
    
	
	return (

		<tr key={cartProp._id} >
					
					<td>{cartProp.name}</td>
					<td>{cartProp.price}</td>
					<td>
					<InputGroup >
				    <Button variant="outline-secondary" id="button-addon1" onClick={subtract}>
				      -
				    </Button>
				    <Form.Control className="inputValue" size="lg" type="number" value={cartProp.quantity} onChange={event=>{
					// console.log(event.target)
					setQuantity(event.target.value)}} required/>
					<Button variant="outline-secondary" id="button-addon1" onClick={add}>
				      +
				    </Button>
				  </InputGroup>
				  </td>
				  <td>
				  		{cartProp.quantity*cartProp.price}
				  </td>
				
					<td>
					<Button variant="success" className="mx-2" onClick={()=>removeProduct(cart, cartProp)}>Delete</Button>

					</td>
			</tr>
			
		
		)


}