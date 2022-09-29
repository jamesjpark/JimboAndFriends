import './logo.svg'
import './App.css'

import React from 'react';

class Projects extends React.Component{ //put these in separate files
  render(){
    return(
      <div>
        <h1>
          Projects
        </h1>
        <p> These are your projects.</p>
      </div>
    )
  }
}

class Login extends React.Component{//put this ins separate file

  login = () => {
    this.props.handleLogin = true
  }

  render(){
    return(
      <div>
        <h1> 
          Please "log in"
        </h1>
        <p> 
          Do you have access?
        </p>
        <button onclick={this.login}> 
          Yes</button>
        
        <button>
          No</button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { isLoggedIn: false }

  }

  handleLogin = (loggedIn) => {
    this.setState({
      isLoggedIn: loggedIn
    })
  }

  render(){
    if(this.state.isLoggedIn){
      return(<Projects />)
    }
    else{
      return(<Login handleLogin = {this.handleLogin} />)
    }
  }

}

export default App;
