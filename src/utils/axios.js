import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dhanflow-server-dmchgxg0bjfac6c8.centralindia-01.azurewebsites.net'
});

// Add request interceptor to automatically add auth token
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log('Request:', {
            //     method: config.method,
            //     url: config.url,
            //     headers: {
            //         Authorization: config.headers.Authorization
            //     }
            // });
        }
        return config;
    },
    error => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
    response => {
        
        return response;
    },
    error => {
        if (error.response?.status === 401) {
            console.error('401 Error:', {
                url: error.config.url,
                response: error.response.data
            });
        }
        return Promise.reject(error);
    }
);

export default instance; 