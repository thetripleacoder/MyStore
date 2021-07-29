import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import {UserProvider} from './userContext'



/*import our components here*/
import Home from './pages/home'
import NavBar from './components/NavBar'
import Register from './pages/register'
import Login from './pages/login'
import NotFound from './components/notFound'

function App(){

  const[user, setUser] = useState({
    email: localStorage.getItem('email'),
    isAdmin: localStorage.getItem('isAdmin') === "true"
  })
   console.log(user)

  function unsetUser(){
    localStorage.clear()
  }

  return(
    <>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
          <NavBar />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
         {/*     <Route exact path="/courses" component={Courses} />*/}
             {/* <Route exact path="/addCourse" component={AddCourse} />*/}
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </UserProvider>
    </>
    )
}


export default App; 

