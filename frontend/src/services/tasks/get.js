import { axiosInstance } from 'src/data/axios.js';

export const get = (token, status) => {
  let query = 'status=';

  if (status === '') {
    query = '';
  }

  return new Promise((acc, rej) => {
    axiosInstance
      .get(`http://localhost:3000/tasks?${query}${status}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        acc(res);
      })
      .catch((err) => {
        rej(err);
      });
  });
}