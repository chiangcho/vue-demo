import http from "../http";

export function getCourses(params) {
  return new Promise((resolve, reject) => {
    http
      .get("/api/courses", { params })
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          resolve({err});
        }
      )
      .catch(error => {
        resolve({error});
      });
  });
}
