<template>
  <div id="loadingToast" v-if="show">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">{{text}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text:String,
      show:Boolean
    },
    data() {
      return {};
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  #ty_toast {
    position: fixed;
    left: 0;
    bottom: -3rem;
    transition: all 0.25s ease;
    width: 20rem;
    text-align: center;
    span {
      border-radius: .3rem;
      background-color: rgba(0, 0, 0, .6);
      color: white;
      padding: .3rem .5rem;
    }
    &.show {
      bottom: 3rem;
    }
  }
</style>
