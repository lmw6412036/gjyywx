<template>
    <div id="onlinepage">
        <top>
            <div class="middle big">我的挂号</div>
        </top>
      <div class="wrap">
        <div class="content" v-for="detail of list">
          <div class="registrationDetail">
            <p>{{detail.bookTime}}&nbsp;&nbsp;{{detail.bookAmpm=='am'?'上午':'下午'}} <span class="current" v-show="detail.orderState=='1'">实时挂号</span></p>
            <p>医院 : {{detail.hosName}}</p>
            <p>科室 : {{detail.deptName}}</p>
            <p>医生 : {{detail.docName}}</p>
            <p>预估就诊时间 : {{detail.gotoTime}}</p>
            <p>支付方式 : {{detail.hosName}}</p>
            <p>挂号费 : {{detail.bookFee}}</p>
            <p>取号密码 : {{detail.numPassword}}</p>
          </div>
          <div class="patDetail">
            <p>患者 : {{detail.patientName}}</p>
            <p>身份证号 : {{detail.compatIdcard}}</p>
            <p>手机号 : {{detail.compatMobile}}</p>
          </div>
          <div class="state" v-if="detail.orderState=='0'">
            <a @click="cancel(detail.orderId)" href="javascript:;" v-show="Date.parse(new Date())-Date.parse(new Date(detail.bookTime))<0">取消预约</a>
            <a @click="evaluate" href="javascript:;" v-show="Date.parse(new Date())-Date.parse(new Date(detail.bookTime))>0">评价医生</a>
          </div>
          <div class="state" v-if="detail.orderState=='3'">
            <a href="javascript:;">已取消</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import {Todate} from '../../lib/filter'
    var token = localStorage.getItem('token');
    export default{
        components: {
            top
        },
      filters:{
        Todate
      },
        data(){
            return {
              patId:'',
              list:[]
            }
        },
        mounted(){
          console.log(Date.parse(new Date()))
          console.log(Date.parse(new Date('2017/6/30')),121212)
          this.$set(this.$data,'patId',this.$route.params.id);
          Api('nethos.book.order.list',{
            token:token,
            subPatientId:this.patId
          }).then(req=>{
            console.log(req,9999);
            if(req.succ){
              this.$set(this.$data,'list',req.list)
            }
          })
        },
      methods:{
        evaluate(){
          console.log(1213)
        },
        cancel(id){
          console.log(5464)
          Api('nethos.book.order.cancel',{
            token:token,
            orderId:id
          }).then(req=>{
            console.log(req,87878787)
          })
        }
      }
    }
</script>
<style scoped>

  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .wrap{
    flex: 1;
    overflow: auto;

  }

  .registrationDetail{
    border-bottom: 1px dashed gainsboro;
    padding: 10px ;
  }
  .content{
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 15px;
    border-top: 1px solid gainsboro;
    color: gray;
    box-sizing: border-box;
    background: white;
    overflow: hidden;
  }
  .patDetail{
    padding: 10px ;
    box-sizing: border-box;
  }
  .state{
    float: right;
    box-sizing: border-box;
    padding-right: 15px;
    color: #0BB20C;
  }
  .current{
    display: inline-block;
    float: right;
  }
</style>
