<template>
  <div id="ty_toast">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

    }
  };
</script>

<style scoped lang="scss">
  #ty_toast{
    position: fixed;
    left: 0;
    bottom: -3rem;
    transition:all 0.25s ease;
    width: 20rem;
    text-align: center;
    span{
      border-radius: .3rem;
      background-color: rgba(0,0,0,.6);
      color: white;
      padding: .3rem .5rem;
    }
    &.show{
      bottom: 3rem;
    }
  }
</style>
