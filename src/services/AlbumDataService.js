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
  updateAlbum(id, data) {
    return http.put(`/album/${id}`, data);
  }
  deleteAlbum(id) {
    return http.delete(`/albums/${id}`);
  }
  uploadImage(data){
    return http.post(`/album/uploadImage`,data);
  }

}
export default new AlbumDataService();