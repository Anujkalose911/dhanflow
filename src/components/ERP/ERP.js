import React, { useState } from "react";
import Joyride, { STATUS } from 'react-joyride';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Header1 from "../../Layouts/Headers/Header1";
import Axios from "axios";
import "../../Assests/CSS/ERP.css";
import Swal from "sweetalert2";
import { useAuth } from '../../context/AuthContext';

function ERP() {
  const [erpName, setErpName] = useState("");
  const [industry, setIndustry] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  // Add tutorial state
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenERPTutorial');
    return !hasSeenTutorial;
  });

  const steps = [
    {
      target: '.ERP-body',
      content: 'Welcome! Let\'s set up your ERP system.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#ERP',
      content: 'Select your ERP system from the dropdown menu.',
      placement: 'bottom',
    },
    {
      target: '.ERP-input',
      content: 'Enter your industry details here.',
      placement: 'bottom',
    },
    {
      target: '.ERP-button',
      content: 'Click here to submit your ERP details and get started!',
      placement: 'bottom',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
      localStorage.setItem('hasSeenERPTutorial', 'true');
    }
  };

  const TutorialButton = () => (
    <button  
      className="tutorial-button"
      onClick={() => setRunTutorial(true)}
    >
      Show Tutorial
    </button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!erpName || erpName === "Select ERP") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select an ERP'
      });
      return;
    }

    if (!industry.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter your industry'
      });
      return;
    }

    try {
      // Get user data from localStorage and parse it properly
      const userDataStr = localStorage.getItem('user_data');
      if (!userDataStr) {
        throw new Error('User data not found');
      }

      
      // Clean and parse the user data
      let userData;
      try {
        // Remove all extra quotes and escape characters
        const cleanedStr = userDataStr
          .replace(/^["']+|["']+$/g, '')  // Remove any quotes at start/end
          .replace(/\\"/g, '"');          // Replace escaped quotes with regular quotes
        
        userData = JSON.parse(cleanedStr);
        
        
      } catch (e) {
        console.error('Parsing error:', e);
        throw new Error('Failed to parse user data');
      }

      // Check for msme_id or tenant_id
      const tenantId = userData.tenant_id || userData.msme_id;
      if (!tenantId) {
        throw new Error('Tenant ID or MSME ID not found in user data');
      }

      const response = await Axios.post(
        "https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/erp/create",
        {
          tenant_id: tenantId,
          erp_name: erpName,
          industry: industry.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );

      

      if (response.data.success) {
        localStorage.setItem('erp_id', response.data.erp_id);
        setIsAuthenticated(true);
        
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'ERP details submitted successfully'
        });

        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error instanceof SyntaxError) {
        console.error('JSON Parse Error. User data string:', localStorage.getItem('user_data'));
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || error.response?.data?.error || 'Failed to submit ERP details'
      });
    }
  };

  return (
    <section>
      <Header1 />
      <TutorialButton />
      
      <Joyride
        steps={steps}
        run={runTutorial}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: 'rgb(0, 179, 255)',
            backgroundColor: '#ffffff',
            textColor: '#333',
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: 'rgb(0, 179, 255)',
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

      <Card className="ERP-body">
        <Card.Body>
          <Card.Title className="ERP-Head">ERP DETAILS:</Card.Title>
          <label htmlFor="ERP" className="select-label">
            <b>Choose Your ERP :</b>{" "}
          </label>

          <select
            name="ERP"
            id="ERP"
            value={erpName}
            onChange={(e) => setErpName(e.target.value)}
            className="ERP-select"
          >
            <option>Select ERP</option>
            <option value="Tally">Tally</option>
            <option value="Zoho CRM">ZOHO CRM</option>
          </select>
          <div>
            <input
              type="text"
              placeholder="Industry"
              className="ERP-input"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>
          <Button
            variant="primary"
            type="submit"
            className="ERP-button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Card.Body>
      </Card>
    </section>
  );
}

export default ERP;
