<template>
    <div>
      <top>
        <div class="middle big">{{msg}}</div>
      </top>
      <div style="margin-top: 10px;height: 200px;line-height: 200px;text-align: center">
        <div class="page__bd page__bd_spacing">
          <div class="icon-box">
            <i class="weui-icon-success weui-icon_msg"></i>
            <div class="icon-box__ctn">
              <!--<h3 class="icon-box__title">注册成功</h3>-->
            </div>
          </div>
          </div>
        </div>
      <div class="bottom" style="margin-top: 100px">
        <a href="javascript:;" class="weui-btn weui-btn_plain-primary" @click="login">立即登录</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    export default{
        components: {
            top
        },
        data(){
            return {
              msg:''
            }
        },
        mounted(){
          this.$set(this.$data,'msg',this.$route.params.msg)
        },
      methods:{
        login(){
          this.$router.push('/')
        }
      }
    }
</script>
<style scoped>
  .bottom{
    padding: 0 15px;
  }
</style>
