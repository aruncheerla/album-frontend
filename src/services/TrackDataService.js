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
  updateTrack(id, data) {
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
  findAllTrackForAlbums(id) {
    return http.get(`/track/searchalbum/${id}`);
  }
  findAllTrackForArtist(title) {
    return http.get(`/track/searchartist/${title}`);
  }
}
export default new TrackDataService();