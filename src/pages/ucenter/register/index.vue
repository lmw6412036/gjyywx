<template>
  <div class="viewpage">
    <app-header>
      <div class="middle">用户注册</div>
    </app-header>
    <div class="view">
      <div class="weui-cells weui-cells_form">
        <we-input label="姓名" type="text" placeholder="请输入姓名" v-model="text"></we-input>
      </div>
      {{text}}
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../../components/business/app-header.vue"
  import WeInput from "../../../components/ui/form/input.vue"
  export default {
    components: {
      WeInput,AppHeader
    },
    data() {
      return {
        text: "text",
        fdata: {
          tel: "13"
        }
      };
    },
    mounted() {

    },
    beforeDestroy() {
    },
    methods: {
      input(res){
        console.log("on1", res);
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
