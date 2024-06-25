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
  <style scoped>
  #parent{
      display: flex;
  }
  form{
      width: 20cap;
      padding: 5cap;
      text-align: center;
      margin-left: 25%;
      background-color: #092C4E;
      margin-left: auto;
      margin-right: auto;
  }
  input, select{
      background-color: #0B4580;
      border: 1px whitesmoke solid;
      border-radius: 5px;
      width: 250px;
      padding-bottom: 5px;
  }
  label{
     padding-top:5px ;
      width: 250px;
      text-align: left;
      font-size: small;
  }
  .terms{
     display: flex;
     width: 400px;
  }
  input[type='checkbox']{
      height: 16px;
      width: 16px;
      position: relative;
      top: 2px;
  }
  #para{
      width: 200px;
      height: 10px;
      box-sizing: content-box;
      border: white dashed 5px;
      margin: 0px;
      padding: 10px 10px 15px 5px;
      cursor: pointer;
  }
  #para:hover{
      background-color: aliceblue;
  }
</style>







