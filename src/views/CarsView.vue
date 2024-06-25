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
  