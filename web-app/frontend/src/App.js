import { BrowserRouter, Route, Routes, Link,  } from 'react-router-dom'
import { useState, } from 'react'

import Login from './Components/Login'
import Projects from './Components/Projects'
import Header from './Components/Header'
import useToken from './Components/useToken'
import './App.css'

function App() {
  
  const { token, removeToken, setToken } = useToken();
  
  return (
    
    <BrowserRouter>
    <div className="App">
    <Header token={removeToken}/>
    
    {!token && token!=="" && token!== undefined?  
        <Login setToken={setToken} />
        :(
          <>

          <Routes>

          <Route exact path = "/" element = {<Login setToken={setToken} />}></Route>
          <Route path = "/projects" element ={<Projects token={token} setToken={setToken}/>}> </Route>
          </Routes>
      
          </>
          
        )} 
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