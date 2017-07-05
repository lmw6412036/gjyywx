<template>
  <div ref="swiper" class="view swiper-view">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import Load from "../../lib/swiper/load"
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {},
    created(){

    },
    mounted() {
      setTimeout((res) => {
        Load("/static/js/swiper/swiper-3.4.2.min.js")
          .then((res) => {
            this.swiper = new Swiper(this.$refs.swiper, {
              direction: "vertical",
              slidesPerView: "auto",
              onSliderMove: this._onSliderMove
            });
          })
      }, 20)
    },
    beforeDestroy() {

    },
    methods: {
      _onSliderMove(res){
        //res.virtualSize-res.height
        //res.progress
        console.log(res, res.translate, res.progress);
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
