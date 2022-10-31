import { useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function SignUp(props) {

    const [loginForm, setloginForm] = useState({
        userID: "",
        password: "",
        username: ""
    })
    const navigate = useNavigate();
    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value}), () =>{
            console.log(this.loginForm)
          }
      )}

    
    function onSignup(event){
      console.log(loginForm)
      axios.get("http://127.0.0.1:5000/signup/" + loginForm.username + "/" + loginForm.password+ "/" +loginForm.userID).then(
        res => {
          alert(res.data.msg)
          navigate("/signUp")
        }
      )
      event.preventDefault()
      
    }
      

    return (
      <div className="Signup">
                <form>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>userID</label>
                        <input
                            name="userID"
                            type="text"
                            className="form-control"
                            placeholder="userID"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" onClick = {onSignup}>
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