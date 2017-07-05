<template>
    <div>
      <top>
        <div class="middle big">注册</div>
        <span slot="right" class="step" @click="register">注册</span>
      </top>
      <div style="margin-top: 35px">
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
            <input  @input="$v.patIdcard.$touch()"   class="weui-input" @blur="getAge" type="number" v-model="patIdcard" placeholder="请输入身份证号"/>
          </div>
        </div>
      </div>
        <span class="form-group__message" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label for="" class="weui-label">性别</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" name="select2">
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">年龄</label></div>
          <div class="weui-cell__bd">
            {{age}}
          </div>
        </div>
      </div>

    </div>
    </div>
</template>
<script type="text/ecmascript-6">
   import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
   import cd from '../../lib/vuelidate/regex'
    export default{
        components: {
            top
        },
        data(){
            return {
              patMobile:'',
              patPassword:'',
              patName:'',
              patIdcard:'',
              age:'',
              showNameError:false,
              showPatPassWord:false,
              showCd:false
            }
        },
      validations: {
        patPassword: {
          required,
          alphaNum,
          minLength:minLength(6)
        } ,patName: {
          required,
          minLength:minLength(2),
          maxLength:maxLength(15)
        },patIdcard:{
          required,
          cd:cd(15,18)
        }
      },
        mounted(){
          console.log(this.$route.params.mobile)
          this.$set(this.$data,'patMobile',this.$route.params.mobile)
        },
      computed:{

      },
      methods:{
        getAge(){
          var date = new Date;
          var year = date.getFullYear();
          var num = this.patIdcard.substring(6,10);
          var age = year-num;
          return this.$set(this.$data,'age',age)
        },
        register(){
          console.log(this.$v,888);

            if(this.$v.patPassword.$invalid){
              console.log(121212)
              this.$set(this.$data,'showPatPassWord',true)
            }else if(this.$v.patName.$invalid){
              this.$set(this.$data,'showNameError',true)
            }else if(this.$v.patIdcard.$invalid){
              this.$set(this.$data,'showCd',true)
            }else {
              Api('nethos.pat.register',{
                patMobile:this.patMobile,
                patPassword:this.patPassword,
                patName:this.patName,
                patIdcard:this.patIdcard
              }).then(req=>{
                if(req.succ){
                  this.$router.push({
                    name:'succeed',
                    params:{
                      msg:'注册成功'
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
