<template>
    <h1>Edit Album </h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}}</h4>   

    <v-form>
       <v-text-field label="Album Title" v-model="album.title" />
        <v-text-field label="Description" v-model="album.description" />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveAlbum()" >Save</v-btn >
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
  props: {artistId : String,albumId:String},
  data() {
    return {
      album: Object,
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveAlbum() {
      AlbumDataService.getAlbum(this.artistId,this.albumId)
        .then(response => {
          this.album= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    saveAlbum() {
      var data = {
        title: this.album.title,
        description: this.album.description,
        artistId : this.album.artistId
      };
      AlbumDataService.updateAlbum(this.album.artistId,this.album.id, data)
        .then(response => {
          this.album.id = response.data.id;
        
         this.$router.push({ name: 'view' , params: { id: this.album.artistId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.album.artistId }} );
    }
  },
    mounted() {
      this.retrieveAlbum();
  }
}

</script>


<style>

</style>