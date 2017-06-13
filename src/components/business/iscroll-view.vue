<template>
  <div class="view iscroll viewpage">
    <div  slot="pullup" class="pullup tac">
      <!--<font class="font"></font>
      <span class="normal">松开刷新</span>-->
    </div>
    <div ref="iscroll" class="wrapper view">
      <slot></slot>
    </div>
    <div slot="pulldown" class="pulldown"></div>
  </div>
</template>

<script>
  import "iscroll";
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {
      setTimeout(() => {
        this.iscroll = new IScroll(this.$refs.iscroll,{
          mouseWheel: true,
          probeType:2,
          click:true,
          HWCompositing:false
        });
        this._scroll();
        this._scrollEnd();
      }, 20)
    },
    beforeDestroy() {

    },
    methods: {
        _scroll(){
          this.iscroll.on('scroll', (res) => {
            console.log('scroll',this.iscroll.y,this.iscroll.maxScrollY);
            if(this.iscroll.y<this.iscroll.maxScrollY){
                this.$emit("iscroll_pulldown",true);
            }
            if(this.iscroll.y>0){
              this.$emit("iscroll_pullup",true);
            }
            /**/
          })
        },
      _scrollEnd(){
          this.iscroll.on('scrollEnd',(res)=>{})
      }
    }
  };
</script>

<style scoped lang="scss">
  .iscroll{
    position: relative;
    .pullup{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 45px;
    }
  }
</style>
