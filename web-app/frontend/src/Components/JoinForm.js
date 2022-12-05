import React, { useState, useEffect } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import {Popup} from "./Popup";
import axios from "axios";

function JoinForm(props){
  
  const [joinText, setJoinText] = useState(true);
  const [open, setOpen] = useState(false);

  function refreshPage() {
    window.location.reload(false);
    
  }
  useEffect(() => {
    axios.get(process.env.REACT_APP_API+ "/api/joined/" + props.project.projectID).then(
        res => {
          setJoinText(res.data.join);
        }
      )
      
  }, []);
  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_API+ "/api/leave/" + props.project.projectID).then(
  //       res => {
  //         setJoinText(res.data.join);
  //       }
  //     )
    
  // }, []);


  function handleJoin(event){

    console.log(process.env.REACT_APP_API)
    axios.get(process.env.REACT_APP_API+ "/api/join/" + props.project.projectID)
    .then(
      res => {
        console.log(props.project.projectID);
        console.log(joinText);
        alert(res.data.msg)
        setJoinText(!res.data.join);
        refreshPage();
        
      }
    )
    event.preventDefault()
  }
  function handleLeave(event){
    setJoinText(false);
    axios.get(process.env.REACT_APP_API+ "/api/leave/" + props.project.projectID)
    .then(
      res => {
        console.log(props.project.projectID);
        console.log(joinText);
        alert(res.data.msg)
        setJoinText(!res.data.join);
        refreshPage();
        
      }

  
    )
    event.preventDefault()
  }


  function handlePress(){
    if(joinText==true){

      handleJoin();
    }
    else{
      handleLeave();
    }
  }


 
  return (
    
    <div>
      
    <button className = 'joinButton' onClick = {() => handlePress()}>
      {
        joinText ? "Join" : "Leave"
      }
    </button>
     

    </div>
  ) 
}

export default JoinForm