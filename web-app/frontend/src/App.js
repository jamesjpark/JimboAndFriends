import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState, } from 'react'

import Login from './Components/Login'
import Projects from './Components/Projects'
import Header from './Components/Header'
import useToken from './Components/useToken'
import Signup from './Components/Signup'

import './App.css'

function App() {
  
  const { token, removeToken, setToken } = useToken();
  
  return (
    
    // <BrowserRouter>
    // <div className="App">
    
    
    // {!token && token!=="" && token!== undefined?  
    //     <Login setToken={setToken} />
    //     :(
          
    //       <>
    //       <Header token={removeToken}/>   
          
    //       <Routes>

    //       <Route exact path = "/" element = {<Login setToken={setToken} />}></Route>
    //       <Route path = "/projects" element ={<Projects token={token} setToken={setToken}/>}> </Route>
    //       <Route path = "/signup" element = {<Signup/>}> </Route>
    //       </Routes>
      
    //       </>
          
    //     )} 
    // </div>
    // </BrowserRouter>


    <BrowserRouter>
    <div>hello</div>
    <div className="App">
    <Routes>
    <Route exact path = "/" element = {<Login />}></Route>
   
    </Routes>

    </div>

    </BrowserRouter>
    
  );
}

// class App extends React.Component {
  
//   constructor(props) {
//     // in React, we always need to call the superclass constructor first with super() 
//     // if we override the component's constructor
//     super(props)

//     // app owns the login state because it needs it in order to do conditional rendering.
//     // shared state should always be as low as possible in the component hierarchy.
//     this.state = { isLoggedIn: false }
//   }

//   handleLogin = (loggedIn) => {
//     this.setState({
//       isLoggedIn: loggedIn
//     })
//   }

//   render() {
//     // conditional rendering
//     if (this.state.isLoggedIn) {
//       return (<Projects />)
//     }
//     else {
//       // Login needs to be able to mutate the login state, so we pass it handleLogin as a prop
//       return (<Login handleLogin={this.handleLogin}/>)
//     }
//   }
// }

export default App;