import React, { useState, useEffect } from "react";
import ProjectsForm from "./ProjectsForm";
import Projects from "./Projects";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get(process.env.REACT_APP_API + "api/projectsList")
      .then((res) => {
        setProjects(res.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("PLEASE LOG IN");
      });
  }, []);

  const addProject = (project) => {
    if (!project.name || /^\s*$/.test(project.name)) {
      return;
    }
    const newProjects = [project, ...projects];
    refreshPage();
    setProjects(newProjects);
  };

  const updateProject = (projectId, newValue) => {
    if (!newValue.projectName || /^\s*$/.test(newValue.projectName)) {
      return;
    }
    setProjects((prev) =>
      prev.map((item) => (item.projectID === projectId ? newValue : item))
    );
  };

  function removeProject(id, name) {
    axios
      .post(process.env.REACT_APP_API + "api/deleteProject/" + name + "/" + id)
      .then((res) => {
        alert(res.data.msg);
      });

    // refreshPage();
    const removedArr = [...projects].filter((project) => project.id !== id);
    setProjects(removedArr);
  }

  return (
    <>
      <h1>PROJECTS</h1>
      <ProjectsForm onSubmit={addProject} setProjects={setProjects} />

      <Projects
        projects={projects}
        removeProject={removeProject}
        updateProject={updateProject}
      />
    </>
  );
}

export default ProjectsList;
