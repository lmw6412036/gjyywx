<template>
    <div>
        <top>
            <div class="middle big"></div>
            <span slot="right" class="step"></span>
        </top>
      <div class="wrap">
       <div class="icon">
         <i class="weui-icon-warn weui-icon_msg"></i>
       </div>
        <div style="text-align: center;padding-bottom: 15px">
          未查询到病案号
        </div>
        <div>
          <p>请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化，请前往医院窗口修改。</p>
          <p>若该就诊人未在医院建档，请前往医院窗口办理。</p>
        </div>
      </div>
      <div v-show="succeed" class="wrap">
       <div class="icon">
         <i class="weui-icon-success weui-icon_msg"></i>
       </div>
        <div style="text-align: center;padding-bottom: 15px">
          <p>绑定成功，您的病案号是</p>
          <p>10086</p>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    export default{
        components: {
            top
        },
        data(){
            return {
              succeed:false
            }
        },
        mounted(){

        }
    }
</script>
<style scoped>
    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
  .icon{
    text-align: center;
    box-sizing: border-box;
    padding: 15px 0;
  }
  .wrap{
    box-sizing: border-box;
    padding: 15px;
    background: white;
    margin-top: 20px;
  }
</style>
