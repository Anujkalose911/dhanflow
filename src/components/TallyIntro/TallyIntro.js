import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header1 from "../../Layouts/Headers/Header1";
import "../../Assests/CSS/TallyIntro.css";
import { Link } from "react-router-dom";
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-hot-toast';

function TallyIntro() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axiosInstance.get('/check-auth');
        if (response.data.success) {
          const userRole = response.data.user_data.role.toLowerCase();
          if (userRole === 'auditor' || userRole === 'manager') {
            toast.error(`Access denied. ${response.data.user_data.role}s cannot access ERP setup.`);
            navigate('/home');
          } else {
            setIsAuthorized(true);
          }
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        navigate('/home');
      }
    };

    checkAuthorization();
  }, [navigate]);

  if (!isAuthorized) {
    return null; // Don't render anything while checking authorization
  }

  return (
    <section>
      <Header1 />
      <div className="TallyIntro-content">
        <p className="Tally-p">
          Hi! Welcome to our product, Thanks for choosing Liquidmind.AI for your
          Invoice Processing
        </p>

        <p className="Tally-Download-Message">
          <strong>NOTE :</strong> If you are using our product for the first
          time, make sure you download and run the EXE_FILE on your system.
        </p>

        <div className="video-container">
          <iframe
            src="https://drive.google.com/file/d/15pEgWedqPb32V8wNUlQMXZ9xIRso-K8o/preview"
            allow="autoplay"
            title="Product Intro Video"
            className="Tally-video"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
            referrerPolicy="strict-origin"
          ></iframe>
        </div>

        <button className="Tally-login">
          <Link to="/signin">CLICK HERE TO LOGIN</Link>
        </button>
      </div>
    </section>
  );
}

export default TallyIntro;
