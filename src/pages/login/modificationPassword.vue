<template>
    <div>
        <top>
            <div class="middle big">修改密码</div>
            <span slot="right" class="step" @click="editPassword">下一步</span>
        </top>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
          <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patPassword.$error }">
            <input  @blur="$v.patPassword.$touch()"  class="weui-input" type="password" v-model="patPassword"  placeholder="请输入密码"/>
          </div>
        </div>
      </div>
      <span class="form-group__message" v-show="!$v.patPassword.minLength&&showPatPassWord">密码至少6位</span>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
          <div class="weui-cell__bd" >
            <input    class="weui-input" type="password" v-model="againPatPassword"  placeholder="请输入密码"/>
          </div>
        </div>
      </div>
      <span class="form-group__message" v-show="equal">俩次密码不一致</span>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    export default{
        components: {
            top
        },
      validations: {
        patPassword: {
          required,
          alphaNum,
          minLength:minLength(6)
        }
      },
        data(){
            return {
              patPassword:'',
              showPatPassWord:false,
              againPatPassword:'',
              equal:false,
              mobile:''
            }
        },
        mounted(){
          console.log(this.$route.params.mobile);
          this.$set(this.$data,'mobile',this.$route.params.mobile)
        },
      watch:{
        againPatPassword(){
          this.equal = (this.patPassword===this.againPatPassword?false:true)
        }
      },
      methods:{
        editPassword(){
          if(this.$v.patPassword.$invalid){
            this.$set(this.$data,'showPatPassWord',true)
          }else {
            Api('nethos.pat.password.modify',{
              PatMobile:this.mobile,
              patPassword:this.patPassword
            }).then(req=>{
              console.log(req,999)
              if(req.succ){
                this.$router.push({
                  name:'succeed',
                  params:{
                    msg:'密码修改成功'
                  }
                })
              }
            })

          }
        }
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
