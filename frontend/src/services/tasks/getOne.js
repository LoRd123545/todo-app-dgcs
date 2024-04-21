import { axiosInstance } from 'src/data/axios.js';

export const getOne = (id, token) => {
  return new Promise((acc, rej) => {
    axiosInstance
      .get(`http://localhost:3000/tasks/${id}`, {
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