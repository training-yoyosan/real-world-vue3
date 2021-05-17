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
import store from '@/store/index'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1

  store.dispatch('event/fetchEvents', { page: currentPage }).then(() => {
    routeTo.params.page = currentPage

    next()
  })
}

export default {
  name: 'EventList',

  props: {
    page: {
      type: Number,
      required: true,
    },
  },

  components: {
    EventCard,
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },

  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },

  computed: {
    hasNextPage() {
      return this.event.perPage * this.page < this.event.eventsCount
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
