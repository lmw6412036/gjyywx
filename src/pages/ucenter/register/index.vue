<template>
  <div>
    注册
      <input type="text" v-model="fdata.tel" name="email">
    {{$v.fdata.tel.required}}
    {{fdata.tel}}
  </div>
</template>

<script>
  import {required} from "vuelidate/lib/validators"
  export default {
    components: {},
    data() {
      return {
        fdata: {
          tel: "13"
        }
      };
    },
    validations:{
        fdata:{
            tel:{
              required
            }
        }
    },
    mounted() {
      console.log(this.$v)
    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">

</style>
