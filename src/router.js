import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/albums",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./views/TutorialsList.vue")
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
    component: () => import("./views/EditTutorial.vue"),
    props: true
  },
  {
    path: "/addartist",
    name: "addartist",
    component: () => import("./views/AddTutorial.vue")
  },
  {
    path: "/addtrack",
    name: "addtrack",
    component: () => import("./views/AddTrack.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewTutorial.vue"),
    props: true
  },
  {
    path: "/addalbum",
    name: "addalbum",
    component: () => import("./views/AddLesson.vue"),
    props: true
  },
  {
    path: "/editalbum",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;