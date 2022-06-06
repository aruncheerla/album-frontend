<template>
  <h1>Add Album</h1>
  <h4>{{ message }}</h4>
  <h4>Album : {{ artistId }}</h4>
  <v-form>
    <v-text-field label="Album Name" v-model="album.albumName" />

    <v-text-field label="Year" v-model="album.albumYear" />

    <v-text-field label="Genre" v-model="album.albumGenre" />
    <v-text-field label="Artist" v-model="album.albumArtist" />
    <v-text-field label="Description" v-model="album.albumDescription" />
    <v-row>
      <v-col col="8">
        <v-file-input
          label="Album image"
          prepend-icon="mdi-camera"
          accept="image/png, image/jpeg"
          @change="uploadImage"
        />
      </v-col>
      <v-col col="4">
        <v-img max-height="150" max-width="250" :src="previewImage"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveAlbum()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "add-album",
  props: ["artistId"],
  data() {
    return {
      previewImage: null,
      album: {
        id: null,
        albumName: "",
        albumDescription: "",
        albumYear: "",
        albumGenre: "",
        albumArtist: "",
        albumImage: "",
        published: false,
      },
      message: "Enter data and click save",
    };
  },
  methods: {
    saveAlbum() {
      var data = {
        albumName: this.album.albumName,
        albumDescription: this.album.albumDescription,
        albumYear: this.album.albumYear,
        albumGenre: this.album.albumGenre,
        albumArtist: this.album.albumArtist,
        albumImage: this.album.albumImage,
        artistId: this.artistId,
      };
      AlbumDataService.createAlbum(data)
        .then((response) => {
          this.album.id = response.data.id;

          this.$router.push({ name: "albums" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "albums" });
    },
    uploadImage(e) {
      this.previewImage = null;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
      let data = new FormData();
      data.append("file", image);
      AlbumDataService.uploadImage(data)
        .then((response) => {
          this.album.album_image = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
<style></style>
