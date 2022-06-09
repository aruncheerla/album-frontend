<template>

    <h1>Artist List</h1>
    <h4>{{ message }}</h4>
  
      <v-row >
        <v-col  cols="12" sm="2">
          <v-btn color = "success" @click="addArtist" >
            Add Artist
          </v-btn>
        </v-col>

        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchArtist"
          >
            Search
          </v-btn>
        </v-col>
        <v-col col="12" sm="8">
            <v-text-field density="compact" clearable
              v-model="artistName"/>
        </v-col> 
      </v-row>
      <v-row v-if="artists & artists.length > 0">
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Artist Name</span>
        </v-col>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Artist Type</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <ArtistDisplay
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
        @deleteArtist="goDelete(artist)"
        @updateArtist="goEdit(artist)"
        @viewArtist="goView(artist)"
    />
     <span v-if="!artists  || artists.length ==0"><h1 style="text-align:center">No Data found for Artist</h1></span>
  
 
  <v-btn  @click="removeAllArtists">
    Remove All
  </v-btn>
</template>
<script>
import ArtistDataService from "../services/ArtistDataService";
import ArtistDisplay from '@/components/ArtistDisplay.vue';
export default {
  name: "artists-list",
  data() {
    return {
      artists: [],
      currentArtist: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Artists"
    };
  },
  components: {
        ArtistDisplay
    },
  methods: {
    addArtist() {
      this.$router.push({ name: 'addartist' });
    },
    goEdit(artist) {
      this.$router.push({ name: 'edit', params: { id: artist.id } });
    },
    goView(artist) {
      this.$router.push({ name: 'view', params: { id: artist.id } });
    },
    goDelete(artist) {
      ArtistDataService.delete(artist.id)
        .then( () => {
    
          this.retrieveArtists()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveArtists() {
      ArtistDataService.getAll()
        .then(response => {
          this.artists = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveArtists();
      this.currentArtist = null;
      this.currentIndex = -1;
    },
    setActiveArtist(artist, index) {
      this.currentArtist = artist;
      this.currentIndex = artist ? index : -1;
    },
    removeAllArtists() {
      ArtistDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchArtist() {
      ArtistDataService.findByArtistName(this.artistName)
        .then(response => {
          this.artists = response.data;
          this.setActiveArtist(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveArtists();
  }
};
</script>
<style>

</style>