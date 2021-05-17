import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  eventsCount: 0,
  event: {},
  perPage: 3,
}

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_COUNT(state, count) {
    state.eventsCount = count
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)

        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        }

        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message,
        }

        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_COUNT', response.headers['x-total-count'])
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        }

        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
          return response.data
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching the event: ' + error.message,
          }

          dispatch('notification/add', notification, { root: true })
        })
    }
  },
}
