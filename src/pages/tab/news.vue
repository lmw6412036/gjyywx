<template>
  <div class="viewpage view">
    <app-header>
      <div class="middle big">健康资讯</div>
    </app-header>

  </div>
</template>
<script>
  import Api from "../../lib/api"
  import AppHeader from "../../components/base/app-header.vue"
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
      AppHeader},
    mounted() {
        this._getData();
        this._getList();
    },
    beforeDestroy() {

    },
    methods: {
        _getData(){},
        _getList(){}
    }
  };
</script>

<style scoped lang="scss">

</style>
