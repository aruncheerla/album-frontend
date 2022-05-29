import http from "../http-common";
class AlbumDataService {
  getAllAlbum(tutorialId) {
    return http.get(`/tutorials/${tutorialId}/albums`);
  }
  getAlbum(tutorialId,id) {
    return http.get(`/tutorials/${tutorialId}/albums/${id}`);
  }
  createAlbum(tutorialId,data) {
    return http.post(`/tutorials/${tutorialId}/albums`, data);
  }
  updateAlbum(tutorialId,id, data) {
    return http.put(`/tutorials/${tutorialId}/albums/${id}`, data);
  }
  deleteAlbum(tutorialId,id) {
    return http.delete(`/tutorials/${tutorialId}/albums/${id}`);
  }

}
export default new AlbumDataService();