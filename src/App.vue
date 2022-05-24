<template>
    <v-app>
      <v-app-bar  >
            <v-img
                class="mx-2"
                :src="logo"
                max-height="40"
                max-width="40"
                contain 
            ><v-btn 
                    variant="text"
                    @click="goHome"
                    ></v-btn></v-img>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn 
                    variant="text"
                    @click="goHome"
                    >
                  Home
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goAlbums"
                    >
                  Albums
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goArtists"
                    >
                  Artists
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goTracks"
                    >
                  Tracks
                </v-btn>
                
                
            </v-toolbar-items>
      </v-app-bar>
      <v-main >
        <v-container>
          <router-view />
        </v-container>
      </v-main>  

      <div class="footer">
           <div class="container">
             <p>© Copyright 2022 My Albums. All rights reserved</p>
           </div>   
      </div>


    </v-app>
</template>





<script>
import logo from './assets/oc-logo-white.png'
export default {
  name: 'App',

  data: () => ({
    logo,
  }),
  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    },
    goAlbums() {
      this.$router.push({ name: 'tutorials' });
    },
    goArtists() {
      this.$router.push({ name: 'artists' });
    },
    goTracks() {
      this.$router.push({ name: 'tracks' });
    },
    goAdd() {
      this.$router.push({ name: 'add' });
    },
    goList() {
      this.$router.push({ name: 'tutorials' });
    }
  },

}
</script>


<style>

.footer{
      border-top: 1px solid #ccc;
}
.footer p{
  text-align: center;
    color: #000;
    font-size: 14px;
    padding: 7px;
}

</style>