import { axiosInstance } from 'src/data/axios.js';

export const edit = (id, newTask, token) => {
  return new Promise((acc, rej) => {
    axiosInstance
      .patch(`http://localhost:3000/tasks/${id}`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}