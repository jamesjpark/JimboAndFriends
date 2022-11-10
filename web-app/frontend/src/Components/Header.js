import axios from "axios";
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';


function Header(props) {
  const navigate = useNavigate();

    return(
        <header className="App-header">
          Jimbo and Friends EE461L Website
          
            
        </header>
    )
}

export default Header;