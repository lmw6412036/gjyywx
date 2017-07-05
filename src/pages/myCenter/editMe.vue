<template>
  <div>
    <top>
      <div class="middle big">常用就诊人</div>
      <span slot="right" class="step"@click="saveEdit">保存修改</span>
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
          <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
          <div class="weui-cell__bd">
            {{patIdcard}}
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
          <div class="weui-cell__bd">
            {{mobile}}
          </div>
          <div class="arrow" @click="changePhone">
            &gt;
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">性别</label></div>
          <div class="weui-cell__bd">
            {{patDetail.patGender=='M'?'男':'女'}}
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">年龄</label></div>
          <div class="weui-cell__bd">
            {{age}}
          </div>
        </div>
      </div>
      <div class="binding" @click="bindCode">
        +  绑定就案号
      </div>
      <div class="illustrate">
        只有在浙二医院看过病的人才有病案号。绑定病案号后可使用更多院内服务；请保证就诊人姓名、身份证、手机号和在医院留的一致，然后直接点击上方按钮即可。
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
      }
    },
    data(){
      return {
        patName:'',
        patIdcard:'',
        showNameError:false,
        mobile:'',
        patId:'',
        age:'',
        patDetail:{}
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        Api('nethos.pat.info.get',{
          token:token
        }).then(req=>{
          console.log(req,56666);
          if(req.succ){
            this.$set(this.$data,'patDetail',req.obj)
            this.$set(this.$data,'patName',req.obj.patName);
            this.$set(this.$data,'patIdcard',req.obj.patIdcard);
            this.$set(this.$data,'mobile',req.obj.patMobile);
            this.$set(this.$data,'age',req.obj.age);
            this.$set(this.$data,'patId',req.obj.patId);
          }else {
            alert('获取失败')
          }
        })
      },
      saveEdit(){
        if(this.$v.patName.$invalid){
          this.$set(this.$data,'showNameError',true)
        } else {
          Api('nethos.pat.info.modify',{
            token:token,
            patId:this.patId,
            patName:this.patName
          }).then(req=>{
            console.log(req);
            if(req.succ){
              alert('成功');
              this.$router.push('myCenter')
            }else {
              alert(req.msg)
            }

          })

        }
      },
      bindCode(){
        Api('nethos.book.compat.bind',{
          token:token,
          compatId:this.patId
        }).then(req=>{
          console.log(req,999999);
          if(req.succ){

          }else {
            this.$router.push('feedback')
          }
        })
      },
      changePhone(){
        this.$router.push('changePhone')
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
  .arrow{
    color: gray;
    font-weight: 800;
  }
  .binding{
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    margin-top: 15px;
    background: white;
    color: blue;
  }
  .illustrate{
    box-sizing: border-box;
    padding: 10px;
    color: gray;
    font-size: 14px;
  }

</style>
