import React,{ useState} from 'react';
import axios from "axios";
import { Link, useNavigate} from 'react-router-dom';




function Login(props) {

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
      
    //   navigate("/projects")
    // }

    // function signUp(event) {
      

    //   setloginForm(({
    //     email: "",
    //     password: ""}))
        
    //   event.preventDefault()
    //   navigate("/signup")

    // }

    function handleChange(event) { 
      event.preventDefault();
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    function onLogin(event){
      console.log(loginForm)
      axios.get("http://127.0.0.1:5000/login/" + loginForm.userName + "/" + loginForm.password + "/" +loginForm.userID).then(
        res => {
          alert(res.data.msg)
        }
      )
      event.preventDefault()
      navigate("/projects")
    }

    function onSignup(event){
      console.log(loginForm)
      axios.get("http://127.0.0.1:5000/signup/" + loginForm.userName + "/" + loginForm.password+ "/" +loginForm.userID).then(
        res => {
          alert(res.data.msg)
        }
      )
      event.preventDefault()
      
    }
      


    return (
      <div>
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


// class Login extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         errorMessages: {},
//         isSubmitted: false

//       };
      

      
//     }


//     logUserIn = () => {
//       // we can access handleLogin from App since it was passed as a prop
//       this.props.handleLogin(true)
//     }
  
//     dontLogUserIn = () => {
//       alert('Thank you for your honesty.')
//       this.props.handleLogin(false)
//     }
    
  
//     render() {
//       return (
        
//         <div>
//           <h1>"Sign in"</h1>
//           <p>Do you have permission to use this site?</p>
//           <button onClick={this.logUserIn}>Yes</button>
//           <button onClick={this.dontLogUserIn}>No</button>
//         </div>
//       )
//     }
//  }