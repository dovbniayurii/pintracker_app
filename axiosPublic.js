import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';
const axiosPublic = axios.create({
  baseURL: API_URL,
});

export default axiosPublic;
