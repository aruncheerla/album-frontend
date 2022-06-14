<template>
  <h1>Add Track</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Track Name" v-model="track.trackName" />
    <v-select label="Album" v-model="track.trackAlbum" :items="track.albums"/>
    <v-text-field label="Number" v-model="track.trackNumber" />
    <v-text-field label="Length" v-model="track.trackLength" />
    <v-select label="Artist" v-model="track.trackArtist" :items="track.artists"/>
    <v-text-field label="Description" v-model="track.trackDescription" />
    <v-text-field label="Audio" v-model="track.trackAudio" />
    <v-text-field label="Lyrics" v-model="track.trackLyrics" />
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveTrack()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
import AlbumDataService from "../services/AlbumDataService";
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "add-track",
  data() {
    return {
      track: {
        id: null,
        title: "",
        description: "",
        published: false,
        lyric: "",
        media: "",
        albums: [],
        artists: []
      },
      message: "Enter data and click save",
    };
  },
  methods: {
    async getAllAlbums(){
       AlbumDataService.getAllAlbum()
        .then((response) => {
          let data = [];
          response.data.forEach((val)=>{
              data.push(val.album_name);
          })
          this.track.albums = data;
d        })
        .catch((e) => {
          this.message = data.message;
        });
    },
    getAllArtists() {
      ArtistDataService.getAll()
        .then(response => {
          let data = [];
          response.data.forEach((val)=>{
              data.push(val.artist_name);
          })
          this.track.artists = data;
        })
        .catch(e => {
          this.message = data.message;
        });
    },
    saveTrack() {
      var data = {
        trackName: this.track.trackName,
        trackAlbum: this.track.trackAlbum,
        trackNumber: this.track.trackNumber,
        trackLength: this.track.trackLength,
        trackDescription: this.track.trackDescription,
        trackArtist: this.track.trackArtist,
        trackAudio: this.track.trackAudio,
        trackLyrics: this.track.trackLyrics,
      };
      TrackDataService.create(data)
        .then((response) => {
          this.track.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "tracks" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "tracks" });
    },
  },
  mounted() {
    this.getAllAlbums();
    this.getAllArtists();
  },
};
</script>
<style></style>
