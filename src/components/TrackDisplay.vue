<template>
  <v-row>
    <v-col cols="4" sm="2">
      <span>{{ track.track_name }}</span>
    </v-col>
    <v-col cols="4" sm="4">
      <span> {{ track.track_description }}</span>
    </v-col>
    <v-col cols="4" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updatetrack" />
    </v-col>
    <v-col cols="4" sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewtrack" />
    </v-col>
    <v-col cols="4" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deletetrack" />
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
