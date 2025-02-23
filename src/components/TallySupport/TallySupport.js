import React, { useState } from "react";
import Joyride, { STATUS } from 'react-joyride';
import Header from "./Header";
import Video from "./Video";
import Slides from "./Slides";
import Note from "./Note";
import Header2 from "../../Layouts/Headers/Header2";
import "../../Assests/CSS/TallySupport.css";
const ERPSetup = () => {
  const [showSlides, setShowSlides] = useState(true);
  // Add tutorial state
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTallySupportTutorial');
    return !hasSeenTutorial;
  });
  const steps = [
    {
      target: '.erp-setup',
      content: 'Welcome to Tally Support! Let me show you around.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.download-button-container',
      content: 'Download all necessary Tally files here.',
      placement: 'bottom',
    },
    {
      target: '.content-container',
      content: 'View our comprehensive tutorial content here.',
      placement: 'top',
    },
    {
      target: '.toggle-btn',
      content: 'Switch between slides and video tutorials using this button.',
      placement: 'top',
    }
  ];
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
      localStorage.setItem('hasSeenTallySupportTutorial', 'true');
    }
  };
  const TutorialButton = () => (
    <button style={{top:'0rem'}}
      className="tutorial-button"
      onClick={() => setRunTutorial(true)}
    >
      Show Tutorial
    </button>
    
  );
  
  <Joyride
        steps={steps}
        run={runTutorial}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#0077FF',
            backgroundColor: '#FFFFFF',
            textColor: '#333',
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: '#0077FF',
          },
          buttonBack: {
            marginRight: 10,
          },
          buttonSkip: {
            color: '#333',
          }
        }}
        locale={{
          last: "End Tutorial",
          skip: "Skip Tutorial",
          next: "Next",
          back: "Back",
        }}
      />
  // Import all images from Assests/images/slides
  const images = Array.from({ length: 17 }, (_, index) => {
    return require(`../../Assests/images/slides/${index + 1}.png`);
  });
  const toggleContent = () => {
    setShowSlides(!showSlides);
  };
  const handleDownload = () => {
    // Add your download logic here
  };
  return (
    <>
      <Header2 />
      
      {/* <Joyride
        steps={steps}
        run={runTutorial}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#0077FF',
            backgroundColor: '#FFFFFF',
            textColor: '#333',
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: '#0077FF',
          },
          buttonBack: {
            marginRight: 10,
          },
          buttonSkip: {
            color: '#333',
          }
        }}
        locale={{
          last: "End Tutorial",
          skip: "Skip Tutorial",
          next: "Next",
          back: "Back",
        }}
      /> */}
      <div className="erp-setup">
      <TutorialButton /><br></br>
       <br></br> <br></br><br></br><Header />
        <div className="download-button-container">
          <button
            onClick={handleDownload}
            className="download-btn"
          >
            Download Tally Requisites
          </button>
        </div>
        <div className="content-container">
          {showSlides ? <Slides images={images} /> : <Video />}
          <button
            onClick={toggleContent}
            className="toggle-btn"
          >
            {showSlides ? 'Show Tutorial Video' : 'Show Tutorial Slides'}
          </button>
        </div>
        <Note />
      </div>
    </>
  );
};
export default ERPSetup;