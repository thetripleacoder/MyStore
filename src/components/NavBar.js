import React, {useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavLink, Link} from 'react-router-dom'
import UserContext from '../userContext'

export default function NavBar(){

	const {user, unsetUser, setUser} = useContext(UserContext)


	function logout(){
		unsetUser()

		setUser({
			email: null,
			isAdmin:null
		})
		window.location.replace('/login')
	}

	return (
		<Navbar sticky="top" bg = "light" variant="light" expand = "lg">
			<Navbar.Brand as={Link} to="/">MyStore</Navbar.Brand>
			<Navbar.Toggle aria-controls = "basic-navbar-nav"/>
			<Navbar.Collapse id = "basic-navbar-nav">
				<Nav className = "ml-auto">
					<Nav.Link as={NavLink} to="/">Home</Nav.Link>
					<Nav.Link as={NavLink} to="/products">Products</Nav.Link>

				
					{
						user.email 
						? 
							user.isAdmin
							? 
								<>
									<Nav.Link as={NavLink} to="/addProduct">Add Product</Nav.Link>
									<Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
									<Nav.Link onClick={logout}>Logout</Nav.Link>
								</>	
							: 
							<>
								<Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
								<Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
								<Nav.Link onClick={logout}>Logout</Nav.Link>
							</>
						:
							<>
								<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
								<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
							</>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}