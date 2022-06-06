import http from "../http-common";
class TrackDataService {
  getAll() {
    return http.get("/track");
  }
  get(id) {
    return http.get(`/track/${id}`);
  }
  create(data) {
    return http.post("/track/add", data);
  }
  update(id, data) {
    return http.put(`/track/${id}`, data);
  }
  delete(id) {
    return http.delete(`/track/${id}`);
  }
  deleteAll() {
    return http.delete(`/track`);
  }
  findByTitle(title) {
    return http.get(`/track?title=${title}`);
  }
}
export default new TrackDataService();