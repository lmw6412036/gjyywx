<template>
  <div class="viewpage view">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from "../../components/base/app-header.vue"
  import AppFooter from "../../components/base/app-footer.vue"
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
      AppHeader, AppFooter
    },
    mounted() {
		console.log(7897979)
    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  .tab {
    display: flex;
    flex-direction: column;
  }
</style>
