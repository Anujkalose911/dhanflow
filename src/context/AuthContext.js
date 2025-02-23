import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const DEBUG = true;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const isTokenExpired = useCallback((token) => {
        try {
        
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const isExpired = decoded.exp < currentTime;
            
            
            
            return isExpired;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    }, []);

    const verifyToken = useCallback(async (token) => {
        
        
        if (!token) {
            
            return false;
        }

        try {
            // First verify token format and expiration locally
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
                
                return false;
            }

            // Only make server request if token is valid locally
            
            const response = await axiosInstance.get('/check-auth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            

            return response.data.success;
        } catch (error) {
            // Don't fail verification on network errors
            if (error.code === 'ERR_NETWORK') {
                console.warn('Network error during verification, using local validation');
                return true;
            }

            // Log specific error for debugging
            console.error('Token verification error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            // Only return false for specific auth failures
            if (error.response?.status === 401) {
                return false;
            }

            // For other errors, trust local validation
            return true;
        }
    }, []);

    const setAuthStatus = useCallback(async (status, token = null) => {
        

        if (!status) {
            
            setIsAuthenticated(false);
            return false;
        }

        const authToken = token || localStorage.getItem('access_token');
        const isValid = await verifyToken(authToken);

        if (isValid) {
           
            setIsAuthenticated(true);
            return true;
        } else {
           
            setIsAuthenticated(false);
            return false;
        }
    }, [isAuthenticated, verifyToken]);

    useEffect(() => {
        const initAuth = async () => {
            
            const isValid = await verifyToken();
            
            
            setIsAuthenticated(isValid);
            setLoading(false);
            
            
        };

        initAuth();
    }, [verifyToken]);

    const logout = useCallback(() => {
        
        
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        setIsAuthenticated(false);
        
        
        navigate('/signin');
    }, [navigate]);

    const login = async (credentials) => {
        const response = await axiosInstance.post('/login', credentials);
        setAccessToken(response.data.access_token);
    };

    const refreshToken = async () => {
        try {
            // Uses HttpOnly refresh token cookie automatically
            const response = await axiosInstance.post('/refresh-token');
            setAccessToken(response.data.access_token);
        } catch (error) {
            console.error('Token refresh failed:', error);
        }
    };

    // Add token to requests
    axiosInstance.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    return (
        <AuthContext.Provider value={{
            accessToken,
            isAuthenticated,
            setIsAuthenticated: setAuthStatus,
            loading,
            logout,
            login,
            refreshToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthCallbackRoute = () => {
    const [searchParams] = useSearchParams();
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            //          ('Handling auth callback...');
            
            try {
                const access_token = searchParams.get('access_token');
                const refresh_token = searchParams.get('refresh_token');
                const user_data = searchParams.get('user_data');

                

                if (!access_token || !refresh_token) {
                    throw new Error('Missing tokens');
                }

                // Clean tokens before storing
                const cleanAccessToken = access_token.trim();
                const cleanRefreshToken = refresh_token.trim();

                // Verify token format
                if (!cleanAccessToken.split('.').length === 3) {
                    throw new Error('Invalid token format');
                }

                const isValid = await setIsAuthenticated(true, cleanAccessToken);
                
                if (isValid) {
                    //console.log('Storing verified tokens and user data...');
                    localStorage.setItem('access_token', cleanAccessToken);
                    localStorage.setItem('refresh_token', cleanRefreshToken);
                    if (user_data) {
                        localStorage.setItem('user_data', user_data);
                    }

                    toast.success('Successfully logged in!');
                    navigate('/home', { replace: true });
                } else {
                    throw new Error('Token verification failed');
                }
            } catch (error) {
                console.error('Auth callback error:', error);
                toast.error('Authentication failed');
                navigate('/signin', { replace: true });
            }
        };

        handleCallback();
    }, [searchParams, setIsAuthenticated, navigate]);

    return null;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error('useAuth must be used within an AuthProvider');
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 