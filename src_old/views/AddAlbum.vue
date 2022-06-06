<template>
    <h1>Add Album </h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{artistId}}</h4>
    <v-form>
       <v-text-field
            label="Album Name"
            v-model="album.title"
        />

        <v-text-field label="Year" v-model="album.year" />

        <v-text-field label="Genre" v-model="album.genre" />
        <v-text-field label="Artist" v-model="album.artist" />


        <v-text-field
            label="Description"
            v-model="album.description"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveAlbum()"
                    >Save</v-btn
                >
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
  props: ['artistId'],
  data() {
    return {
      album: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveAlbum() {
      var data = {
        title: this.album.title,
        description: this.album.description,
        year: this.album.year,
        genre: this.album.genre,
        artist: this.album.artist,
        artistId : this.artistId
      };
      AlbumDataService.createAlbum(this.artistId, data)
        .then(response => {
          this.album.id = response.data.id;
        
          this.$router.push({ name: 'view' , params: { id: this.artistId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.artistId }} );
    }
  }
}

</script>
<style>

</style>