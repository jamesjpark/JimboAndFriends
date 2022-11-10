import React, { useState, useEffect } from 'react';

function Authorized(props) {
  const [authorized, setAuthorized] = useState(props.project.authorized)
  

  const [description, setDescription] = useState(props.project.description)

  useEffect(() => {
    setAuthorized(props.project.authorized);
  });
  useEffect(() => {
    setDescription(props.project.description);
  });

  return (
    <div >
      <div className = "authorized">
      Authorized Users: {authorized}
      </div>
      

      <div className = "description">
      Description: {description}
      </div>


    </div>
    
  )
}

export default Authorized