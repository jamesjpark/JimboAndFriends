import React, { useState, useEffect, useRef } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";


function HWSet(props) {

  const [input, setInput] = useState(0);
  const [value, setValue] = useState(0);

  const [input2, setInput2] = useState(0);
  const [value2, setValue2] = useState(0);

  const [hw, setHW] = useState(1);

 
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "api/getHW/"+props.project.projectID).then(
        res => {
          setValue(res.data['hw1'])
          setValue2(res.data['hw2'])
        }
      )
    
  }, []);

  function handleChange(event, param){
    let result = event.target.value.replace(/\D/g, '');
    if(param==1){
      setInput(result);
    }
    else{
      setInput2(result);
    }
    
  }
  
  function handleCheckIn(event, param){
    event.preventDefault()
    let num = 0
    if(param==1){
      num = input
    }
    else{
      num = input2
    }
    axios.get(process.env.REACT_APP_API + "api/checkIn/"+ props.project.projectID +"/"+param+"/"+num)
    .then(
        res => {
          if(param==1){
            setValue(res.data.qty)
            if(res.data.value===100){
              setValue(100)
              alert("Checked In value exceed HWSet1 capacity")
            }
          }
          else{
            setValue2(res.data.qty)
            if(res.data.value===100){
              setValue2(100)
              alert("Checked In value exceed HWSet1 capacity")
            }
          }
          
        }
        
      )
      
      setInput("")
      setInput2("")

  }
  
  function handleCheckOut(event, param){
    event.preventDefault()
    let num = 0
    if(param==1){
      num = input
    }
    else{
      num = input2
    }
    axios.get(process.env.REACT_APP_API + "api/checkOut/"+ props.project.projectID +"/"+param+"/"+num)
    .then(
        res => {
          
          if(param==1){
            setValue(res.data.qty)
            if(res.data.value===0){
              setValue(0)
              alert("Checked Out value exceeds HWSet1 quantity")
            }
          }
          else{
            setValue2(res.data.qty)
            if(res.data.value===0){
              setValue2(0)
              alert("Checked Out value exceeds HWSet1 quantity")
            }
          }
          
        }
        
      )
      .catch(error => {
        
        alert("Total checked out exceeds HWSet1 Quantity")
        return error;
      });
      setInput("")
      setInput2("")

  }



  return (
    <div>
      <form className = "HWSET1">
      HWSET1 {value}/100
      <input
            placeholder='Enter Qty'
            name='text'
            className='HWSET-Input'
            onChange = {event => handleChange(event, 1)}
            value = {input}
            
          />

      <button className = "check" onClick = {event => handleCheckIn(event, 1)} >
        Check In
      </button>

      <button className = "check" onClick = {event => handleCheckOut(event, 1)}>
        Check Out
      </button>
      </form>


      <form className = "HWSET2">
      HWSET2 {value2}/100
      <input
            placeholder='Enter Qty'
            name='text'
            className='HWSET-Input'
            onChange = {event => handleChange(event, 2)}
            value = {input2}
          />

      <button className = "check" onClick = {event => handleCheckIn(event, 2)}>
        Check In 
      </button>
    
      <button className = "check" onClick = {event => handleCheckOut(event, 2)}>
        Check Out
      </button>
     
      
      </form>
      
    </div>
  )
}

export default HWSet