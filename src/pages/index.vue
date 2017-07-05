<template>
  <iscroll-view>
    <div @click="alert" class="swiper-wrapper">
      <div class="swiper-slide" style="line-height: 60px;height: 60px" v-for="i in 10">
        {{i}}
      </div>
    </div>
  </iscroll-view>
</template>

<script>
  import IscrollView from "../components/business/iscroll-view.vue"
  import SwiperView from "../components/business/swiper-view.vue"
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
      IscrollView,
      SwiperView
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      alert(){
        alert(1)
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
