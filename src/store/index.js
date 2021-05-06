import { createStore } from "vuex";
import EventService from "@/services/EventService";

export default createStore({
  state: {
    user: { id: "abc123", name: "Gigi Bingi" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false },
    ],
    events: [
      { id: 1, text: "...", organizer: "..." },
      { id: 2, text: "...", organizer: "..." },
      { id: 3, text: "...", organizer: "..." },
      { id: 4, text: "...", organizer: "..." },
    ],
  },
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    activeTodosCount2: (state) => {
      return state.todos.filter((todo) => !todo.done).length;
    },
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
  },
  modules: {},
});
