import axios from "axios";
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    navigate("/")
    }


    function Signup(){

    }

    return(
        <header className="App-header">
           
            <button onClick={logMeOut}> 
                Logout
            </button>
            <button onClick={Signup}> 
                Signup
            </button>
        </header>
    )
}

export default Header;