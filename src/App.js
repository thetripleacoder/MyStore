import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'


/*import our components here*/
import Home from './pages/home'
import NavBar from './components/NavBar'

// import Register from './pages/register'
// import Login from './pages/login'
import NotFound from './components/notFound'

function App(){

  return(
    <>
      
        <Router>
          <NavBar />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
    
    </>
    )
}


export default App; 

