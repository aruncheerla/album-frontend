import http from "../http-common";
class ArtistDataService {
  getAll() {
    return http.get("/artist");
  }
  get(id) {
    return http.get(`/artist/${id}`);
  }
  create(data) {
    return http.post("/artist/add", data);
  }
  update(id, data) {
    return http.put(`/artist/${id}`, data);
  }
  delete(id) {
    return http.delete(`/artist/${id}`);
  }
  deleteAll() {
    return http.delete(`/artist`);
  }
  findByArtistName(artistName) {
    return http.get(`/artist/search/${artistName}`);
  }
}
export default new ArtistDataService();