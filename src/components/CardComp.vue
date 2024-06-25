<template>
    <div class="card" :class="{ 'Male': gender === 'Male', 'Female': gender === 'Female' }">
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
  
  .Male {
    border-color: gold;
  }
  
  .Female {
    border-color: green;
  }
  </style>
  