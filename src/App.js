import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { UserProvider } from './userContext';

/*import components here*/
import Home from './pages/home';
import Cart from './pages/cart';
import Orders from './pages/orders';
import NavBar from './components/NavBar';
// import Banner from './components/Banner';
import Footer from './components/Footer';
// import Product from './components/Product'
import NotFound from './components/notFound';

/*import pages here*/
import Register from './pages/register';
import Login from './pages/login';
import Products from './pages/products';
import Details from './pages/details';
import AddProduct from './pages/addProduct';
import Updates from './pages/updates';

function App() {
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    isAdmin: localStorage.getItem('isAdmin') === 'true',
  });

  function unsetUser() {
    localStorage.clear();
  }

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <NavBar />

          <Container className='my-0 mx-0 py-0 px-0 main-container' fluid>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/products/:productId' component={Details} />
              <Route exact path='/addProduct' component={AddProduct} />
              <Route
                exact
                path='/products/update/:productId'
                component={Updates}
              />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/orders' component={Orders} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
