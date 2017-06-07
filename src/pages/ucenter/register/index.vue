<template>
  <div>
    注册
    <input type="text" v-model="fdata.tel" name="email">
    {{$v.fdata.tel.required}}
    {{fdata.tel}}
    <pre>{{$v}}</pre>
  </div>
</template>

<script>
  import {required, email} from "vuelidate/lib/validators";
  import regex from "../../../lib/vuelidate/regex"
  export default {
    components: {},
    data() {
      return {
        fdata: {
          tel: "13"
        }
      };
    },
    validations: {
      fdata: {
        tel: {
          email,
          required,
          regex:regex("ldldl")
        }
      }
    },
    mounted() {
      //console.log(this.$v)
    },
    beforeDestroy() {
    },
    methods: {}
  };
</script>

<style scoped lang="scss">
</style>
