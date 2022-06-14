<template>
    <h1>Artist Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Artist Name"
            v-model="artist.artist_name"
        />
        <v-text-field
            label="Artist Type"
            v-model="artist.artist_type"
        />
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
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "edit-artist",
  props: ['id'],
  data() {
    return {
      artist: {},
      message: "Enter data and click save"
    };
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

     updateArtist() {
      var data = {
        artist_name: this.artist.artist_name,
        artist_type: this.artist.artist_type

      };
      console.log(" id to update: "+this.id);
      console.log(" arrist name to update: "+this.artist_name);
      console.log(" type to update: "+this.artist_type);
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
  }
}

</script>
<style>

</style>