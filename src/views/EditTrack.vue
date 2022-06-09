<template>
    <h1>Track Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Track Name"
            v-model="track.track_name"
        />
        <v-text-field
            label="Album"
            v-model="track.track_album"
        />
       <v-text-field
            label="Number"
            v-model="track.track_number"
        />
        <v-text-field
            label="Length"
            v-model="track.track_length"
        />
        <v-text-field
            label="Description"
            v-model="track.track_description"
        />
        <v-text-field
            label="Audio"
            v-model="track.track_audio"
        />
        <v-text-field
            label="Lyrics"
            v-model="track.track_lyrics"
        />
        
      
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateArtist()"
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