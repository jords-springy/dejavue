<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="cars.length">
        <CardComp v-for="car in cars" :key="car.model">
          <template #header>
            <h2>{{ car.make }} {{ car.model }}</h2>
          </template>
          <template #body>
            <p>Year: {{ car.year }}</p>
            <p>Color: {{ car.color }}</p>
            <p>Price: ${{ car.price }}</p>
          </template>
        </CardComp>
      </div>
      <div v-else>
        <p>No cars found.</p>
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
        cars: store.state.cars,
      };
    },
    created() {
      this.fetchCars();
    },
    methods: {
      async fetchCars() {
        store.commit('SET_LOADING', true);
        try {
          const response = await fetch('https://jords-springy.github.io/dejavue_api/data/index.json');
          const data = await response.json();
          store.commit('SET_CARS', data.cars);
        } catch (error) {
          console.error('Failed to fetch cars:', error);
        } finally {
          store.commit('SET_LOADING', false);
          this.loading = store.state.loading;
          this.cars = store.state.cars;
        }
      }
    },
    watch: {
      '$store.state.loading'(newVal) {
        this.loading = newVal;
      },
      '$store.state.cars'(newVal) {
        this.cars = newVal;
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





