<template>
  <h1>Aritst Add</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Artist Name" v-model="artist.artistName" />
    <v-text-field label="Artist Type" v-model="artist.artistType" />
    <v-row>
      <v-col col="8">
        <v-file-input
          label="Artist image"
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
        <v-btn color="success" @click="saveArtist()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "add-artist",
  data() {
    return {
      previewImage: null,
      artist: {
        id: null,
        artistName: "",
        artistType: "",
        artistImage: ""
      },
      message: "Enter data and click save",
    };
  },
  methods: {
    saveArtist() {
      var data = {
        artistName: this.artist.artistName,
        artistType: this.artist.artistType,
        artistImage: this.artist.artistImage
      };
      ArtistDataService.create(data)
        .then((response) => {
          this.artist.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "artists" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "artists" });
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
      ArtistDataService.uploadImage(data)
        .then((response) => {
          this.artist.artistImage = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
<style></style>
