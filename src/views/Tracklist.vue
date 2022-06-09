<template>
  <h1>Track Lists</h1>
  <h4 class="h4-head">{{ message }}</h4>

  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="addTrack"> Add Track </v-btn>
    </v-col>

    <v-col cols="12" sm="2" class="search-btn">
      <v-btn color="success" @click="searchTitle"> Search </v-btn>
    </v-col>
    <v-col col="12" sm="8">
      <v-text-field density="compact" clearable v-model="title" />
    </v-col>
  </v-row>
    <v-row v-if="tutorials & tutorials.length > 0">
    <v-col cols="4" sm="2">
      <span class="text">Track Title</span>
    </v-col>
    <v-col cols="4" sm="4">
      <span class="text-h6">Description</span>
    </v-col>
    <v-col cols="4" sm="1">
      <span class="text-h6">Edit</span>
    </v-col>
    <v-col cols="4" sm="1">
      <span class="text-h6">View</span>
    </v-col>
    <v-col cols="4" sm="1">
      <span class="text-h6">Delete</span>
    </v-col>
  </v-row>
  <TrackDisplay
    v-for="tutorial in tutorials"
    :key="tutorial.id"
    :track="tutorial"
    @deletetrack="goDelete(tutorial)"
    @updatetrack="goEdit(tutorial)"
    @viewtrack="goView(tutorial)"
  />
   <span v-if="!tutorials || tutorials.length ==0"><h1 style="text-align:center">No Data found for Track</h1></span>

  <v-btn @click="removeAllTutorials"> Remove All </v-btn>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
import TrackDisplay from "@/components/TrackDisplay.vue";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      message: "Search, Edit or Delete Artists",
    };
  },
  components: {
    TrackDisplay,
  },
  methods: {
    addTrack() {
      this.$router.push({ name: "addtrack" });
    },

    goEdit(tutorial) {
      this.$router.push({ name: "edittrack", params: { id: tutorial.id } });
    },
    goView(tutorial) {
      this.$router.push({ name: "viewtrack", params: { id: tutorial.id } });
    },
    goDelete(tutorial) {
      TrackDataService.delete(tutorial.id)
        .then(() => {
          this.retrieveTutorials();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveTutorials() {
      TrackDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
      TrackDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    searchTitle() {
      TrackDataService.findByTrackName(this.title)
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
    this.retrieveTutorials();
  },
};
</script>
<style></style>
