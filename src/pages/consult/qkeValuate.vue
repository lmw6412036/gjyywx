<template>
    <div>
        <top>
            <div class="middle big">全科分诊</div>
        </top>
        <div class="state">
          {{consult.consultStatusDescription}}
        </div>
      <div class="weui-cells" @click="goChatRecord(consult.consultId)">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>查看分诊聊天记录</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>
      <div class="detail">
        <div class="content">
         {{consult.consultContent}}
        </div>
        <div class="patMessage">
          <p> 就诊人 : {{consult.consulterName}} &nbsp;&nbsp;{{consult.consulterGender=='M'?'男':'女'}} &nbsp;&nbsp;{{consult.consulterAge}}</p>
          <p> 手机号 : {{consult.consulterMobile}}</p>
          <p> 身份证号 : {{consult.consulterIdcard}}</p>
        </div>
      </div>
      <div class="date">
        <p>订单编号 : {{consult.consultInfoNo}}</p>
        <p>创建时间 : {{consult.createTime | Todate}}</p>
        <p v-show="consult.consultStatusDescription=='待评价'">开始时间 : {{consult.startTime | Todate}}</p>
        <p v-show="consult.consultStatusDescription=='待评价'"> 结束时间 : {{consult.endTime | Todate}}</p>
      </div>
      <div v-show="consult.consultStatusDescription=='待评价'" class="bottom" @click="commit(consult.consultId)">
        <a href="javascript:;" class="weui-btn weui-btn_primary">评价</a>
      </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import {Todate} from '../../lib/filter'
    var token = localStorage.getItem('token')
    export default{
        components: {
            top
        },
        data(){
            return {
              consultId:'',
              consult:{}
            }
        },
      filters:{
        Todate
      },
        mounted(){
          this.$set(this.$data,'consultId',this.$route.params.consultId)
          Api('nethos.consult.info.detail',{
            token:token,
            consultId:this.consultId
          }).then(req=>{
            console.log(req,99999);
            if(req.succ){
              this.$set(this.$data,'consult',req.obj.consult)
            }
          })
        },
      methods:{
        commit(consultId){
          this.$router.push({
            name:'xing',
            params:{
              consultId:consultId
            }
          })
        },
        goChatRecord(consultId){
          this.$router.push({
            name:'qkeChatRecords',
            params:{
              consultId:consultId
            }
          })
        },
      }


    }
</script>
<style scoped>
 .state{
   box-sizing: border-box;
   border-bottom: 1px solid gainsboro;
   border-top: 1px solid gainsboro;
   background: white;
   text-align: center;
   height: 110px;
   line-height: 110px;
   margin-top: 10px;
   color: gray;
 }
  .detail{
    box-sizing: border-box;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    background: white;
    margin-top: 10px;
    color: gray;
  }
  .content{
    border-bottom: 1px solid gainsboro;
    padding: 10px;
    box-sizing: border-box;
  }
  .patMessage{
    padding: 10px;
    box-sizing: border-box;
  }
  .date{
    box-sizing: border-box;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    background: white;
    margin-top: 10px;
    color: gray;
    padding: 10px;
  }
  .bottom{
    position: fixed;
    left: 0px;
    bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>
