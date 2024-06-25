<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="friends.length">
        <CardComp v-for="friend in friends" :key="friend.id" :gender="friend.gender">
          <template #header>
            <h2>{{ friend.firstName }} {{ friend.lastName }}</h2>
          </template>
          <template #body>
            <p>{{ friend.contactDetails }}</p>
          </template>
        </CardComp>
      </div>
      <div v-else>
        <p>No friends found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import CardComp from '../components/CardComp.vue';
  import store from '../store';
  
  export default {
    components: { CardComp },
    data() {
      return {
        loading: store.state.loading,
        friends: store.state.friends,
      };
    },
    created() {
      this.fetchFriends();
    },
    methods: {
      async fetchFriends() {
        store.commit('SET_LOADING', true);
        try {
          const response = await fetch('https://jords-springy.github.io/dejavue_api/data/index.json');
          const data = await response.json();
          store.commit('SET_FRIENDS', data.friends);
        } catch (error) {
          console.error('Failed to fetch friends:', error);
        } finally {
          store.commit('SET_LOADING', false);
          this.loading = store.state.loading;
          this.friends = store.state.friends;
        }
      }
    },
    watch: {
      '$store.state.loading'(newVal) {
        this.loading = newVal;
      },
      '$store.state.friends'(newVal) {
        this.friends = newVal;
      }
    }
  };
  </script>
  