import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import google from "../../Assests/images/gl icon.png";
import Header1 from "../../Layouts/Headers/Header1";
import "../../Assests/CSS/SignUp.css";
import Aos from "aos";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { useAuth } from '../../context/AuthContext';
import { FaRobot, FaHandshake, FaClock } from 'react-icons/fa';

axios.defaults.withCredentials = true;

const ROUTES = {
    OWNER: '/erp',
    MSME: '/home'
};

function SignUp() {
  const [validated, setValidated] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    // Owner fields
    Owner_Name: "",
    Owner_LASTNAME: "",
    Owner_Email: "",
    Owner_Phone: "",
    Aadhar: "",
    GST: "",
    PAN: "",
    // MSME fields
    MSME_FIRSTNAME: "",
    MSME_LASTNAME: "",
    MSME_PHONE: "",
    MSME_EMAIL: "",
    MSME_PROFILE_PICTURE: null,
  });

  const [errors, setErrors] = useState({});
  const [ownerPhone, setOwnerPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerData, setOwnerData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handlePhoneChange = (value, fieldName = "Owner_Phone") => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSendVerificationCode = async () => {
    try {
      setVerificationError('');
      
      const response = await axios.post('https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/send-verification', {
        phoneNumber: ownerPhone
      });
      
      if (response.data.success) {
        setShowVerificationInput(true);
        setOwnerName(response.data.owner_name);
        Swal.fire({
          icon: 'success',
          title: 'Verification Code Sent',
          text: `Code sent to owner: ${response.data.owner_name}`
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send verification code';
      setVerificationError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    }
  };

  const handleVerifyCode = async () => {
    try {
      setVerificationError('');
      
      const response = await axios.post('https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/verify-code', {
        phoneNumber: ownerPhone,
        code: verificationCode
      });
      
      if (response.data.success) {
        setIsPhoneVerified(true);
        setOwnerData(response.data.owner_data);
        Swal.fire({
          icon: 'success',
          title: 'Verified!',
          text: 'Phone number verified successfully'
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid verification code';
      setVerificationError(errorMessage);
      if (errorMessage.includes('Maximum verification attempts exceeded')) {
        setShowVerificationInput(false);
        setVerificationCode('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setValidated(true);
    setErrors({});

    if (!isOwner && !isPhoneVerified) {
      
      Swal.fire({
        icon: 'error',
        title: 'Verification Required',
        text: 'Please verify the owner\'s phone number before signing up'
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("isOwner", isOwner.toString());
      

      if (isOwner) {
        
        // Append owner data
        formDataToSend.append("Owner_Name", formData.Owner_Name);
        formDataToSend.append("Owner_LASTNAME", formData.Owner_LASTNAME);
        formDataToSend.append("Owner_Email", formData.Owner_Email);
        formDataToSend.append("Owner_Phone", formData.Owner_Phone);
        formDataToSend.append("Aadhar", formData.Aadhar);
        formDataToSend.append("GST", formData.GST);
        formDataToSend.append("PAN", formData.PAN);
      } else {
        
        // Append MSME data
        formDataToSend.append("MSME_FIRSTNAME", formData.MSME_FIRSTNAME);
        formDataToSend.append("MSME_LASTNAME", formData.MSME_LASTNAME);
        formDataToSend.append("MSME_EMAIL", formData.MSME_EMAIL);
        formDataToSend.append("MSME_PHONE", formData.MSME_PHONE);
        formDataToSend.append("ownerPhone", ownerPhone.replace(/\D/g, '')); 
        if (formData.MSME_PROFILE_PICTURE) {
          formDataToSend.append(
            "MSME_PROFILE_PICTURE",
            formData.MSME_PROFILE_PICTURE
          );
        }
      }

      //console.log("4. Making signup request to backend...");
      const response = await axios.post(
        "https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/merchantRoutes/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          maxRedirects: 0 
        }
      );

      if (response.data.success) {
        if (response.data.account_status === 'InActive') {
          // For MSME users who need activation
          await Swal.fire({
            icon: 'info',
            title: 'Account Created',
            text: 'Your account has been created successfully. Please wait for owner approval to activate your account.',
            confirmButtonText: 'OK'
          });
          navigate('/signin');  // Redirect to signin instead of home
        } else {
          // For owner accounts which are active by default
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          localStorage.setItem('user_data', response.data.user_data);
          
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Account created successfully!'
          });
          
          setIsAuthenticated(true);
          navigate('/erp');
        }
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      console.error("❌ Signup error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: error.response?.data?.error || 
              error.response?.data?.message || 
              "An unexpected error occurred during signup.",
      });
    }
  };

  const handleGoogleSignIn = () => {
    sessionStorage.clear();
    localStorage.clear();
    const timestamp = new Date().getTime();
    window.location.href = `https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/glogin?t=${timestamp}`;
  };
  

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const isGoogle = params.get('isGoogle');
    
    if (isGoogle) {
        // Get the first and last name from URL params
        const firstName = params.get('firstName') || '';
        const lastName = params.get('lastName') || '';
        const email = params.get('email') || '';
        const picture = params.get('picture') || null;

        // Update form data based on owner/non-owner status
        setFormData(prev => ({
            ...prev,
            // Owner fields
            Owner_Name: firstName,
            Owner_LASTNAME: lastName,
            Owner_Email: email,
            // MSME fields
            MSME_FIRSTNAME: firstName,
            MSME_LASTNAME: lastName,
            MSME_EMAIL: email,
            MSME_PROFILE_PICTURE: picture
        }));

        // Make email field readonly since it's from Google
        const ownerEmailInput = document.querySelector('input[name="Owner_Email"]');
        if (ownerEmailInput) {
            ownerEmailInput.readOnly = true;
        }
        const msmeEmailInput = document.querySelector('input[name="MSME_EMAIL"]');
        if (msmeEmailInput) {
            msmeEmailInput.readOnly = true;
        }
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Check for error parameters
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    
    if (error) {
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
  }, []);

  const handleOwnershipChange = (isOwner) => {
    setIsOwner(isOwner);
    
    // Preserve the Google data when switching between owner and non-owner
    const params = new URLSearchParams(window.location.search);
    const isGoogle = params.get('isGoogle');
    
    if (isGoogle) {
        const firstName = params.get('firstName') || '';
        const lastName = params.get('lastName') || '';
        const email = params.get('email') || '';
        
        if (isOwner) {
            setFormData(prev => ({
                ...prev,
                Owner_Name: firstName,
                Owner_LASTNAME: lastName,
                Owner_Email: email,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                MSME_FIRSTNAME: firstName,
                MSME_LASTNAME: lastName,
                MSME_EMAIL: email,
            }));
        }
    }
  };

  return (
    <section>
      <div className="bgcolor">
        <Header1 />
        <h1 className="hindi-text" data-aos="fade-up">
          <span>धन</span>
        </h1>

        <div className="mobile-text-wrapper">
          <p className="mobile-text-content">
            Whatsapp based AI conversational agent which gets merchant accounts updated within 10 clicks/taps
          </p>
        </div>

        <div className="side-para desktop-only" data-aos="fade-up">
          <p>
            <strong><FaRobot /> AI Conversational Agent</strong> <br></br>
            <span style={{ fontWeight: 'normal', fontSize: '18px' }} className="mobile-text">
              Auto sync ledgers via WhatsApp in just 10 taps—fast, simple, and automated.<br></br>
            </span>
            <strong><FaHandshake /> Ease of doing Business</strong><br></br>
            <span style={{ fontWeight: 'normal', fontSize: '18px' }}className="mobile-text">
              Minimal learning curve, no hassle. Effortless accounting with easy ERP integration.<br></br>
            </span>
            <strong><FaClock /> Automate & Save Time</strong><br></br>
            <span style={{ fontWeight: 'normal', fontSize: '18px' }}className="mobile-text">
              Reduce manual work and save up to 80% of your time with smart automation.
            </span>
          </p>
        </div>
        <Card className="signup-body" data-aos="fade-up">
          <h1 className="signup-body-h1">SignUp</h1>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-6">
                {/* Common Fields */}
                <Form.Group as={Col} md="8" className="mb-3">
                  <div className="ownership-question" style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: '0 3px 0 0' }}>Are you the Owner?</p>
                    <label style={{ marginRight: '10px' }}>
                      <input
                        type="radio"
                        name="owner"
                        value="yes"
                        onChange={() => handleOwnershipChange(true)}
                        checked={isOwner}
                        required
                        className="ownership-question-button"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="owner"
                        value="no"
                        onChange={() => handleOwnershipChange(false)}
                        checked={!isOwner}
                        required
                        className="ownership-question-button"
                      />
                      No
                    </label>
                  </div>
                </Form.Group>

                {isOwner ? (
                  // Owner Fields
                  <>
                    <Form.Group as={Col} md="15" controlId="validationCustom01" className="mb-3">
                      <Form.Control
                        required
                        type="text"
                        placeholder="First Name"
                        name="Owner_Name"
                        value={formData.Owner_Name}
                        onChange={handleChange}
                        className="InputGroup1"
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="15" controlId="validationCustom02" className="mb-3">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last Name"
                        name="Owner_LASTNAME"
                        value={formData.Owner_LASTNAME}
                        onChange={handleChange}
                        className="InputGroup1"
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="15" controlId="validationCustom03">
                      <Form.Control
                        required
                        type="email"
                        placeholder="E-mail"
                        name="Owner_Email"
                        value={formData.Owner_Email}
                        onChange={handleChange}
                        className="InputGroup1"
                        readOnly={new URLSearchParams(window.location.search).get('isGoogle') === 'true'}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="13" controlId="validationCustom04">
                      <PhoneInput
                        international
                        placeholder="Phone Number"
                        value={formData.Owner_Phone}
                        onChange={(value) =>
                          handlePhoneChange(value, "Owner_Phone")
                        }
                        defaultCountry="IN"
                        className="InputGroup1"
                        required
                      />
                    </Form.Group>
                    <div style={{ marginBottom: '10px' }}></div>

                    <Form.Group as={Col} md="15">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Aadhar"
                        name="Aadhar"
                        value={formData.Aadhar}
                        onChange={handleChange}
                        className={`InputGroup1 ${
                          errors.Aadhar ? "is-invalid" : ""
                        }`}
                        maxLength={12}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Aadhar}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div style={{ marginBottom: '10px' }}></div>

                    <Form.Group as={Col} md="15">
                      <Form.Control
                        required
                        type="text"
                        placeholder="GST"
                        name="GST"
                        value={formData.GST}
                        onChange={handleChange}
                        className={`InputGroup1 ${
                          errors.GST ? "is-invalid" : ""
                        }`}
                        maxLength={15}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.GST}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div style={{ marginBottom: '10px' }}></div>

                    <Form.Group as={Col} md="15">
                      <Form.Control
                        required
                        type="text"
                        placeholder="PAN"
                        name="PAN"
                        value={formData.PAN}
                        onChange={handleChange}
                        className={`InputGroup1 ${
                          errors.PAN ? "is-invalid" : ""
                        }`}
                        maxLength={10}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.PAN}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : (
                  // MSME Fields
                  <>
                    <Form.Group as={Col} md="15" controlId="validationCustom01" className="mb-3">
                      <Form.Control
                        required
                        type="text"
                        placeholder="First Name"
                        name="MSME_FIRSTNAME"
                        value={formData.MSME_FIRSTNAME}
                        onChange={handleChange}
                        className={`InputGroup1 ${
                          errors.MSME_FIRSTNAME ? "is-invalid" : ""
                        }`}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.MSME_FIRSTNAME}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="15" controlId="validationCustom02" className="mb-3">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last Name"
                        name="MSME_LASTNAME"
                        value={formData.MSME_LASTNAME}
                        onChange={handleChange}
                        className={`InputGroup1 ${
                          errors.MSME_LASTNAME ? "is-invalid" : ""
                        }`}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.MSME_LASTNAME}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="15">
                      <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name="MSME_EMAIL"
                        value={formData.MSME_EMAIL}
                        onChange={handleChange}
                        readOnly={new URLSearchParams(window.location.search).get('isGoogle') === 'true'}
                        className={`InputGroup1 ${errors.MSME_EMAIL ? "is-invalid" : ""}`}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.MSME_EMAIL}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="14">
                      <div className="custom-phone-input">
                        <span className="country-code">+91</span>
                        <Form.Control
                          type="tel"
                          placeholder="Enter Your Phone Number"
                          value={formData[isOwner ? "Owner_Phone" : "MSME_PHONE"].replace('+91', '')}
                          onChange={(e) => handlePhoneChange('+91' + e.target.value)}
                          className="phone-input-field"
                          maxLength="10"
                          required
                        />
                      </div>
                    </Form.Group>

                    {!isOwner && (
                      <Form.Group as={Col} md="14">
                        <div className="custom-phone-input">
                          <span className="country-code">+91</span>
                          <Form.Control
                            type="tel"
                            placeholder="Enter Owner's Phone Number"
                            value={ownerPhone.replace('+91', '')}
                            onChange={(e) => setOwnerPhone('+91' + e.target.value)}
                            className="phone-input-field"
                            maxLength="10"
                            required
                          />
                        </div>
                        {ownerName && (
                          <Form.Text className="text-success">
                            Owner: {ownerName}
                          </Form.Text>
                        )}
                        <div style={{ marginBottom: '5px' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <Button 
                            onClick={handleSendVerificationCode}
                            disabled={!ownerPhone || isPhoneVerified}
                            className="verify-button mt-2"
                            style={{ marginBottom: '2px' }}
                          >
                            {isPhoneVerified ? 'Verified' : 'Send Verification Code'}
                          </Button>
                        </div>
                      </Form.Group>
                    )}

                    {showVerificationInput && (
                      <Form.Group as={Col} md="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter verification code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="InputGroup1"
                        />
                        {verificationError && (
                          <Form.Text className="text-danger">
                            {verificationError}
                          </Form.Text>
                        )}
                        <Button 
                          onClick={handleVerifyCode}
                          disabled={!verificationCode || isPhoneVerified}
                          className="verify-button mt-2"
                        >
                          Verify Code
                        </Button>
                      </Form.Group>
                    )}
                  </>
                )}

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Accept terms and conditions"
                    required
                    className="accept-terms"
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    checked={acceptedTerms}
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="submit-button1"
                  disabled={(!isOwner && !isPhoneVerified) || !acceptedTerms}
                  style={{ marginBottom: '1px' }} // Reduced space between buttons
                >
                  Sign Up
                </Button>

                <Button
                  type="button"
                  className="submit-button2"
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src={google}
                    className="Signin-gl-icon"
                    alt="Google icon"
                  />
                  Sign-Up with Google
                </Button>

                <div className="text-center mt-3">
                  Already have an account? <Link to="/signin" style={{ color: '#007bff', textDecoration: 'none' }}>Sign in</Link>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default SignUp;