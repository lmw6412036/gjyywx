<template>
  <div id="app">
    <app-header>
      <div class="middle">标题</div>
    </app-header>
    <router-view></router-view>
    <tytoast v-bind:class="{show:tytoast}">{{tytoastText}}</tytoast>
  </div>
</template>

<script>
  import {Toast} from 'vue-weui';
  import AppHeader from './components/business/app-header.vue'
  import Tytoast from "./components/ui/toast.vue"
  export default {
    name: 'app',
    data(){
      return {
        loading: false,
        toastText: "",
        toast: false,
        tytoast: false,
        tytoastText: ""
      }
    },
    computed: {
      t(){
        return this.$store.state.news.t;
      }
    },
    components: {Toast, Tytoast, AppHeader},
    mounted(){
      console.log(this.$store.getters);
      bus.$on('loading', (res) => {
        if (res.status == "start") {
          this.loading = true;
        } else {
          this.loading = false;
        }
      });
      bus.$on('toast', (res) => {
        this.toast = res.toast;
        this.toastText = res.text;
      });
      bus.$on('tytoast', (res) => {
        this.tytoast = res.toast;
        this.tytoastText = res.text;
      });
    },
    watch: {
      toast: function (res) {
        if (res == true) {
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
      },
      tytoast: function (res) {
        if (res == true) {
          setTimeout(() => {
            this.tytoast = false;
          }, 3000);
        }
      }
    },
    methods: {
      tt(){
        this.$store.dispatch("news_t", 2)
      }
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    >.view{
      overflow: hidden;
      flex: 1;
  }
  }
  .loading {
    display: none;
    width: 10rem;
    height: 10rem;
    position: fixed;
    left: 5rem;
    top: 5rem;
    border-radius: .5rem;
    background-color: rgba(0, 0, 0, .5);
    z-index: 201706011157;
    text-align: center;
    padding-top: 1rem;
    img {
      width: 4rem;
    }
    p {
      color: white;
      padding-top: 1rem;
    }
  }
</style>
