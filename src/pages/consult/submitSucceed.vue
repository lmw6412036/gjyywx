<template>
    <div>
        <top>
            <div class="middle big"></div>
        </top>
      <div class="wrap">
        <div class="contain">
          <i class="weui-icon-success weui-icon_msg"></i>
        </div>
        <div class="response">
          <h3>提交成功</h3>
          <p>您的问诊申请已经提交，我们会尽快解答你得问题哦</p>
        </div>
        <div class="bottom">
          <a href="javascript:;" class="weui-btn weui-btn_default">查看申请记录</a>
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
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped>
  .wrap{
    margin-top: 20px;
  }
.contain{
  box-sizing: border-box;
  text-align: center;
  padding: 20px 10px;
}
  .response{
    text-align: center;
    padding: 10px;
  }
  .response p{
    padding-top: 15px;
  }
  .bottom{
    position: fixed;
    left: 0;
    bottom: 130px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }
</style>
