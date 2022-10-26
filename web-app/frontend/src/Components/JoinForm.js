import React, { useState, useEffect } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import {Popup} from "./Popup";
import axios from "axios";

function JoinForm(props){
    
  const [joinText, setJoinText] = useState(true);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(props.project.id)
  const [join, setJoin] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/join/<projectId>").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setJoin(data);
        }).then(data =>console.log(data)).then(error=>console.log(error))
    );
  }, []);

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/leave/<projectId>").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setJoin(data);
        })
    );
  }, []);


  function leave(){
    axios({
      method: "GET",
      url: '/leave/<int: projectid>'
    })
    .then((response)=>{
      const res = response.data
      setProject(res)
    })
    
  }

  function handlePress(){
    setOpen(true);
    if(joinText==true){
      setJoinText(false);
    }
    else{
      setJoinText(true);
    }
    
  }
 
  return (

    <div>
    <button className = 'joinButton' onClick = {() => handlePress()}>
      {

      joinText ? "Join" 
      : "Leave"
      }
      </button>
      {open && !joinText? <Popup text = {project} closePopup={() => setOpen(false)} text2 = "Joined" /> : open && joinText ? <Popup text = {project} closePopup={() => setOpen(false)} text2 = "Left" />: null}

      
    </div>
  ) 
}

export default JoinForm