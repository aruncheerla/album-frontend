<template>
  <h1>Album List</h1>
  <h4 class="h4-head">{{ message }}</h4>

  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="addAlbum"> Add Album </v-btn>
    </v-col>

    <v-col cols="12" sm="2">
      <v-btn color="success" @click="searchTitle"> Search </v-btn>
    </v-col>
    <v-col col="12" sm="8">
      <v-text-field density="compact" clearable v-model="title" />
    </v-col>
  </v-row>
  <v-row v-if="tutorials & tutorials.length > 0">
    <v-col cols="9" sm="2">
      <span class="text-h6">Album Title</span>
    </v-col>
    <v-col cols="9" sm="4">
      <span class="text-h6">Description</span>
    </v-col>
    <v-col cols="9" sm="1">
      <span class="text-h6">Edit</span>
    </v-col>
    <v-col cols="9" sm="1">
      <span class="text-h6">View</span>
    </v-col>
    <v-col cols="9" sm="1">
      <span class="text-h6">Delete</span>
    </v-col>
  </v-row>
  <AlbumDisplay
    v-for="tutorial in tutorials"
    :key="tutorial.id"
    :album="tutorial"
    @deleteAlbum="goDelete(tutorial)"
    @updateAlbum="goEdit(tutorial)"
    @viewAlbum="goView(tutorial)"
  />
  <span v-if="!tutorials || tutorials.length ==0"><h1 style="text-align:center">No Data found for Album</h1></span>
  
  <v-btn @click="removeAllTutorials" > Remove All </v-btn>
  
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import TutorialDataService from "../services/TutorialDataService";
import AlbumDisplay from "@/components/AlbumDisplay.vue";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      message: "Search, Edit or Delete Albums",
    };
  },
  components: {
    AlbumDisplay,
  },
  methods: {
    addAlbum() {
      this.$router.push({ name: "addalbum" });
    },
    goEdit(tutorial) {
      this.$router.push({ name: "editalbum", params: { id: tutorial.id } });
    },
    goView(tutorial) {
      this.$router.push({ name: "viewalbum", params: { id: tutorial.id } });
    },
    goDelete(tutorial) {
      AlbumDataService.deleteAlbum(tutorial.id)
        .then(() => {
          this.retrieveAlbums();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveAlbums() {
      AlbumDataService.getAllAlbum()
        .then((response) => {
          console.log(response);
          this.tutorials = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveAlbums();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    searchTitle() {
      AlbumDataService.findByTitle(this.title) 
        .then((response) => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveAlbums();
  },
};
</script>

<style>
.text-h6 .v-btn {
  font-size: 1.25rem !important;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: none !important;
}
.search-btn button {
  float: right;
}
h4.h4-head {
  margin-bottom: 18px;
}
</style>
