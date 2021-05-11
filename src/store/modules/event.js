import EventService from "@/services/EventService";

export const state = {
  events: [],
  eventsCount: 0,
  event: {},
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_COUNT(state, count) {
    state.eventsCount = count;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvent({ commit }, event) {
    EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTS_COUNT", response.headers["x-total-count"]);
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    }
  },
};
