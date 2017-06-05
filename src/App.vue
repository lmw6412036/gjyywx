<template>
  <div id="app">
    <router-view></router-view>
    <toast v-show="loading" type="loading">加载中...</toast>
    <toast v-show="toast" type="icon">{{toastText}}</toast>
    <tytoast v-bind:class="{show:tytoast}">{{tytoastText}}</tytoast>
  </div>
</template>

<script>
  import {Toast} from 'vue-weui';
  import Tytoast from "./components/toast.vue"
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
    components: {Toast, Tytoast},
    mounted(){
      setTimeout((res) => {
        this.tytoast = true;
      }, 3000)

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
      tytoast:function (res) {
        if (res == true) {
          setTimeout(() => {
            this.tytoast = false;
          }, 3000);
        }
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
