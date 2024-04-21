import { axiosInstance } from "src/data/axios.js";

export const add = (task, token) => {
  return new Promise((acc, rej) => {
    axiosInstance
      .post("http://localhost:3000/tasks/", task, {
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