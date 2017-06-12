<template>
  <header>
    <slot name="left">
      <div class="left"><font></font>返回</div>
    </slot>
    <slot>

    </slot>
    <slot name="right">
      <div class="right">右边</div>
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
  $w:2.4rem;
  header{
    position: relative;
    line-height: $w;
    display: flex;
    border-bottom: 1px solid #d1d1d5;
    >.left,.right{
      width: $w;
    }
    div:nth-child(2){
      flex:1;
      text-align: center;
    }
  }
</style>
