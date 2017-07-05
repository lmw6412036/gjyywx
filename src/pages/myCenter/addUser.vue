<template>
    <div>
        <top>
            <div class="middle big">添加就诊人</div>
            <span slot="right" class="step" @click="submit">确认添加</span>
        </top>
        <div class="wrap">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
              <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patName.$error }">
                <input  @blur="$v.patName.$touch()" class="weui-input" type="text" v-model="patName"  placeholder="请输入姓名"/>
              </div>
            </div>
            <span class="form-group__message" v-if="!$v.patName.minLength&&showNameError">姓名至少2位</span>
            <span class="form-group__message" v-if="!$v.patName.maxLength&&showNameError">姓名至多15位</span>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label" >身份证号</label></div>
              <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patIdcard.$error }">
                <input  @input="$v.patIdcard.$touch()"   class="weui-input" type="number" v-model="patIdcard" placeholder="请输入身份证号"/>
              </div>
            </div>
          </div>
          <span class="form-group__message" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>

          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
              <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
                <input  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
              </div>
            </div>
            <span class="form-group__message" v-show="!$v.mobile.cd&&showPhoneError">请输入正确的手机号</span>
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
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    import cd from '../../lib/vuelidate/regex'
    var token = localStorage.getItem('token');
    export default{
        components: {
            top
        },
      validations: {
       patName: {
          required,
          minLength:minLength(2),
          maxLength:maxLength(15)
        },patIdcard:{
          required,
          cd:cd(15,18)
        },
        mobile: {
          required,
          cd:cd(1)
        }
      },
        data(){
            return {
              patName:'',
              patIdcard:'',
              showNameError:false,
              showCd:false,
              showPhoneError:false,
              mobile:'',
              captcha:'',
              cid:'',
              patId:''
            }
        },
        mounted(){
          this.$set(this.$data,'patId',this.$route.params.patId)
        },
      methods:{
        getCode(){
          console.log(1111)
          if(this.$v.mobile.$invalid){
            console.log(this.$v)
            this.$set(this.$data,'showPhoneError',true)
          }else {
            console.log(2222)
            Api('nethos.system.captcha.generate',{
              captchaType:'SMS',
              mobile:this.mobile
            }).then(req=>{
              this.$set(this.$data,'cid',req.obj)
              console.log(this.cid,3333)
            })
          }
        },
        submit(){
          if(this.$v.patName.$invalid){
            this.$set(this.$data,'showNameError',true)
          }else if(this.$v.patIdcard.$invalid){
            this.$set(this.$data,'showCd',true)
          }else if(this.captcha.length!=4){
            weui.alert('请输入正确的验证码')
          }else {
            alert('成功');
            Api('nethos.pat.compat.add',{
              token:token,
              patId:this.patId,
              compatName:this.patName,
              compatMobile:this.mobile,
              compatIdcard:this.patIdcard,
              cid:this.cid,
              captcha:this.captcha
            }).then(req=>{
              console.log(req,232323);
              if(req.succ){
                alert('添加成功')
                this.$router.push('users')
              }else{
                alert(req.msg)
              }
            })
          }
        },
      }
    }
</script>
<style scoped>
    .step {
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
