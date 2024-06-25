<template>
    <div class="card" :class="{ 'male': gender === 'male', 'female': gender === 'female' }">
      <slot name="header"></slot>
      <slot name="body"></slot>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      gender: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }
  
  .male {
    border-color: gold;
  }
  
  .female {
    border-color: green;
  }
  </style>
  