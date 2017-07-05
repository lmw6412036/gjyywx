<template>
    <div>
        <top>
            <div class="middle big">账户相关</div>
        </top>
      <div class="wrap">
        <div>
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goChangePhone">
              <div class="weui-cell__bd">
                <p>修改绑定手机号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="changePassword">
              <div class="weui-cell__bd">
                <p>修改密码</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>

          </div>
        </div>
        <div class="btn" @click="quit">
          <a href="javascript:;" class="weui-btn weui-btn_primary">退出登录</a>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    var token = localStorage.getItem('token')
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){

        },
      methods:{
        goChangePhone(){
          this.$router.push('changePhone')
        },
        changePassword(){
          this.$router.push({
            name:'forgetPassword',
            params:{
              msg:'修改密码'
            }
          })
        },
        quit(){
          Api('nethos.pat.logout',{
            token:token
          }).then(req=>{
            if(req.succ){
              console.log(req);
              this.$router.push('login')
            }else {
              alert(req.msg)
            }

          })
        }
      }
    }
</script>
<style scoped>
.btn{
  position: fixed;
  left: 0;
  bottom: 20px;
  box-sizing: border-box;
 padding: 0 10px;
  width: 100%;
}
</style>
