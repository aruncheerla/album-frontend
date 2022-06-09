import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/albums",
    // alias: "/artists",
    name: "albums",
    component: () => import("./views/AlbumList.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => import("./views/home.vue")
  },
  {
    path: "/artists",
    name: "artists",
    component: () => import("./views/ArtistList.vue")
  },
  {
    path: "/tracks",
    name: "tracks",
    component: () => import("./views/TrackList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditArtist.vue"),
    props: true
  },
  {
    path: "/addartist",
    name: "addartist",
    component: () => import("./views/AddArtist.vue")
  },
  {
    path: "/addtrack",
    name: "addtrack",
    component: () => import("./views/AddTrack.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewArtist.vue"),
    props: true
  },
  {
    path: "/addalbum",
    name: "addalbum",
    component: () => import("./views/AddAlbum.vue"),
    props: true
  },
  {
    path: "/editalbum/:id",
    name: "editalbum",
    component: () => import("./views/EditAlbum.vue"),
    props: true
  },
  {
    path: "/viewalbum/:id",
    name: "viewalbum",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/edittrack/:id",
    name: "edittrack",
    component: () => import("./views/EditTrack.vue"),
    props: true
  },
  {
    path: "/viewtrack/:id",
    name: "viewtrack",
    component: () => import("./views/ViewTrack.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/artist-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;