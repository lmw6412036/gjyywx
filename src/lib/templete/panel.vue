<template>
  <div>
    <a class="weui-cell" :class="{'weui-cell_access':arrow}" href="javascript:;" @click="update">
        <div class="weui-cell__hd">
            <slot name="picture"><img src="../../../src/assets/u6883.png" class="figure"></slot>
    </div>
        <div class="weui-cell__bd">
            <slot name="article"></slot>
        </div>
        <div class="weui-cell__ft">
        <slot name="ft"></slot>
            </div>
    </a>
  </div>
</template>

<script>
  export default {
      props:{
            hasArrow:{
                type:String,
                default:"true",
                required:false
            }
      },
    data() {
      return {
          arrow:true

      };
    },
    computed:{

    },
    components:{

    },
    mounted() {
        this.arrow=eval(this.hasArrow);

    },
    beforeDestroy() {

    },
    methods: {
        update(){
            this.$emit("activate");
        }

    }
  };
</script>

<style scoped lang="scss">

</style>
