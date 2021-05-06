<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" inputFormat="yyyy-MM-dd" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Datepicker from "vuejs3-datepicker";

export default {
  name: "EventCreate",

  components: {
    Datepicker,
  },

  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }

    return {
      event: this.createFreshEventObject(),
      times,
    };
  },

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

  methods: {
    createFreshEventObject() {
      const user = this.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: new Date(),
        time: "",
        attendees: [],
      };
    },
    createEvent() {
      this.$store
        .dispatch("createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "EventDetails",
            params: { id: this.event.id },
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          console.log("There was a problem creating your event");
        });
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
