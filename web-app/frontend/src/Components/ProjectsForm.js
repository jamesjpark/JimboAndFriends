import React, { useState, useEffect, useRef } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function ProjectsForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.name : '');
  function refreshPage() {
    window.location.reload(false);
  }
  const [project, setProject] = useState({
    name: "",
    projectId: "",
    description: "",
    authorized: ""
  })


  let str = false;
  const inputRef = useRef(null);

  function handleChange(event) { 
    
    const {value, name} = event.target
    setProject(prevNote => ({
        ...prevNote, [name]: value})
  )};

  function handleSubmit(event) { 
    event.preventDefault();
    console.log(project);
    //console.log(props.edit.value);
    if(project.name&&project.projectId&&project.authorized){
      
      axios.post("http://127.0.0.1:5000/api/newProject/" + project.name + "/" + project.projectId+ "/" +project.description + "/"+ project.authorized).then(
        res => {
          alert(res.data.msg)
          str = res.data.new
          
          if(str == true){
            props.onSubmit({
              id: project.projectId,
              name: project.projectName,
              authorized: project.authorized,
              description: project.description
              
            });
            str = false;
          }
          
        }
      )
      .then(
        axios.get("http://127.0.0.1:5000/api/projectsList").then(
        res => {
          console.log(res.data)
          props.setProjects(res.data)
        }
      )
      )
      
      refreshPage();
      setInput('');
      setProject({
        name: "",
        projectId: "",
        description: "",
        authorized: ""
      });
      
    }

    else{
      alert("Missing field");
    }

  };

  return (
    <form onSubmit={handleSubmit} className='project-form'>
      {props.edit ? (
        <>
          <input
            ref={inputRef}
            className='project-input edit'
            placeholder='Update your Project'
            value={input}
            onChange={handleChange}
            name='text'
           
          />
          <button onClick={handleSubmit} className='project-button edit'>
            Update Project
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Project Name'
            onChange={handleChange}
            value = {project.name}
            name='name'
            className='project-input'
            ref={inputRef}
          />
          <input
            placeholder='Project ID'
            onChange = {handleChange}
             value = {project.projectId}
            name='projectId'
            className = 'project-input'
            ref={inputRef}
          />
          <input
            placeholder='Description'
            onChange = {handleChange}
            value = {project.description}
            name='description'
            className = 'project-input'
            ref={inputRef}
          />
          <input
            placeholder='Authorized Users'
            onChange = {handleChange}
            value = {project.authorized}
            name='authorized'
            className = 'project-input'
            ref={inputRef}
          />

          <button color = "primary" onClick={handleSubmit} className='project-button'>
            New Project
          </button>
          
        </>
        
      )}
    </form>
  );
}

export default ProjectsForm;
