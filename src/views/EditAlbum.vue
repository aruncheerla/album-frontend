<template>
  <h1>Edit Album</h1>
  <h4>{{ message }}</h4>
  <h4>Album : {{ albumId }}</h4>

  <v-form>
    <v-text-field label="Album Title" v-model="album.albumName" />

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
  name: "edit-album",
  props: ["id"],
  data() {
    return {
      album: Object,
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveAlbum() {
      AlbumDataService.getAlbum(this.id)
        .then((response) => {
          const { album_name, album_year, album_genre, album_artist, album_description,albumImage } =
            response.data;
          this.previewImage = albumImage;
          this.album = {
            albumName: album_name,
            albumYear: album_year,
            albumGenre: album_genre,
            albumArtist: album_artist,
            albumDescription: album_description,
            albumImage: ""
          };
        })
        .catch((e) => {
          this.message = "";
        });
    },
    saveAlbum() {
      var data = {
        albumName: this.album.albumName,
        albumYear: this.album.albumYear,
        albumGenre: this.album.albumGenre,
        albumArtist: this.album.albumArtist,
        albumDescription: this.album.albumDescription,
        albumImage: this.album.albumImage,
        artistId: this.album.artistId,
      };
      AlbumDataService.updateAlbum(this.id, data)
        .then((response) => {
          this.album.id = response.data.id;

          this.$router.push({
            name: "albums",
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
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
    cancel() {
      this.$router.push({ name: "albums" });
    },
  },
  mounted() {
    this.retrieveAlbum();
  },
};
</script>

<style></style>
