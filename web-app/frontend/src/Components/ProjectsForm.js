import React, { useState, useEffect, useRef } from "react";
//import {Button} from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProjectsForm(props) {
  // const [inputName, setInputName] = useState(props.edit ? props.edit.name : '');
  function refreshPage() {
    window.location.reload(false);
  }


  const [project, setProject] = useState({
    name: props.edit?.name ?? "",
    projectId: props.edit?.id ?? "",
    description: props.edit?.description ?? "",
  });


  let str = false;
  const inputRef = useRef(null);


  function handleChange(event) {
    const { value, name } = event.target;
    console.log(name);
    setProject((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
    // setInput(value)
  }

  function handleUpdate(event) {
    event.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API +
          "api/updateProject/" +
          project.name +
          "/" +
          project.projectId +
          "/" +
          project.description
      )
      .then((res) => {
        console.log(res.data.msg);
        alert(res.data.msg);
        str = res.data.new;

        if (str == true) {
          props.onSubmit({
            text: project.name,
            projectName: project.name,
            projectID: project.projectId,
            description: project.description,
          });
          str = false;
        }
      });
    props.onSubmit({
      text: project.name,
      projectName: project.name,
      projectID: project.projectId,
      description: project.description,
    });
  }


  function handleSubmit(event) {
    event.preventDefault();
    if (project.name && project.projectId) {
      if (isNaN(project.projectId)) {
        alert("ProjectID is an Integer field");
      }
      axios
        .post(
          process.env.REACT_APP_API +
            "api/newProject/" +
            project.name +
            "/" +
            project.projectId +
            "/" +
            project.description
        )
        .then((res) => {
          console.log(res.data.msg);
          alert(res.data.msg);
          str = res.data.new;

          if (str == true) {
            props.onSubmit({
              text: props.edit.name,
              name: props.edit.name,
              id: props.edit.id,
              description: props.edit.description,
            });
            str = false;
          }
        })
        .then(
          axios
            .get(process.env.REACT_APP_API + "api/projectsList")
            .then((res) => {
              props.setProjects(res.data);
            })
        );

      refreshPage();
      setProject({
        name: "",
        projectId: "",
        description: "",
      });
    } else {
      alert("Missing field");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {props.edit ? (
        <>
          <input
            ref={inputRef}

            className="project-input edit"
            placeholder="Update your Project Name"
            value={project.name}
            onChange={handleChange}
            name="name"
          />
          <input
            ref={inputRef}
            className="project-input edit"
            placeholder="Update your Project Description"
            value={project.description}
            onChange={handleChange}
            name="description"
          />
          <button onClick={handleUpdate} className="project-button edit">

            Update Project
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Project Name"
            onChange={handleChange}
            value={project.name}
            name="name"
            className="project-input"
            ref={inputRef}
          />
          <input
            placeholder="Project ID"
            onChange={handleChange}
            value={project.projectId}
            name="projectId"
            className="project-input"
            ref={inputRef}
          />
          <input
            placeholder="Description"
            onChange={handleChange}
            value={project.description}
            name="description"
            className="project-input"
            ref={inputRef}
          />

          <button
            color="primary"
            onClick={handleSubmit}
            className="project-button"
          >
            New Project
          </button>
        </>
      )}
    </form>
  );
}

export default ProjectsForm;
