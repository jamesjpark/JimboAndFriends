import React, { useState } from 'react';
import ProjectsForm from './ProjectsForm';
import Projects from './Projects';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  const addProject = project => {
    if (!project.name || /^\s*$/.test(project.name)) {
      return;
    }

    const newProjects = [project, ...projects];

    setProjects(newProjects);
    console.log(...projects);
  };

  const updateProject = (projectId, newValue) => {
    if (!newValue.name || /^\s*$/.test(newValue.name)) {
      return;
    }

    setProjects(prev => prev.map(item => (item.id === projectId ? newValue : item)));
  };


  function removeProject(id, name) { 
    axios.get("http://127.0.0.1:5000/api/deleteProject/" + name+ "/"+ id ).then(
        res => {
          alert(res.data.msg)
          
        }
      )
    const removedArr = [...projects].filter(project => project.id !== id);
    setProjects(removedArr);
  };

  

  return (
    <>
      <h1>
      PROJECTS
      </h1>
      <ProjectsForm 
        onSubmit={addProject} />
      <Projects
        projects={projects}
        removeProject={removeProject}
        updateProject={updateProject}
      />
    </>
  );
}

export default ProjectsList;
