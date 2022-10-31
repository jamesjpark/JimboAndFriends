import React,{ useState, useEffect} from 'react';
import axios from "axios";
import { Link, useNavigate} from 'react-router-dom';




function Login(props) {

    const [loginForm, setloginForm] = useState({
        userName: "",
        password: "",
        userID: ""
    })

    const [loggedIn, setLoggedIn] = useState(0);
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
      axios.get("/api/login/" + loginForm.userName + "/" + loginForm.password + "/" +loginForm.userID).then(
        res => {
          alert(res.data.msg)
          //setLoggedIn(res.data.login)
          str = res.data.login
          console.log(str)
          if(str == true){
            navigate("/projects")
            str = false;
          }
        }
      )
      event.preventDefault()
      
      
      
    }



    function onSignup(event){
      console.log(loginForm)
      // axios.get("http://127.0.0.1:5000/signup/" + loginForm.userName + "/" + loginForm.password+ "/" +loginForm.userID).then(
      //   res => {
      //     alert(res.data.msg)
      //     navigate("/signUp")
      //   }
      // )
      navigate('/signUp')
      event.preventDefault()
      
    }
      


    return (
      <div className = "loginForm">
        <h1>Login</h1>

          <form className="login">
            <input onChange={handleChange} 
                  type="userName"
                  text={loginForm.userName} 
                  name="userName" 
                  placeholder="Username" 
                  value={loginForm.userName} />
            <input onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />
            <input onChange={handleChange} 
                  type="userID"
                  text={loginForm.userID} 
                  name="userID" 
                  placeholder="UserID" 
                  value={loginForm.userID} />

        <button onClick={onLogin} > Login</button>
        <button onClick={onSignup} > Signup</button>
        </form>
      </div>
    );
}

export default Login;

