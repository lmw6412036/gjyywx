<template>
  <div>
    <cells>
      <input-cell @inputcell="input" :value="fdata.tel" label="姓名"></input-cell>
    </cells>
    <pre>{{$v}}</pre>
  </div>
</template>

<script>
  import Cells from "vue-weui/components/cells/cells.vue"
  import InputCell from "vue-weui/components/cells/input-cell.vue"
  import {required, email} from "vuelidate/lib/validators";
  import regex from "../../../lib/vuelidate/regex"
  export default {
    components: {
      Cells, InputCell
    },
    data() {
      return {
        text: "text",
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
          regex: regex("ldldl")
        }
      }
    },
    mounted() {
      this.$on('input_cell', (res) => {
        console.log("on", res);
      });
      //console.log(this.$v)
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
