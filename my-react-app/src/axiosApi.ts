import axios from 'axios';
const axiosApi = axios.create({
    baseURL: 'http://localhost:8083'
});
export default axiosApi;