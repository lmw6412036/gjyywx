<template>
  <div>
    <top>
      <div class="middle big">修改绑定手机号</div>
      <span slot="right" class="step" @click="goNext">下一步</span>
    </top>
    <div style="margin-top: 35px">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">新手机号</label></div>
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
            <input class="weui-input" type="tel" v-model="newCaptcha" placeholder="请输入验证码"/>
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
  var token = localStorage.getItem('token')
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
        newCid:'',
        newCaptcha:''
      }
    },
    validations: {
      mobile: {
        required,
        phone:phone(1)
      }
    },
    mounted(){
      console.log(this.$route.params.cid,this.$route.params.captcha)
      this.$set(this.$data,'cid',this.$route.params.cid)
      this.$set(this.$data,'captcha',this.$route.params.captcha)
    },
    methods:{
      goNext(){
          Api('nethos.pat.mobile.modify',{
            captcha:this.captcha,
            cid:this.cid,
            newCid:this.newCid,
            newCaptcha:this.newCaptcha,
            token:token
          }).then(req=>{
            console.log(req,3363663)
            if(req.succ){
              this.$router.push({
                name:'succeed',
                params:{
                  msg:'成功修改绑定手机号'
                }
              })
            }else {
              alert(req.msg)
            }
          })
      },
      getCode(){
        console.log(this.$v.$invalid);
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else {
          console.log(898989)
          Api('nethos.system.captcha.generate',{
            captchaType:'SMS',
            mobile:this.mobile
          }).then(req=>{
            this.$set(this.$data,'newCid',req.obj)
            console.log(this.newCid,3333)
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
