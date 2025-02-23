import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import google from "../../Assests/images/gl icon.png";
import Header1 from "../../Layouts/Headers/Header1";
import "aos/dist/aos.css";
import "../../Assests/CSS/SignIn.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Aos from "aos";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-hot-toast';
import { FaRobot, FaHandshake, FaClock } from 'react-icons/fa';
import AnimatedNumber from '../AnimatedNumber';


function SignIn() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification
  const { setIsAuthenticated } = useAuth();
  const [sessionId, setSessionId] = useState(null);  // Add this state

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateOTP = () => {
    const otp = getRandomNumber(100000, 999999);
    setGeneratedOtp(otp);
    return otp;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
        const response = await axiosInstance.post(
            "/signin-send-verification",
            { phoneNumber },
            { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.success) {
            setMessage("OTP sent successfully!");
            setOtpSent(true);
            setSessionId(response.data.session_id);  // Store the session ID
            startTimer();
        } else {
            setErrorMessage(response.data.message || "Failed to send OTP.");
        }
    } catch (error) {
        if (error.response?.status === 404 && error.response?.data?.error_type === 'not_registered') {
            setErrorMessage("This phone number is not registered. Please sign up first.");
            Swal.fire({
                icon: 'info',
                title: 'Not Registered',
                text: 'This phone number is not registered. Would you like to sign up?',
                showCancelButton: true,
                confirmButtonText: 'Sign Up',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup');
                }
            });
        } else if (error.response?.status === 403 && error.response?.data?.error_type === 'inactive') {
            setErrorMessage("Your account is not active. Please contact your owner to activate your account.");
            Swal.fire({
                icon: 'warning',
                title: 'Account Inactive',
                text: 'Your account is not active. Please contact your owner to activate your account.',
                confirmButtonText: 'OK'
            });
        } else {
            setErrorMessage(error.response?.data?.message || "An error occurred during sign in");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || "An error occurred during sign in"
            });
        }
    }

    setLoading(false);
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();

    try {
        const response = await axiosInstance.post('/signin-verify-code', {
            phoneNumber,
            code: otp,
            session_id: sessionId  // Include the session ID here
        });

        if (response.data.success) {
            const { access_token, refresh_token, user_data } = response.data;

            if (!access_token || !refresh_token) {
                throw new Error('Missing tokens');
            }

            const isValid = await setIsAuthenticated(true, access_token);

            if (isValid) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                if (user_data) {
                    localStorage.setItem('user_data', JSON.stringify(user_data));
                }

                toast.success('Successfully logged in!');
                navigate('/home', { replace: true });
            } else {
                throw new Error('Token verification failed');
            }
        } else {
            toast.error(response.data.message || 'Verification failed');
        }
    } catch (error) {
        console.error('Verification error:', error);
        toast.error(error.response?.data?.message || 'Authentication failed');

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
    }
  };

  useEffect(() => {
    if (otpVerified) {
      
      navigate("/home"); // Redirect to home page if OTP is verified
    }
  }, [otpVerified, navigate]);

  const startTimer = () => {
    setTimer(30);
    setTimerActive(true);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendOtp = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
        const response = await axios.post(
            "https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/signin-send-verification",  // Updated endpoint
            {
                phoneNumber
            },
            {
                withCredentials: true  // Added this for session support
            }
        );

        if (response.data.success) {
            setMessage("OTP resent successfully!");
            setSessionId(response.data.session_id);  // Update session ID for new OTP
            startTimer();
        } else {
            setErrorMessage("Failed to resend OTP.");
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error resending OTP.");
        console.error(error);
    }
  };

  const handleGoogleSignIn = () => {
    sessionStorage.clear();
    localStorage.clear();
    const timestamp = new Date().getTime();
    window.location.href = `https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/glogin?t=${timestamp}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const userType = params.get('userType');
    const error = params.get('error');

    if (userId && userType) {
      // Store user info in localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('userType', userType);
      
      // Redirect to dashboard
      navigate('/erp');
    } else if (error) {
      switch(error) {
        case 'no_state':
          Swal.fire({
            icon: 'error',
            title: 'Session Expired',
            text: 'Please try signing in again.'
          });
          break;
        case 'state_mismatch':
          Swal.fire({
            icon: 'error',
            title: 'Security Verification Failed',
            text: 'Please try signing in again.'
          });
          break;
        case 'authentication_failed':
          Swal.fire({
            icon: 'error',
            title: 'Authentication Failed',
            text: 'Unable to sign in with Google. Please try again.'
          });
          break;
        default:
          Swal.fire({
            icon: 'error',
            title: 'Sign In Error',
            text: 'An error occurred during sign in. Please try again.'
          });
      }
    }
  }, [navigate]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);


  return (
    <section>
      <div className="bgcolor">
        <Header1 />
        <h1 className="hindi-text" data-aos="fade-up">
          <span>धन</span>
        </h1>

        {/* Left side steps */}
        
        <div className="steps-section">
        <div className="step-item">
            <div className="step-number">
             
              <AnimatedNumber end={10} suffix=" Taps"  duration={1000} />
             
            </div>
            <div className="step-content">

              <p style={{fontSize: "20px", textAlign: "justify"}}> For Auto-syncing Ledgers via Whatsapp</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">
              <AnimatedNumber end={3} suffix="x Faster" duration={800} />
            </div>
            <div className="step-content">

              
              <p style={{fontSize: "20px", textAlign: "left"}}>Faster Onboarding with seamless ERP integration</p>
            </div>
          </div>

          <div className="step-item" >

            <div className="step-number">
              <AnimatedNumber end={80} suffix="% Time Savings" duration={800} />
            </div>
            <div className="step-content">
              
              <p style={{fontSize: "20px", textAlign: "left"}}>Time <br/ >Savings <br/> with Automated Documentation</p>
            </div>
          </div>
        </div>

        {/* Sign in card */}
                
        <Card className="signin-body" data-aos="fade-down">
          <h1 className="signin-body-h1">Welcome Back!</h1>
          <p className="signin-subtitle">Please enter your details to sign-in.</p>
          
          <Card.Body>
            <div className="signinbody">
              
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <div className="custom-phone-input">
                      <span className="country-code">+91</span>
                      <Form.Control
                        type="tel"
                        placeholder="Enter Your Phone Number"
                        value={phoneNumber.replace('+91', '')}
                        onChange={(e) => setPhoneNumber('+91' + e.target.value)}
                        className="phone-input-field"
                        maxLength="10"
                        required
                      />
                    </div>
                  </Form.Group>
                </Row>

                {errorMessage && (
                  <p
                    className="error-message"
                    style={{ color: "red", marginLeft: "20px" }}
                  >
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  className="Buttons1"
                  disabled={loading || timerActive}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </Form>

              {otpSent && (
                <Form onSubmit={handleOtpVerification}>
                  <Form.Group className="mt-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter the OTP sent to your phone"
                      required
                      style={{ width: "80%", margin: "auto" }}
                    />
                  </Form.Group>
                  
                  {otpErrorMessage && (
                    <p style={{ color: "red", marginLeft: "20px", marginTop: "10px" }}>
                      {otpErrorMessage}
                    </p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="Buttons1"
                    style={{ marginTop: "15px" }}
                  >
                    Verify OTP
                  </Button>

                  <div style={{ marginTop: "10px" }}>
                    {!timerActive ? (
                      <Button 
                        variant="link" 
                        onClick={resendOtp}
                        className="resend-otp"
                      >
                        Resend OTP
                      </Button>
                    ) : (
                      <p>Resend OTP in {timer} seconds</p>
                    )}
                  </div>
                </Form>
              )}

              <div className="google-signin">
                <Button onClick={handleGoogleSignIn} className="Buttons1">
                  <img
                    src={google}
                    className="Signin-gl-icon"
                    alt="Google icon"
                  />
                  Sign-in with Google
                </Button>
              </div>

              <div className="account1">
                <h6>
                  Create an Account?  <br></br><Link to="/signup">Sign-Up</Link>
                </h6>
              </div>
            </div>
          </Card.Body>
          
        </Card>
      </div>
    </section>
  );
}

export default SignIn;