<template>
    <h1>Add Track</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Track Name"
            v-model="track.title"
        />

        <v-text-field label="Album" v-model="track.album" />
        <v-text-field label="Number" v-model="track.number" />
        <v-text-field label="Length" v-model="track.length" />

        <v-text-field
            label="Description"
            v-model="track.description"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveTrack()"
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
  name: "add-track",
  data() {
    return {
      track: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveTrack() {
      var data = {
        title: this.track.title,
        album: this.track.album,
        number: this.track.number,
        length: this.track.length,
        description: this.track.description
      };
      TrackDataService.create(data)
        .then(response => {
          this.track.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'tracks' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'tracks' });
    }
  }
}

</script>
<style>

</style>