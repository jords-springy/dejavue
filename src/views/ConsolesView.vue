<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="consoles.length">
        <CardComp v-for="console in consoles" :key="console.name">
          <template #header>
            <h2>{{ console.name }}</h2>
          </template>
          <template #body>
            <p>Manufacturer: {{ console.manufacturer }}</p>
            <p>Release Year: {{ console.release_year }}</p>
            <p>Storage: {{ console.storage }}</p>
            <p>Price: ${{ console.price }}</p>
            <p>Best Selling Game: {{ console.best_selling_game }}</p>
          </template>
        </CardComp>
      </div>
      <div v-else>
        <p>No consoles found.</p>
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
        consoles: store.state.consoles,
      };
    },
    created() {
      this.fetchConsoles();
    },
    methods: {
      async fetchConsoles() {
        store.commit('SET_LOADING', true);
        try {
          const response = await fetch('https://jords-springy.github.io/dejavue_api/data/index.json');
          const data = await response.json();
          store.commit('SET_CONSOLES', data.gaming_consoles);
        } catch (error) {
          console.error('Failed to fetch consoles:', error);
        } finally {
          store.commit('SET_LOADING', false);
          this.loading = store.state.loading;
          this.consoles = store.state.consoles;
        }
      }
    },
    watch: {
      '$store.state.loading'(newVal) {
        this.loading = newVal;
      },
      '$store.state.consoles'(newVal) {
        this.consoles = newVal;
      }
    }
  };
  </script>
  <style scoped>
  form {
    width: 20px; /* or another valid unit */
    padding: 5px;
    text-align: center;
    margin-left: 25%;
    background-color: #092C4E;
    margin-left: auto;
    margin-right: auto;
  }
  input, select {
    background-color: #0B4580;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    width: 250px;
    padding-bottom: 5px;
  }
  label {
    padding-top: 5px;
    width: 250px;
    text-align: left;
    font-size: small;
  }
  .terms {
    display: flex;
    width: 400px;
  }
  input[type='checkbox'] {
    height: 16px;
    width: 16px;
    position: relative;
    top: 2px;
  }
  #para {
    width: 200px;
    height: 10px;
    box-sizing: content-box;
    border: 5px dashed white;
    margin: 0px;
    padding: 10px 10px 15px 5px;
    cursor: pointer;
  }
  #para:hover {
    background-color: aliceblue;
  }
</style>





