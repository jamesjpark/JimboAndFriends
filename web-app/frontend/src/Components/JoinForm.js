import React, { useState, useEffect } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import {Popup} from "./Popup";
import axios from "axios";

function JoinForm(props){
    
  const [joinText, setJoinText] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  function handlePress(){
    
    if(joinText==true){
      setJoinText(false);
      alert("Joined Project")
    }
    else{
      setJoinText(true);
      alert("Left Project")
    }
    
  }
 
  return (

    <div>
    <button className = 'joinButton' onClick = {() => handlePress()}>
      {
        joinText ? "Join" : "Leave"
      }
    </button>
      {/* {open && !joinText? <Popup text = {project} closePopup={() => setOpen(false)} text2 = "Joined" /> : open && joinText ? <Popup text = {project} closePopup={() => setOpen(false)} text2 = "Left" />: null} */}

    </div>
  ) 
}

export default JoinForm