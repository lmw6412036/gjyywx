<template>
  <div ref="iscroll" class="view iscroll">
    <slot></slot>
  </div>
</template>

<script>
  import "iscroll";
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {
      setTimeout(() => {
        this.iscroll = new IScroll(this.$refs.iscroll,{
          mouseWheel: true,
          probeType:2,
          click:true
        });
        this._scroll();
        this.iscroll.on("scrollEnd", (res) => {
          console.log("scrollEnd");
        })
      }, 20)
    },
    beforeDestroy() {

    },
    methods: {
        _scroll(){
          this.iscroll.on('scroll', (res) => {
            console.log('scroll',this.iscroll.y);
            /**/
          })
        }
    }
  };
</script>

<style scoped lang="scss">

</style>
