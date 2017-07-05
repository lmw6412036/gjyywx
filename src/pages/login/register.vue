<template>
  <div>
  <top>
    <div class="middle big">注册</div>
    <span slot="right" class="step" @click="goNext">下一步</span>
  </top>
  <div style="margin-top: 35px">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
          <input  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
        </div>
      </div>
      <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" v-model="captcha" placeholder="请输入验证码"/>
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn" @click="getCode">获取验证码</button>
        </div>
      </div>
     </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { required, between, minLength, maxLength} from 'vuelidate/lib/validators'
  import phone from '../../lib/vuelidate/regex'
  import top from '../../components/business/app-header.vue'
  import Api from '../../lib/api'
  export default{
    components:{
      top
    },
    data(){
      return {
        mobile:'',
        captcha:'',
        cid:'',
        showError:false,
        msg:''
      }
    },
    validations: {
      mobile: {
        required,
        phone:phone(1)
      }
    },
    mounted(){

    },
    methods:{
      goNext(){
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else{

          Api('nethos.system.captcha.checkcaptcha',{
            mobile:this.mobile,
            captcha:this.captcha,
            cid:this.cid
          }).then(req=>{
            console.log(req,5555)
            this.$router.push({
              name:'next',
              params:{
                mobile:this.mobile
              }
            })
          })
        }


      },
      getCode(){
        console.log(this.$v.$invalid);
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else {
          Api('nethos.system.captcha.generate',{
            captchaType:'SMS',
            mobile:this.mobile
          }).then(req=>{
            this.$set(this.$data,'cid',req.obj)
            console.log(this.cid,3333)
          })
        }

      }
    }
  }
</script>
<style scoped>
  .step{
      padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
</style>
