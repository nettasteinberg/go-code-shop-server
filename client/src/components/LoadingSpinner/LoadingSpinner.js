import React from "react";
import "./LoadingSpinner.css";

export const LoadingSpinner = () => {
    return (
        <div className="loader-container">
            <p>Loading data, please wait</p>
      	    <div className="spinner"></div>
        </div>
    )
}