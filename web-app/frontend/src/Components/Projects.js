import React, { useState } from 'react';
import ProjectsForm from './ProjectsForm';
import HWSet from './HWSet'
import JoinForm from './JoinForm';
import Authorized from './Authorized';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { Link, useNavigate} from 'react-router-dom';

const Projects = ({ projects, removeProject, updateProject }) => {
  const [edit, setEdit] = useState({
    name: "",
    id: null,
    description: "",
    authorized: ""
    
  });
  

  const submitUpdate = name => {
    updateProject(edit.id, edit.name);
    setEdit({
      name: '',
      id: null,
      description: "",
      authorized: ""
      
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
      
      <Authorized project = {project}/>
      <HWSet project = {project}/>
      <JoinForm project = {project}/>
      
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeProject(project.id, project.text)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: project.id, name: project.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Projects;
