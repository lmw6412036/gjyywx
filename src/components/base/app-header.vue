<template>
  <header>
    <slot name="left">
      <div class="left"><font>返回</font></div>
    </slot>
    <slot></slot>
    <slot name="right">
      <div class="right"></div>
    </slot>
  </header>
</template>

<script>
  export default {
    props: {},
    data() {
      return {};
    },
    computed: {},

    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  $w:45px;
  header{
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: white;
    display: flex;
    >.left,.right{
      text-align: center;
      width: $w;
    }
    div:nth-child(2){
      flex:1;
      text-align: center;
    }
  }
</style>
