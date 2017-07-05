<template>
    <div>
        <top>
            <div class="middle big">评价</div>
            <span slot="right" class="step" @click="submit">提交</span>
        </top>
      <div class="comment">
        <p>请对本次问诊做出评价</p>
        <label v-for="i of 5" :class="{active : orderValue>=i}"  @click="orderValue=i">&#xe60b;</label>
      </div>
      <div class="textarea">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请输入的意见建议(可以不填)" rows="5" v-model="content"></textarea>
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
              orderValue:null,
              content:'',
              consultId:''
            }
        },
        mounted(){
          console.log(this.$route.params.consultId)
          this.$set(this.$data,'consultId',this.$route.params.consultId)
        },
      methods:{
        submit(){
          if(!this.orderValue){
            alert('请评价')
            return false
          }else {
            Api('nethos.consult.info.comment',{
              token:token,
              consultId:this.consultId,
              score:this.orderValue*2,
              content:this.content
            }).then(req=>{
              console.log(req,5656565);
              if(req.succ){
                weui.alert('评价成功');
                this.$set(this.$data,'content','')
                this.$router.push({
                  name:'myInquiry'
                })
              }else {
                weui.alert(req.msg)
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
    @font-face {
      font-family: 'iconfont';
      src: url('//at.alicdn.com/t/font_umg51q7zjupzxgvi.woff') format('woff');
    }
    label {
      font-family: 'iconfont';
      font-size: 30px;
    }
    .active{
      color: #eeba1b;
    }
  .textarea{
    width: 100%;
  }
  .comment{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;
  }
  .comment p{
    font-size: 20px;
    color: gray;
  }
</style>
