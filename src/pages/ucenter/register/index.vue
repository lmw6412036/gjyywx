<template>
  <div>

  </div>
</template>

<script>
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
