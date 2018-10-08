<style>
 /* @import "./assets/css/caimao/index.css";*/
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

<template>
  <div id="app">
    <transition :name="transitionName">
    <keep-alive>

      <router-view v-if="$route.meta.keepAlive"></router-view>

    </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

  export default {

    name: 'App',
    data(){
      return{
        transitionName:'',
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }

  }
</script>

