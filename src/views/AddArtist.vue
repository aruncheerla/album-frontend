<template>
    <h1>Add Artist</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Artist Name"
            v-model="artist.title"
        />
        <v-text-field
            label="Description"
            v-model="artist.description"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveArtist()"
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
  name: "add-artist",
  data() {
    return {
      artist: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveArtist() {
      var data = {
        title: this.artist.title,
        description: this.artist.description
      };
      ArtistDataService.create(data)
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
  }
}

</script>
<style>

</style>