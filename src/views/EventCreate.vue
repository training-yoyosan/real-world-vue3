<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        placeholder="Add an event title"
        type="text"
        v-model="event.title"
        class="field"
      />
      <BaseInput
        label="Description"
        placeholder="Add an description"
        type="text"
        v-model="event.description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        placeholder="Add a location"
        type="text"
        v-model="event.location"
        class="field"
      />
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
      <input class="button -fill-gradient" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Datepicker from 'vuejs3-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'EventCreate',

  components: {
    Datepicker,
    BaseInput,
  },

  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      ...mapState(['user']),
      event: this.createFreshEventObject(),
      times,
    }
  },

  computed: {
    userName() {
      return this.$store.state.user.user.name
    },
    catLength() {
      return this.$store.getters.catLength
    },
    ...mapState({
      userID: (state) => state.user.user.id,
      // can be used for top level state
      categs: 'categories',
    }),
    ...mapState(['categories']),
    getEvent() {
      return this.$store.getters.getEventById
    },
    ...mapGetters(['getEventById']),
  },

  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user
      // Why is this.user undefined? Because it doesn't exist yet
      // console.log(this.user);
      const id = Math.floor(Math.random() * 10000000)

      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: new Date(),
        time: '',
        attendees: [],
      }
    },
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          NProgress.start()

          this.$router.push({
            name: 'EventDetails',
            params: { id: this.event.id },
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log('There was a problem creating your event')
          NProgress.done()
        })
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
