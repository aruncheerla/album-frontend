<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ album.title }}</span>
  </v-col>
  <v-col  cols="8"
        sm="4">
      <span> {{ album.description }}</span>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateAlbum"/>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAlbum"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    album: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteAlbum() {
      this.$emit("deleteAlbum");
    },
    updateAlbum() {
      this.$emit("updateAlbum");
    }
  }
};
</script>

<style></style>
