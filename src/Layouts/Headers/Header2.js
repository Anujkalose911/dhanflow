import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import LiquidMindLogo from "../../Assests/images/LiquidMind-Logo.png";
import "../../Assests/CSS/Header2.css";
import { toast } from 'react-hot-toast';

function Header2() {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await axiosInstance.get('/check-auth');
            if (response.data.success) {
                const userData = response.data.user_data;
               
                setUserDetails({
                    name: `${userData.firstname || ''} ${userData.lastname || ''}`.trim() || 'User',
                    email: userData.email,
                    role: userData.role,
                    phone: userData.phone
                });

            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            // The axios interceptor will handle token refresh and redirects
        }
    };

    const handleLogout = () => {
        // Clear tokens and auth state
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        navigate('/signin');
    };

    return (
        <Navbar expand="lg" className="Header2-background">
            <Container>
                <Navbar.Brand as={Link} to="/home">
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
                        {userDetails?.role?.toLowerCase() === 'admin' && (
                            <Link to="/user-management" className="navbar-list">
                                USERS
                            </Link>
                        )}
                        <Link to="/invoice-management" className="navbar-list">
                            INVOICES
                        </Link>
                        <Link to="/calendar" className="navbar-list">
                            CALENDAR
                        </Link>
                        <Link to="/installments" className="navbar-list">
                            INSTALLMENTS
                        </Link>
                        {(userDetails?.role?.toLowerCase() === 'admin' || userDetails?.role?.toLowerCase() === 'operator') && (
                            <Link 
                                to="/tallysupport" 
                                className="navbar-list"
                            >
                                ERP SETUP
                            </Link>
                        )}
                        {['admin', 'accountant', 'auditor'].includes(userDetails?.role?.toLowerCase()) && (
                            <Link to="/audit-logs" className="navbar-list">
                                AUDIT LOGS
                            </Link>
                        )}


                        <NavDropdown
                            title={userDetails?.name || "Profile"}
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
                                        <b>Role:</b> {userDetails.role}
                                    </NavDropdown.Item>
                                    {userDetails.phone && (
                                        <NavDropdown.Item>
                                            <b>Phone:</b> {userDetails.phone}
                                        </NavDropdown.Item>
                                    )}
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
