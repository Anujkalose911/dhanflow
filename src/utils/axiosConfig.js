import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add CSRF token to requests
axiosInstance.interceptors.request.use((config) => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];
        
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
});

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post('https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net/refresh-token', {
                    refresh_token: refreshToken
                });

                const { access_token, refresh_token } = response.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                localStorage.clear();
                window.location.href = '/signin';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 