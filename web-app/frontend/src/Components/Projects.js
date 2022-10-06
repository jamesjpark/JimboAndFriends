import { useState, useNavigate} from 'react'
import axios from "axios";



function Projects(props) {
  const [projects, setProjects] = useState(null)
  
  
  function getData() {
    axios({
      method: "GET",
      url: "/projects",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    
    .then((response) => {
      const res =response.data
      res.access_token && props.setToken(res.access_token)
      setProjects(({
        projects_name: res.name,
        about: res.about}))

    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    
  }

  return (
    <div className="Projects">

    <p>To get your projects details: </p>
    <button onClick={getData}>Click me</button>
        {projects && <div>
              <p>Project name: {projects.projects_name}</p>
              <p>About me: {projects.about}</p>
            </div>
        }

    </div>
  );
}

export default Projects