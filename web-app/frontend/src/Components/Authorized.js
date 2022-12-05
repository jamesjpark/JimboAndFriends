import React, { useState, useEffect } from 'react';
import axios from "axios";
function Authorized(props) {

  const [authorized, setAuthorized] = useState([''])

  const [description, setDescription] = useState(props.project.description)

  async function getAuthorized() {
    const au = await axios.get(process.env.REACT_APP_API+ "/api/getAuthorized/" + props.project.projectID);
    setAuthorized(au.data.authorized);
  }
  
  useEffect(() => {
      getAuthorized();
      // axios.get(process.env.REACT_APP_API+ "/api/getAuthorized/" + props.project.projectID)
      // .then(
      //   res => {
      //     setAuthorized(res.data.authorized);
          
      //   }

      // )
  },[authorized]);
  
  useEffect(() => {
    setDescription(props.project.description);
  });

  return (
    <div >
      <div className = "authorized">
      Authorized Users: {authorized.map((user => <span>{ user }, </span>))}
      </div>
      

      <div className = "description">
      Description: {description}
      </div>


    </div>
    
  )
}

export default Authorized