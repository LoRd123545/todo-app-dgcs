import axios from 'axios';

export const axiosInstance = axios.create({
  validateStatus: (status) => {
    return status >= 200 && status <= 503;
  },
});