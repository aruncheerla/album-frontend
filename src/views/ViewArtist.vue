<template>
    <h2>View Album </h2>
    <h4>{{ message }}</h4>
    <h3> {{tutorial.title}}</h3>
    <v-btn color="success" class="view-pg-btn" @click="goEditTutorial()" >Edit</v-btn>
     <v-btn color="success" class="view-pg-btn" @click="goAddAlbum(id)" >Add Track</v-btn>

     <v-row>
        <v-col  cols="8" sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="8" sm="4">
            <span class="text-h6">Description</span>
        </v-col>
        <v-col  cols="8" sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="8" sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>

      <AlbumDisplay
        v-for="album in albums"
        :key="album.id"
        :album="album"
        @deleteAlbum="goDeleteAlbum(album)"
        @updateAlbum="goEditAlbum(album)"
    />

</template>


<script>
import TutorialDataService from "../services/TutorialDataService";
import AlbumDataService from "../services/AlbumDataService";
import AlbumDisplay from '@/components/AlbumDisplay.vue';
export default {
  name: "view-tutorial",
  props: ['id'],
    components: {
        AlbumDisplay
    },
  data() {
    return {
      tutorial: {},
      albums : [],
      message: "Add, Edit or Delete Album"
    };
  },
  methods: {
    retrieveAlbums() {
      TutorialDataService.get(this.id)
        .then(response => {
          this.tutorial= response.data;
          AlbumDataService.getAllAlbums(this.id)
            .then(response=> {
              this.albums = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditTutorial() {
      this.$router.push({ name: 'edit', params: { id: this.id } });
    },
    goEditAlbum(album) {
      this.$router.push({ name: 'editAlbum', params: { tutorialId: this.id,albumId: album.id} });
    },
    goAddAlbum() {
      this.$router.push({ name: 'addtrack', params: { tutorialId: this.id } });
    },

    goDeleteAlbum(album) {
      AlbumDataService.deleteAlbum(album.tutorialId,album.id)
        .then( () => {
          this.retrieveAlbums()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'tutorials' });
    }
  },
    mounted() {
    this.retrieveAlbums();
  }
}
</script>

<style>

.v-btn.view-pg-btn{
  margin: 15px 18px 18px 0px;
}


</style>