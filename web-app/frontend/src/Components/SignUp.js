import { useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function SignUp(props) {

    const [loginForm, setloginForm] = useState({
        userName: "",
        password: "",
        userID: ""
    })
    const navigate = useNavigate();
    // function logMeIn(event) {
    //   axios({
    //     method: "POST",
    //     url:"/token",
    //     data:{
    //       email: loginForm.email,
    //       password: loginForm.password
    //      }
    //   })
    //   .then((response) => {
    //     props.setToken(response.data.access_token)
    //   }).catch((error) => {
    //     if (error.response) {
    //       console.log(error.response)
    //       console.log(error.response.status)
    //       console.log(error.response.headers)
    //       }
    //   })

    //   setloginForm(({
    //     email: "",
    //     password: ""}))

    //   event.preventDefault()
    // }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    
    function onSignup(event){
      console.log(loginForm)
      axios.get(process.env.REACT_APP_API + "api/signup/" + loginForm.userName + "/" + loginForm.password+ "/" +loginForm.userID).then(
        res => {
          alert(res.data.msg)
          navigate("/")
        }
      )
      event.preventDefault()
      
    }
      

    return (
      <div className="loginForm">
        <h1>SIGNUP</h1>
                <form className="login">
                    
                    <div className="mb-3">
                        
                        <input
                            name="userName"
                            type="text"
                            className = "userName"
                            placeholder="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        
                        <input
                            name="userID"
                            type="text"
                            className = "userName"
                            placeholder="userID"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        
                        <input
                            name="password"
                            type="password"
                            className = "userName"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </div>
                   
                    <div>
                        <button className = "signupButton" color = "primary" onClick = {onSignup}>
                            Sign Up
                        </button>
                    </div>
                    {/* <p className="forgot-password text-right">
                        Already registered <a href="/sign-in">sign in?</a>
                    </p> */}
                </form>

            </div>
      
    );
}

export default SignUp;