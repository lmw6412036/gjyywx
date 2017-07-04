<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  //import WeuiForVue from "weui-for-vue"
  import {Msg, Loading, Toast} from "weui-for-vue"
  export default {
    name: 'app',
    data(){
      return {
        show: true
      }
    },
    computed: {},
    components: {
      Msg, Loading, Toast
    },
    mounted(){

    },
    watch: {},
    methods: {}
  }
</script>

<style lang="scss">
  @import "common/base";
  #app {
    position: fixed;
    background-color: map_get($colors, bg);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .view {
      flex: 1;
      overflow: hidden;
    }
    .viewpage {
      display: flex;
      flex-direction: column;
    }
  }
</style>
