import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../userContext';

export default function NavBar() {
  const { user, unsetUser, setUser } = useContext(UserContext);

  function logout() {
    unsetUser();

    setUser({
      email: null,
      isAdmin: null,
    });
  }

  return (
    <Navbar sticky='top' bg='light' variant='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={NavLink} to={'/'}>
          MyStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link as={NavLink} to={'/'}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to={'/products'}>
              Shop
            </Nav.Link>

            {user.email ? (
              user.isAdmin ? (
                <>
                  <Navbar.Collapse id='navbar-dark-example'>
                    <Nav>
                      <NavDropdown
                        id='nav-dropdown-dark-example'
                        title='MyAccount'
                        menuVariant='dark'
                      >
                        <Nav.Link
                          as={NavLink}
                          className='nav-dropdown-link'
                          to={'/addProduct'}
                        >
                          Add Product
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          className='nav-dropdown-link'
                          to={'/orders'}
                        >
                          Orders
                        </Nav.Link>
                        <Nav.Link
                          onClick={logout}
                          className='nav-dropdown-link'
                        >
                          Logout
                        </Nav.Link>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </>
              ) : (
                <>
                  <Navbar.Collapse id='navbar-example'>
                    <Nav>
                      <NavDropdown id='nav-dropdown-example' title='MyAccount'>
                        <Nav.Link
                          as={NavLink}
                          className='nav-dropdown-link'
                          to={'/cart'}
                        >
                          Cart
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          className='nav-dropdown-link'
                          to={'/orders'}
                        >
                          Orders
                        </Nav.Link>
                        <Nav.Link
                          onClick={logout}
                          as={NavLink}
                          className='nav-dropdown-link'
                          to={'/login'}
                        >
                          Logout
                        </Nav.Link>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </>
              )
            ) : (
              <>
                <Navbar.Collapse id='navbar-dark-example'>
                  <Nav>
                    <NavDropdown
                      id='nav-dropdown-dark-example'
                      title='MyAccount'
                      menuVariant='dark'
                    >
                      <Nav.Link
                        as={NavLink}
                        className='nav-dropdown-link'
                        to={'/register'}
                      >
                        Register
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        className='nav-dropdown-link'
                        to={'/login'}
                      >
                        Login
                      </Nav.Link>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
