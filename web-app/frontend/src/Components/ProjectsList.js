import React, { useState } from 'react';
import ProjectsForm from './ProjectsForm';
import Projects from './Projects';
import { Link, useNavigate} from 'react-router-dom';


function ProjectsList() {
  const [projects, setProjects] = useState([]);

  const addProject = project => {
    if (!project.text || /^\s*$/.test(project.text)) {
      return;
    }

    const newProjects = [project, ...projects];

    setProjects(newProjects);
    console.log(...projects);
  };

  const updateProject = (projectId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setProjects(prev => prev.map(item => (item.id === projectId ? newValue : item)));
  };

  const removeProject = id => {
    const removedArr = [...projects].filter(project => project.id !== id);

    setProjects(removedArr);
  };

  

  return (
    <>
      <h1>
      Your Projects
      </h1>
      <ProjectsForm onSubmit={addProject} />
      <Projects
        projects={projects}
        removeProject={removeProject}
        updateProject={updateProject}
      />
    </>
  );
}

export default ProjectsList;
