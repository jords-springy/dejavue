import { createStore } from 'vuex';

export default createStore({
  state: {
    cars: [],
    consoles: [],
    friends: [],
    loading: false,
  },
  mutations: {
    SET_CARS(state, cars) {
      state.cars = cars;
    },
    SET_CONSOLES(state, consoles) {
      state.consoles = consoles;
    },
    SET_FRIENDS(state, friends) {
      state.friends = friends;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async fetchCars({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await fetch('https://jords-springy.github.io/dejavue_api/data/index.json');
        const data = await response.json();
        commit('SET_CARS', data.cars);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchConsoles({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await fetch('https://jords-springy.github.io/dejavue_api/data/index.json');
        const data = await response.json();
        commit('SET_CONSOLES', data.gaming_consoles);
      } catch (error) {
        console.error('Failed to fetch consoles:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchFriends({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await fetch('https://jords-springy.github.io/dejavue_api/data/index.json');
        const data = await response.json();
        commit('SET_FRIENDS', data.friends);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    cars: (state) => state.cars,
    consoles: (state) => state.consoles,
    friends: (state) => state.friends,
    loading: (state) => state.loading,
  }
});
