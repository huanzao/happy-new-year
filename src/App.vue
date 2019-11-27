<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
      };
    },
    methods: {
      
    }
  }

</script>

<style>
html,body{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.has-gutter{ /*thead 过高*/
  line-height: 35px;
}
</style>
