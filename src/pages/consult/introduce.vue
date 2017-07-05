<template>
    <div>
        <top>
            <div class="middle big">全科分诊</div>
            <span slot="right" class="step" @click="goMyInquiry">我的问诊</span>
        </top>
      <div class="contain">
        <div class="introduce">
          <p>身体不适不知道看什么科？</p>
          <p>小病，保养，需要咨询一下？</p>
          <p>值班医生快速为你响应！</p>
          <p>(响应时间，周一到周五，8:30-17:30)</p>
        </div>
      </div>
      <label for="weuiAgree" class="weui-agree">
        <input v-model="agree" id="weuiAgree" type="checkbox" class="weui-agree__checkbox"/>
            <span class="weui-agree__text">
                阅读并同意<a href="javascript:void(0);">《相关条款》</a>
            </span>
      </label>

      <div class="bottom">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="goPictureInquiry"> 立即咨询</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    export default{
        components: {
            top
        },
        data(){
            return {
              agree:''
            }
        },
        mounted(){

        },
      methods:{
        goMyInquiry(){
          this.$router.push('myInquiry')
        },
        goPictureInquiry(){
          console.log(this.agree);
          if(this.agree){
            this.$router.push('qkfzInquiry')
          }else{
            weui.alert('请先同意条约');
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
  .introduce{
    border: 1px solid gainsboro;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
    background: white;
    padding: 10px;
  }
  .contain{
    margin: 10px 5px;
  }
  .bottom{
    position: fixed;
    left: 0px;
    width: 100%;
    bottom: 20px;
    padding: 0 15px;
    box-sizing: border-box;
  }
</style>
