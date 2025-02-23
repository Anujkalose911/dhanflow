import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const handleCallback = () => {
            try {
                const access_token = searchParams.get('access_token');
                const refresh_token = searchParams.get('refresh_token');
                const user_data = JSON.parse(decodeURIComponent(searchParams.get('user_data')));

                if (!access_token || !refresh_token || !user_data) {
                    throw new Error('Missing authentication data');
                }

                // Store tokens
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                // Update auth state
                setIsAuthenticated(true);

                // Show success message
                toast.success('Successfully logged in!');

                // Navigate to home
                navigate('/home', { replace: true });
            } catch (error) {
                console.error('Auth callback error:', error);
                toast.error('Authentication failed');
                navigate('/signin', { replace: true });
            }
        };

        handleCallback();
    }, [searchParams, navigate, setIsAuthenticated]);

    return null; // Or a loading spinner
};

export default AuthCallback; 