import React, { useState } from 'react';
import ProjectsForm from './ProjectsForm';
import HWSet from './HWSet'
import JoinForm from './JoinForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { Link, useNavigate} from 'react-router-dom';

const Projects = ({ projects, removeProject, updateProject }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });


  const [joinText, setJoinText] = useState(true);

  function handleJoin(){
      
    setJoinText(!joinText);
      
  }

  const submitUpdate = value => {
    updateProject(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <ProjectsForm edit={edit} onSubmit={submitUpdate} />;
  }

  return projects.map((project, index) => (
    
    <div
      className= {'project-row'}
      key={index}
    >
     
      <div key={project.id} className = "Project-Name">
        {project.text}
      </div>
      
      <HWSet project = {project}/>
      <JoinForm project = {project}/>
      
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeProject(project.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: project.id, value: project.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Projects;
