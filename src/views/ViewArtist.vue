<template>
     <h1 style="font-family: Arial, Helvetica, sans-serif;font-size:40px;">View Artist</h1>

 <v-row>
      <v-col col="6">
    <v-form>
    <br>
    <p style="font-size:30px;">Artist Name : {{ artist.artist_name }}</p>
       <br>
    <p style="font-size:30px;">Artist Type : {{ artist.artist_type }}</p>
        <br>
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
            <v-col col="2">
             <v-btn color="info" @click="cancel()">Cancel</v-btn>    
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
    </v-col>
    
  <v-col col="6">
  <br>
  <p style="font-size:30px;">Track List of Artist {{ artist.artist_name }}</p>
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
import TrackDisplayForView from '@/components/TrackDisplayForView.vue';
import TrackDataService from "../services/TrackDataService";
export default {
  name: "edit-artist",
  props: ['id'],
  data() {
    return {
      artist: {},
      tutorials: [],
      message: "Enter data and click save"
    };
  }, 
  components: {
        TrackDisplayForView
  },
  methods: {
    retrieveArtist() {
      ArtistDataService.get(this.id)
        .then(response => {
          this.artist= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
retrieveTutorials() {
      TrackDataService.findAllTrackForArtist( 'Rahman')
        .then((response) => {
          this.tutorials = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    updateArtist() {
      var data = {
        artistName: this.artist.artistName,
        artistType: this.artist.artistType,
        artistImage: this.artist.artistImage

      };
      console.log(" id to update: "+this.id);
      console.log(" arrist name to update: "+this.artistName);
      console.log(" type to update: "+this.artistType);
      ArtistDataService.update(this.id,data)
        .then(response => {
          this.artist.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'artists' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'artists' });
    }
  },
    mounted() {
    this.retrieveArtist();
    this.retrieveTutorials();
  }
}

</script>
<style>

</style>