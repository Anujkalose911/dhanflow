import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                // Check if we have a token
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No token found');
                }

                // Verify token with backend
                const response = await axiosInstance.get('/check-auth');
                if (response.data.success) {
                    setIsAuthenticated(true);
                    setIsValid(true);
                } else {
                    throw new Error('Invalid auth state');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
                setIsValid(false);
                // Token refresh will be handled by axios interceptor if needed
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, [setIsAuthenticated]);

    if (loading) {
        return <Loader />;
    }

    return isValid ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute; 