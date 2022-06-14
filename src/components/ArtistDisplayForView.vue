<template>
<v-row>
  <v-col  cols="9"
        sm="2">
      <span style="font-size:20px;">{{ artist.artist_name }}</span>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    artist: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteArtist() {
      this.$emit("deleteArtist");
    },
    updateArtist() {
      this.$emit("updateArtist");
    },
    viewArtist() {
      this.$emit("viewArtist");
    }
  }
};
</script>

<style></style>
