<template>
    <div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
          <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patPassword.$error }">
            <input  @blur="$v.patPassword.$touch()"  class="weui-input" type="password" v-model="patPassword"  placeholder="请输入密码"/>
          </div>
        </div>
      </div>
      <span class="form-group__message" v-show="!$v.patPassword.minLength&&showPatPassWord">密码至少6位</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        components: {
            top
        },
        data(){
            return {
              patPassword:''
            }
        },
      validations: {
        patPassword: {
          required,
          alphaNum,
          minLength:minLength(6)
        }
      },
        mounted(){

        }
    }
</script>
<style scoped>

</style>
