import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import axios from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import LiquidMindLogo from "../../Assests/images/LiquidMind-Logo.png";
import "../../Assests/CSS/Header2.css";

function Header2() {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('/get-msme-data');
            if (response.data.success) {
                setUserDetails({
                    name: `${response.data.data.firstname} ${response.data.data.lastname}`,
                    email: response.data.data.email,
                    phone: response.data.data.phone
                });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleLogout = async () => {
        try {
            // First clear local storage and session storage
            localStorage.clear();
            sessionStorage.clear();
            
            // Call backend logout endpoint and wait for it to complete
            await axios.get('/logout');
            
            // Update auth context
            setIsAuthenticated(false);
            
            // Force navigate to signin page
            navigate('/signin', { replace: true });
            
        } catch (error) {
            console.error('Logout error:', error);
            // Even if logout fails, still clear everything and redirect
            setIsAuthenticated(false);
            navigate('/signin', { replace: true });
        }
    };

    return (
        <Navbar expand="lg" className="Header2-background">
            <Container>
                <Navbar.Brand href="#home">
                    <img 
                        src={LiquidMindLogo} 
                        className="CompanyLogo2" 
                        alt="Company Logo" 
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-ulist">
                        <Link to="/home" className="navbar-list">
                            HOME
                        </Link>
                        <Link to="/dashboard" className="navbar-list">
                            DASHBOARD
                        </Link>
                        <Link to="/calendar" className="navbar-list">
                            CALENDAR
                        </Link>
                        <Link to="/installments" className="navbar-list">
                            INSTALLMENTS
                        </Link>
                        <Link to="/tallysupport" className="navbar-list">
                            ERP SETUP
                        </Link>
                        

                        <NavDropdown
                            title="Profile"
                            id="basic-nav-dropdown"
                            className="navbar-dropdown"
                        >
                            {userDetails ? (
                                <>
                                    <NavDropdown.Item>
                                        <b>Name:</b> {userDetails.name}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <b>E-mail:</b> {userDetails.email}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        Phone-Number: {userDetails.phone}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <button
                                            type="button"
                                            className="header2-button"
                                            onClick={handleLogout}
                                        >
                                            Log-Out
                                        </button>
                                    </NavDropdown.Item>
                                </>
                            ) : (
                                <NavDropdown.Item>
                                    Loading user details...
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header2;
