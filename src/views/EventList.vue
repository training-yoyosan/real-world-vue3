<template>
  <div class="events">
    <h2>Events Listing for {{ user.user.name }}</h2>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <div class="pagination">
      <template v-if="page != 1">
        <router-link
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          >Prev page
        </router-link>
        |
      </template>

      <template v-if="hasNextPage">
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
import EventCard from '@/components/EventCard'
import { mapState } from 'vuex'

export default {
  name: 'EventList',

  components: {
    EventCard,
  },

  data() {
    return {
      perPage: 3,
    }
  },

  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page,
    })
  },

  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.perPage * this.page < this.event.eventsCount
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
