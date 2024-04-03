import axios from 'axios';

export const axiosIntance = axios.create({
  validateStatus: (status) => {
    return status >= 200 && status <= 503;
  },
});