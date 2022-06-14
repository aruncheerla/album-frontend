<template>
  <h1 style="font-family: Arial, Helvetica, sans-serif;font-size:40px;">View Album</h1>

 <v-row>
      <v-col col="6">
  <v-form>
    <br>
    <p style="font-size:30px;">Album Title : {{ album.albumName }}</p>
    <br>
    <p style="font-size:30px;">Year : {{ album.albumYear }}</p>
    <br>
    <p style="font-size:30px;">Genre : {{ album.albumGenre }}</p>
    <br>
    <p style="font-size:30px;">Artist : {{ album.albumArtist }}</p>
     <br>
    <p style="font-size:30px;">Description : {{ album.albumDescription }}</p>
   <br><br>

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
        
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
  </v-col>
  <v-col col="6">
  <br>
  <p style="font-size:30px;">Track List of Album: {{album.albumName}}</p>
  <br>
   <TrackDisplayForView
    v-for="tutorial in tutorials"
    :key="tutorial.id"
    :track="tutorial"
  /> 
 </v-col>
  </v-row>
</template>

<script>
import ArtistDataService from "../services/ArtistDataService";
import AlbumDataService from "../services/AlbumDataService";
import ArtistDisplayForView from '@/components/ArtistDisplayForView.vue';
import TrackDisplayForView from '@/components/TrackDisplayForView.vue';
import TrackDataService from "../services/TrackDataService";
export default {
  name: "edit-album",
  props: ["id"],
  data() {
    return {
      album: Object,
      albumname: '',
      tutorials: [],
      message: "Enter data and click save",
    };
  },
  components: {
        ArtistDisplayForView,
        TrackDisplayForView
    },
  methods: {
    retrieveAlbum() {
      AlbumDataService.getAlbum(this.id)
        .then((response) => {
          const { album_name, album_year, album_genre, album_artist, album_description,albumImage } =
            response.data;
          this.previewImage = albumImage;
          this.albumname=album_name;
          this.album = {
            albumName: album_name,
            albumYear: album_year,
            albumGenre: album_genre,
            albumArtist: album_artist,
            albumDescription: album_description,
            albumImage: "",
            artists: [],
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
      AlbumDataService.viewTrack(this.id, data)
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
    retrieveArtists() {
      ArtistDataService.getAll()
        .then(response => {
          this.artists = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveTutorials() {
      TrackDataService.findAllTrackForAlbums(this.id)
        .then((response) => {
          this.tutorials = response.data;
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
    this.retrieveArtists();
    this.retrieveAlbum();
    this.retrieveTutorials();
  },
};
</script>

<style></style>

