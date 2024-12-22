import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://kaleshnashaya-backend.vercel.app',
  timeout: 10000, // Optional: set a timeout for requests
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request configuration here if needed
    const token = localStorage.getItem('authToken'); // Assuming you're using localStorage to store the token
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to request headers
    }

    // Optionally log or transform the request here
    console.log('Request:', config);
    
    return config; // Always return the config object
  },
  (error) => {
    // Handle any request errors here (optional)
    console.error('Request Error:', error);
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response data if needed
    console.log('Response:', response);

    // You could also perform specific logic based on response status codes
    if (response.status === 200) {
      // Handle successful response
    }

    return response; // Return the response object
  },
  (error) => {
    // Handle global response errors here (e.g., unauthorized, server errors)
    console.error('Response Error:', error.response || error);

    if (error.response) {
      // Check for specific status codes
      if (error.response.status === 401) {
        console.error('Unauthorized, please login!');
        // Optional: Redirect to login page or refresh token
      } else if (error.response.status === 500) {
        console.error('Server error, please try again later!');
      }
    }

    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

export default api;
