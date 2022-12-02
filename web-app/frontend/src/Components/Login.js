import React,{ useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Login(props) {

    const [loginForm, setloginForm] = useState({
        userName: "",
        password: "",
        userID: ""
    })

    const navigate = useNavigate();
    let str = false;

    function handleChange(event) { 
      event.preventDefault();
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    function onLogin(event){
      console.log(loginForm)
      console.log(process.env.REACT_APP_API)
      axios.get(process.env.REACT_APP_API + "api/login/" + loginForm.userName + "/" + loginForm.password + "/" +loginForm.userID).then(
        res => {
          alert(res.data.msg)
          //setLoggedIn(res.data.login)
          str = res.data.login
          
          if(str === true){
            navigate("/projects")
            str = false;
          }
        }
      )
      event.preventDefault()
    }
    function onSignup(event){
      console.log(loginForm)
      navigate('/signUp')
      event.preventDefault()
    }
      


    return (
      <div className = "loginForm">
        <h1>LOGIN</h1>

          <form className="login">
            <input className = "userName" onChange={handleChange} 
                  type="userName"
                  text={loginForm.userName} 
                  name="userName" 
                  placeholder="Username" 
                  value={loginForm.userName} />
            <input className = "password" onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />
            <input className = "userID" onChange={handleChange} 
                  type="userID"
                  text={loginForm.userID} 
                  name="userID" 
                  placeholder="UserID" 
                  value={loginForm.userID} />
        <div>
        <div data-testid = "login-1">
        <button className = "loginButton" color = "primary" onClick={onLogin} > Login</button>
        </div>
       
        <div >
        <button className = "signupButton" color = "primary" onClick={onSignup} > Signup</button>
        </div>
        </div>
        
       
        </form>
      </div>
    );
}

export default Login;

