import React, { useState } from "react";
import Joyride, { STATUS } from 'react-joyride';
import Header2 from "../../Layouts/Headers/Header2";
import WhatsappBot from "../../components/Whatsappbot/Whatsappbot";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios";
import "../../Assests/CSS/Home.css";
function Home() {
  const navigate = useNavigate();
  // Add tutorial state
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenHomeTutorial');
    return !hasSeenTutorial;
  });
  const steps = [
    {
      target: '.Home-content',
      content: 'Welcome to our Invoice Management System! Let me show you around.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.Home-video-container',
      content: 'Watch this introductory video to learn how to use our system effectively.',
      placement: 'bottom',
    },
    {
      target: '.button-common',
      content: 'Download your cashflow reports here. Only available for admin, accountant, and manager roles.',
      placement: 'top',
    },
    {
      target: '.whatsapp-icon',
      content: 'Need help? Click here to start chatting with our support team!',
      placement: 'left',
    }
  ];
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
      localStorage.setItem('hasSeenHomeTutorial', 'true');
    }
  };
  const TutorialButton = () => (
    <div className="tutorial-button-wrapper">
      <button style={{top:'0rem'}}
        className="tutorial-button"
        onClick={() => setRunTutorial(true)}
      >
        Show Tutorial
      </button>
    </div>
  );
  const handleDownloadCashflowReport = async () => {
    // Get access token from localStorage
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      toast.error('Please login to download reports');
      navigate('/signin');
      return;
    }
    try {
      // Decode the token to check role
      const tokenParts = access_token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      if (!['admin', 'accountant', 'manager'].includes(payload.role.toLowerCase())) {
        toast.error('You do not have permission to download reports');
        return;
      }
      // If role check passes, download the report
      const response = await axios.get('/download_report', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        responseType: 'blob' // Important for downloading files
      });
      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = `Cashflow_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error downloading report:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        navigate('/signin');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to download reports');
      } else {
        toast.error('Error downloading report. Please try again.');
      }
    }
  };
  return (
    <section>
      <Header2 />
      <div className="Home-content">
        <TutorialButton /><br></br>
        <p className="Home-p"><br></br><br></br>
          Access the details of your invoices with just a click.
        </p>
        <p className="Home-p">Watch the video below to learn how it works:</p>
        <div className="Home-video-container">
          <iframe
            src="https://drive.google.com/file/d/15pEgWedqPb32V8wNUlQMXZ9xIRso-K8o/preview"
            allow="autoplay"
            title="Product Intro Video"
            className="Home-video"
          ></iframe>
        </div>
        <p className="Home-Download-Message">
          <p>
            Start using our product right away by clicking on
            <strong>'Start Chatting'</strong>
          </p>
        </p>
        <button className="button-common" onClick={handleDownloadCashflowReport}>
          Download Cashflow Reports
        </button>
      </div>
      <div className="whatsapp-icon">
        <WhatsappBot />
      </div>
      <Joyride
        steps={steps}
        run={runTutorial}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: 'rgb(13, 100, 206)',
            backgroundColor: '#FFFFFF',
            textColor: '#333',
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: 'rgb(13, 100, 206)',
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
    </section>
  );
}
export default Home;






