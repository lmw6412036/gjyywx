<template>
  <div id="app">
    <router-view></router-view>
    <loading :show="loadingshow" :text="loadingtext"></loading>
  </div>
</template>

<script>
  import Loading from "./components/ui/loading.vue"
  export default {
    name: 'app',
    data(){
      return {
        loadingshow: false,
        loadingtext: "数据加载中..."
      }
    },
    computed: {},
    components: {Loading},
    mounted(){
      //console.log(this.$bus)
      this.$bus.$on('loading', (res) => {
        if (res.status == "start") {
          this.loadingshow = true;
        }
        if (res.status == "stop") {
          this.loadingshow = false;
        }
      })
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
