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
  updatetrack(id, data) {
    return http.put(`/track/${id}`, data);
  }
  viewtrack(id, data) {
    return http.put(`/track/${id}`, data);
  }
  delete(id) {
    return http.delete(`/track/${id}`);
  }
  deleteAll() {
    return http.delete(`/track`);
  }
  findByTrackName(title) {
    return http.get(`/track/search/${title}`);
  }
}
export default new TrackDataService();