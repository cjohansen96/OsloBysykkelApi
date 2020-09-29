<template>
  <div id="app">
    <CityBike/>
  </div>
</template>

<script>
import CityBike from './components/CityBike.vue'

export default {
  name: 'App',
  components: {
    CityBike
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
