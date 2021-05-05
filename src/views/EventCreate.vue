<template>
  <div>
    <h1>Create an Event, {{ userName }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <ul>
      <li v-for="category of categs" :key="category">
        {{ category }}
      </li>
    </ul>
    <p>There are {{ catLength }} categories</p>
    <p>{{ getEvent(1) }}</p>
    <p>{{ getEventById(2) }}</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "EventCreate",

  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapState({
      userID: (state) => state.user.id,
      // can be used for top level state
      categs: "categories",
    }),
    ...mapState(["user", "categories"]),
    getEvent() {
      return this.$store.getters.getEventById;
    },
    ...mapGetters(["getEventById"]),
  },
};
</script>

<style scoped></style>
