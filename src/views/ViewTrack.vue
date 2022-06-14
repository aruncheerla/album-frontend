<template>
     <h1 style="font-family: Arial, Helvetica, sans-serif;font-size:40px;">View Track</h1>
    <v-row>
      <v-col col="6">
    <v-form>
        <br>
    <p style="font-size:30px;">Track Name : {{ track.track_name }}</p>
         <br>
    <p style="font-size:30px;">Album : {{ track.track_album }}</p>
        <br>
    <p style="font-size:30px;">Number : {{ track.track_number }}</p>
        <br>
    <p style="font-size:30px;">Length : {{ track.track_length }}</p>
          <br>
    <p style="font-size:30px;">Description : {{ track.track_description }}</p>
            <br>
          <p style="font-size:30px;"> Audio Link : <a v-bind:href= track.track_audio > Download Audio </a> </p> 
    
             <br>
             <p style="font-size:30px;"> Lyrics Link : <a v-bind:href= track.track_lyrics > Download Lyrics </a> </p> 
             <br>
    
        
      
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
  <p style="font-size:30px;"></p>
  </v-col>
  </v-row>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
export default {
  name: "edit-track",
  props: ['id'],
  data() {
    return {
      track: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveTrack() {
      TrackDataService.get(this.id)
        .then(response => {
          this.track= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updatetrack() {
      var data = {
        trackName: this.track.trackName,
        trackAlbum: this.track.trackAlbum
       

      };
      console.log(" id to update: "+this.id);
      console.log(" track name to update: "+this.trackName);
      console.log(" type to update: "+this.trackType);
      TrackDataService.update(this.id,data)
        .then(response => {
          this.artist.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'track' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'tracks' });
    }
  },
    mounted() {
    this.retrieveTrack();
  }
}

</script>
<style>

</style>