import { axiosInstance } from 'src/data/axios.js';

export const remove = (id, token) => {
  return new Promise((acc, rej) => {
    axiosInstance
      .delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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