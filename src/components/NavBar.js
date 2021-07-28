import React, {useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavLink, Link} from 'react-router-dom'


export default function NavBar(){

	return (
		<Navbar bg = "light" expand = "lg">
			<Navbar.Brand as={Link} to="/">My Store</Navbar.Brand>
			<Navbar.Toggle aria-controls = "basic-navbar-nav"/>
			<Navbar.Collapse id = "basic-navbar-nav">
				<Nav className = "mr-auto">
					<Nav.Link as={NavLink} to="/">Home</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}