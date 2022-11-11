import React, { useState, useEffect, useRef } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import {Popup} from "./Popup";
import axios from "axios";


function HWSet(props) {
  const [input, setInput] = useState(0);
  const [value, setValue] = useState(0);
  let num = input;

  const [input2, setInput2] = useState(0);
  const [value2, setValue2] = useState(0);
  let num2 = input;

  const [open, setOpen] = useState(false);

  const [hardware1, sethardware1] = useState({
      projectId: "",
      quantity: 0
  });
  const [hardware2, sethardware2] = useState({
      projectId: "",
      quantity: 0
  });
  
  
  ///////HWSET1


  const handleChange = e => {
    let result = e.target.value.replace(/\D/g, '');
    num = result;
    setInput(result);
    
    
  };

  const handleCheckIn = e => {
    
    setOpen(true);
    e.preventDefault();
    let num1 = value+Number.parseInt(input);
    if(num1>100){
        setValue(100);
    }
    else{
        if(isNaN(num1)){
          setValue(0);
        }
        else{
          setValue(num1);
        }
          
    }
    
    setInput('');
    //navigate("/checkIn")
  };

  const handleCheckOut = e => {
    
    setOpen(true);
    e.preventDefault();
    let num1 = value-Number.parseInt(input);
    if(num1<0){
        setValue(0);
    }
    else{
      if(isNaN(num1)){
        setValue(0);
      }
      else{
        setValue(num1);
      }
    }
    
    setInput('');
    //navigate("/checkOut")
  };

  ///////HWSET2
  const handleChange2 = e => {
    let result = e.target.value.replace(/\D/g, '');
    num2 = result;
    setInput2(result);
    
    
  };

  const handleCheckIn2 = e => {
    
    setOpen(true);
    e.preventDefault();
    let num2 = value2+Number.parseInt(input2);
    if(num2>100){
        setValue2(100);
    }
    else{
      if(isNaN(num2)){
        setValue(0);
      }
      else{
        setValue(num2);
      }
    }
   
    setInput2('');
  };

  const handleCheckOut2 = e => {
   
    setOpen(true);
    e.preventDefault();
    let num2 = value2-Number.parseInt(input2);
    if(num2<0){
        setValue2(0);
    }
    else{
      if(isNaN(num2)){
        setValue(0);
      }
      else{
        setValue(num2);
      }
    }
    

    setInput2('');
  };




  return (
    <div>
      <form className = "HWSET">
      HWSET1 {value}/100
      <input
            placeholder='Enter Qty'
            name='text'
            className='HWSET-Input'
            onChange = {handleChange}
            value = {input}
            
          />

      <button className = "check" onClick = {handleCheckIn}>
        Check In
      </button>
      {open ? <Popup text= "hardware checked in" closePopup={() => setOpen(false)} text2 = {num}/>: null}
      

      <button className = "check" onClick = {handleCheckOut}>
        Check Out
      </button>
      {open ? <Popup text= "hardware checked out" closePopup={() => setOpen(false)}  text2 = {num}/> : null}
      </form>




      <form className = "HWSET">
      HWSET2 {value2}/100
      <input
            placeholder='Enter Qty'
            name='text'
            className='HWSET-Input'
            onChange = {handleChange2}
            value = {input2}
          />

      
      <button className = "check" onClick = {handleCheckIn2}>
        Check In
      </button>
      {open ? <Popup text= "hardware checked in" closePopup={() => setOpen(false)} text2 = {num2}/> : null}

      <button className = "check" onClick = {handleCheckOut2}>
        Check Out
      </button>
      {open ? <Popup text= "hardware checked out" closePopup={() => setOpen(false)} text2 = {num2}/> : null}
      

      </form>
      
    </div>
  )
}

export default HWSet