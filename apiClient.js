import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your base API URL
const API_URL = 'http://10.0.2.2:8000';

// Create axios client
const axiosClient = axios.create({
  baseURL: API_URL,
});

// Request interceptor to attach access token
axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor for refreshing tokens when expired
axiosClient.interceptors.response.use(
  response => response, // Return response if successful
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(`${API_URL}/api/users/refreshtoken/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          await AsyncStorage.setItem('accessToken', newAccessToken);
          
          // Update axiosClient headers and retry request
          axiosClient.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${newAccessToken}`;
          
          return axiosClient(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token expired:', refreshError.response?.data);

          // **Handle token expiration: Logout user**
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');

          // Optionally, navigate to login screen (if using React Navigation)
          // navigation.navigate('Login');

          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
