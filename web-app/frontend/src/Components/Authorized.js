import React, { useState, useEffect } from 'react';
import axios from "axios";
function Authorized(props) {

  const [authorized, setAuthorized] = useState([])

  const [description, setDescription] = useState(props.project.description)

  function refreshPage() {
    window.location.reload(false);
  }

  // async function getAuthorized() {
  //   const au = await axios.get(process.env.REACT_APP_API+ "/api/getProject/" + props.project.projectID);
  //   setAuthorized(au.data.authorized);
  // }
  
  useEffect(() => {
      
      axios.get(process.env.REACT_APP_API+ "/api/getProject/" + props.project.projectID)
      .then(
        res => {
          setAuthorized(res.data.authorized);
          
        }

      )
  },[]);
  
  useEffect(() => {
    setDescription(props.project.description);
  });

  return (
    <div >
      <div className = "authorized">
      {/* Authorized Users: {authorized.map((user => <span>{ user }, </span>))} */}
      Authorized Users: {authorized.map(item => {
          return <li >{item}</li>;
        })}
      </div>
      

      <div className = "description">
      Description: {description}
      </div>


    </div>
    
  )
}

export default Authorized