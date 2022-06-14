<template>
  <v-row>
  <v-col cols="1" 
        sm="2">
      <span > * </span>
  </v-col>
    <v-col cols="4" sm="2">
      <span  style="font-size:20px;">{{ track.track_name }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    track: Object,
  },
  data() {
    return {};
  },
  methods: {
    deletetrack() {
      this.$emit("deletetrack");
    },
    updatetrack() {
      this.$emit("updatetrack");
    },
    viewtrack() {
      this.$emit("viewtrack");
    }
  },
};
</script>

<style></style>
