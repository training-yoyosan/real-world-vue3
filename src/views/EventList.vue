<template>
  <div class="events">
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <template v-if="page != 1">
        <router-link
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          >Prev page
        </router-link>
        |
      </template>

      <template v-if="perPage * page < eventsCount">
        <router-link
          :to="{ name: 'EventList', query: { page: page + 1 } }"
          rel="next"
          >Next page
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard";
import { mapState } from "vuex";

export default {
  name: "EventList",

  components: {
    EventCard,
  },

  data() {
    return {
      perPage: 3,
    };
  },

  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: this.perPage,
      page: this.page,
    });
  },

  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events", "eventsCount"]),
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
