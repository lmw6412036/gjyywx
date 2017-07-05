<template>
    <div>
        <top>
            <div class="middle big">添加就诊人</div>
            <span slot="right" class="step" @click="commit">确认添加</span>
        </top>
      <div class="wrap">
        <div style="margin-top: 35px">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model="patName"  placeholder="请输入姓名"/>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" @blur="getAge" type="text" v-model="patIdcard" placeholder="请输入身份证号"/>
              </div>
            </div>
          </div>
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
              <div class="weui-cell__hd">
                <label for="" class="weui-label">性别</label>
              </div>
              <div class="weui-cell__bd">
                <select class="weui-select" name="select2" v-model="compatGender">
                  <option value="M">男</option>
                  <option value="W">女</option>
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
        <div>
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
              </div>
            </div>
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
            return {
              patName:'',
              patIdcard:'',
              mobile:'',
              captcha:'',
              age:'',
              compatGender:'M',
              cid:'',
              patId:''
            }
        },
        mounted(){
          var patId = this.$route.params.patId;
          this.$set(this.$data,'patId',patId)
        },
      methods:{
        getAge(){
          var date = new Date;
          var year = date.getFullYear();
          var num = this.patIdcard.substring(6,10);
          var age = year-num;
          return this.$set(this.$data,'age',age)
        },
        commit(){
          Api('nethos.pat.compat.add',{
            compatName:this.patName,
            compatIdcard:this.patIdcard,
            compatMobile:this.mobile,
            captcha:this.captcha,
            compatGender:this.compatGender,
            cid:this.cid,
            patId:this.patId,
            token:token
          }).then(req=>{
            if(req.succ){
              alert('添加成功');
              this.$router.push('qkfzInquiry')
            }
          })
        },
        getCode(){
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
</script>
<style scoped>
    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
</style>
