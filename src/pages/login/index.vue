<template>
  <div>
    <top>
      <div class="middle big">请先登录</div>
    </top>
    <div>
      <div class="title">
        <span  style="font-size: 30px;font-weight: 500">
          广济医院
        </span>
      </div>
      <div class="px2">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="number" v-model="patMobile" placeholder="请输入账号"/>
            </div>
          </div>
        </div>
        <div class="weui-cell bg-white">
          <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" v-model="patPassword"  placeholder="请输入密码"/>
          </div>
        </div>
      </div>
      <div class="login" style="margin-top: 25px">
        <a href="javascript:;" class="weui-btn weui-btn_plain-primary" @click="login">登录</a>
      </div>
      <div class="bottom">
        <div class="regis" @click="goRegister">注册新账号</div>
        <div class="regis" @click="goForgetPassword">忘记密码</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import top from '../../components/business/app-header.vue'
  import Api from "../../lib/api"
  import local from '../../lib/cache'

  export default {
    data(){
      return {
        patMobile:'',
        patPassword:''

      }
    },
    components:{
      top
    },
    mounted(){

    },
    methods:{
      goRegister(){
        this.$router.push('register')
      },
      login(){
//       var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
        Api('nethos.pat.login',{
          patMobile:this.patMobile,
          patPassword:this.patPassword
        }).then(req=>{
          if(req.succ){
            localStorage.setItem('token',req.token)
            this.$router.push('online')
          }else {
            alert('账号或者密码错误')
          }
        })

      },
      goForgetPassword(){
        this.$router.push({
          name:"forgetPassword",
          params:{
            msg:'忘记密码'
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.title{
  height: 200px;
  line-height: 200px;
  text-align: center;
}
  .bg-white{
    background: white;
  }
  .bottom{
    width: 100%;
    position: fixed;
    left: 0px;
    bottom: 15px;
    text-align: center;
  }
  .regis{
    width: 100%;
    text-align: center;
    padding-bottom: 15px;
  }
  .login{
    padding: 25px 15px 0 15px;
  }
</style>
