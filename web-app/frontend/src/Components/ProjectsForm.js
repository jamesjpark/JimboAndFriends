import React, { useState, useEffect, useRef } from 'react';
//import {Button} from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';

function ProjectsForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
      
    });
    setInput('');
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
            value={input}
            onChange={handleChange}
            name='text'
            className='project-input'
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
