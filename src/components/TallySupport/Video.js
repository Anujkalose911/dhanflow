import React from "react";
import "../../Assests/CSS/Video.css";

const Video = () => {
  return (
    <div className="video-container">
      <video 
        controls
        className="tutorial-video"
        src={require("../../Assests/images/Tally_erp_setup.mp4")}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;