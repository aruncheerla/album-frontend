import http from "../http-common";
class AlbumDataService {
  getAllAlbum() {
    return http.get(`/album`);
  }
  getAlbum(id) {
    return http.get(`/album/${id}`);
  }
  createAlbum(data) {
    return http.post(`/album/add`, data);
  }
  getArtist(data) {
    return http.get(`/artist`);
  }
  updateAlbum(id, data) {
    return http.put(`/album/${id}`, data);
  }
  viewAlbum(id, data) {
    return http.put(`/album/${id}`, data);
  }
  deleteAlbum(id) {
    return http.delete(`/album/${id}`);
  }
  uploadImage(data){
    return http.post(`/album/uploadImage`,data);
  }
  findByTitle(title) {
    return http.get(`/album/search/${title}`);
  }

}
export default new AlbumDataService();