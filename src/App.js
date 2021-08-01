import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Container, Row} from 'react-bootstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import {UserProvider} from './userContext'



/*import components here*/
import Home from './pages/home'
import Cart from './pages/cart'
import NavBar from './components/NavBar'
// import Product from './components/Product'
import NotFound from './components/notFound'

/*import pages here*/
import Register from './pages/register'
import Login from './pages/login'
import Products from './pages/products'
import Details from './pages/details'
import AddProduct from './pages/addProduct'
import Updates from './pages/updates'


function App(){

  const[user, setUser] = useState({
    email: localStorage.getItem('email'),
    isAdmin: localStorage.getItem('isAdmin') === "true"
  })
   console.log(user)

  function unsetUser(){
    localStorage.clear()
  }

  let productId = localStorage.getItem('productId')
  console.log(productId)

  return(
    <>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router >
          <NavBar />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:productId" component={Details} />
              <Route exact path="/addProduct" component={AddProduct} />
              <Route exact path="/products/update/:productId" component={Updates} />
              <Route exact path="/cart" component={Cart} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </UserProvider>
    </>
    )
}


export default App; 

