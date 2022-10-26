import React from "react";
import "./Popup.css";

export const Popup = ({ text, closePopup, text2 }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <div> 
         {text2} {text} 
      </div>
      <div>
        <button onClick={closePopup}>Close X</button>
      </div>
      
     </div>
    </div>
  );
};