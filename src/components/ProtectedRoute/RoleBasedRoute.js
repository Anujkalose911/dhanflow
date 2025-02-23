import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import Loader from '../Loader/Loader';
import { toast } from 'react-hot-toast';

const RoleBasedRoute = ({ children, allowedRoles }) => {
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axiosInstance.get('/check-auth');
                if (response.data.success) {
                    const userRole = response.data.user_data.role.toLowerCase();
                    if (!allowedRoles.includes(userRole)) {
                        toast.error(`Access denied. ${response.data.user_data.role}s cannot access this page.`);
                        setIsValid(false);
                    } else {
                        setIsAuthenticated(true);
                        setIsValid(true);
                    }
                } else {
                    throw new Error('Invalid auth state');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, [setIsAuthenticated, allowedRoles]);

    if (loading) {
        return <Loader />;
    }

    return isValid ? children : <Navigate to="/home" replace />;
};

export default RoleBasedRoute; 