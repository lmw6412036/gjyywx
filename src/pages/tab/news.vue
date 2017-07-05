<template>
  <div class="viewpage view">
    <app-header>
      <div class="middle big">健康资讯</div>
    </app-header>
    <iscroll-view @iscroll_pulldown="pulldown">
      <ul>
        <li v-for="i in 10">{{i}}</li>
      </ul>
    </iscroll-view>
  </div>
</template>
<script>
  import Api from "../../lib/api"
  import AppHeader from "../../components/business/app-header.vue"
  import IscrollView from "../../components/business/iscroll-view.vue"
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
      AppHeader,
      IscrollView},
    mounted() {
        this._getData();
      console.log(weui.alert('11111'))
    },
    beforeDestroy() {

    },
    methods: {
        async _getData(){
          let data=await Api("nethos.system.web.pat.index",{})
          console.log(data);
        },
        pulldown(){
            alert(1);
        }
    }
  };
</script>

<style scoped lang="scss">

</style>
