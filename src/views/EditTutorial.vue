<template>
    <h1>Edit Artist </h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Title"
            v-model="artist.title"
        />
        <v-text-field
            label="Description"
            v-model="artist.description"
        />
        <v-text-field
            label="Description"
            v-model="artist.published"
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
        title: this.artist.title,
        description: this.artist.description

      };
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