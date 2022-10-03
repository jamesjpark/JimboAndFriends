import React from "react"; 

class Login extends React.Component {
    logUserIn = () => {
      // we can access handleLogin from App since it was passed as a prop
      this.props.handleLogin(true)
    }
  
    dontLogUserIn = () => {
      alert('Thank you for your honesty.')
      this.props.handleLogin(false)
    }
  
    render() {
      return (
        <div>
          <h1>Please "log in"</h1>
          <p>Do you have permission to use this site?</p>
          <button onClick={this.logUserIn}>Yes</button>
          <button onClick={this.dontLogUserIn}>No</button>
        </div>
      )
    }
  }
export default Login;