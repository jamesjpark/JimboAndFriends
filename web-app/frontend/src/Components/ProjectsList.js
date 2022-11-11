import React, { useState, useEffect } from 'react';
import ProjectsForm from './ProjectsForm';
import Projects from './Projects';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }
  
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/projectsList").then(
        res => {
          console.log(res.data)
          setProjects(res.data)
        }
      )
    
  }, []);

  const addProject = project => {
    if (!project.name || /^\s*$/.test(project.name)) {
      return;
    }
    const newProjects = [project, ...projects];
    refreshPage()
    setProjects(newProjects);
    console.log(...projects);
  };

  const updateProject = (projectId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setProjects(prev => prev.map(item => (item.id === projectId ? newValue : item)));
  };


  function removeProject(id, name) { 
    axios.post("http://127.0.0.1:5000/api/deleteProject/" + name+ "/"+ id ).then(
        res => {
          alert(res.data.msg)
          
        }
    )

    refreshPage();
    const removedArr = [...projects].filter(project => project.id !== id);
    setProjects(removedArr);
  };

  

  return (
    <>
      <h1>
      PROJECTS
      </h1>
      <ProjectsForm 
        onSubmit={addProject} 
        setProjects = {setProjects}
        />
        
      <Projects
        projects={projects}
        removeProject={removeProject}
        updateProject={updateProject}
      />
    </>
  );
}

export default ProjectsList;
