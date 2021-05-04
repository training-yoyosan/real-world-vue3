<template>
  <div class="events">
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard";
import EventService from "@/services/EventService";

export default {
  name: "EventList",

  components: {
    EventCard,
  },

  data() {
    return {
      events: null,
    };
  },

  created() {
    EventService.getEvents()
      .then((response) => {
        this.events = response.data;
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
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
