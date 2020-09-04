<template>
  <div id="app">
    <SideBar/>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
:root {
  --accent-color: #469c36;
  --accent-lighter: #4ab037;
  --dark-bgcolor: #525252;
  --light-bgcolor: white;
  --dark-accent: #242424;
}

body {
    margin: 0;
    font-family: Helvetica;
    background-color: var(--light-bgcolor);
    overflow: hidden;
}
</style>
