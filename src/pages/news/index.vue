<template>
  <div>
  </div>
</template>

<script>
  import api from "../../lib/api";
  export default {
    data(){
      return {}
    },
    mounted(){
      api("nethos.system.information.type.list", {})
        .then((res) => {
          console.log(res);
          bus.$emit('tytoast', {toast: true, text: '加载成功'});
          bus.$emit("toast", {toast: true, text: '加载成功'})
        });
    }

  }
</script>

<style scoped lang="scss">

</style>
