<template>
  <div id="onlinepage">
    <top>
      <div class="middle big">我的问诊</div>
    </top>
    <div class="wrap">
      <div class="tab">
        <div class="tabGround">
          <div :class="{tabItem:true,bak:current=='all'}" @click="all">
            全部
          </div>
          <div :class="{tabItem:true,bak:current=='wait'}" @click="wait">
            待付款
          </div>
          <div :class="{tabItem:true,bak:current=='going'}" @click="going">
            进行中
          </div>
          <div :class="{tabItem:true,bak:current=='evaluate'}" @click="evaluate">
            待评价
          </div>
          <div :class="{tabItem:true,bak:current=='yetEvaluate'}" @click="yetEvaluate">
            已评价
          </div>
          <div :class="{tabItem:true,bak:current=='cancel'}" @click="cancel">
            已取消
          </div>
        </div>

      </div>
      <div class="contain">
        <div class="list" v-for="item of inquiryList" @click="goMessage(item.consultId,item.consultTypeName,item.consultStatusDescription)">
          <div class="itemHeader">
            <div class="title">{{item.consultTypeName}}</div>
            <div class="date">{{item.payTime?item.payTime:item.createTime | Todate}}</div>
          </div>
          <div class="itemContain">
            {{item.consultContent}}
          </div>
          <div class="itemState">
            <div class="name" v-show="item.docName">{{item.docName}}</div>
            <div class="state">{{item.consultStatusDescription}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import top from '../../components/business/app-header.vue'
  import Api from "../../lib/api";
  import {Todate} from '../../lib/filter'
  export default {
    data(){
      return {
        current:'all',
        token:localStorage.getItem('token'),
        inquiryList:[]
      }
    },
    filters:{
      Todate
    },
    components:{
      top
    },
    mounted(){
      Api('nethos.consult.info.list',{
        token:this.token
      }).then(req=>{
        console.log(req,66666);
        if(req.succ){
          this.$set(this.$data,'inquiryList',req.list)
        }

      })
    },
    methods:{
      goMessage(consultId,name,state){
        console.log(name,state,6666);
       // console.log('待处理'==('待评价'||'已评价'||'已取消'))
        if(name=='全科分诊' && (state=='待评价'|| state== '已评价' || state=='已取消')){
          this.$router.push({
            name:'qkeValuate',
            params:{
              consultId:consultId
            }
          })
        }else if(name=='图文咨询' && (state=='待评价'|| state== '已评价' || state=='已取消')){
          this.$router.push({
            name:'twValuate',
            params:{
              consultId:consultId
            }
          })
        }else {
          this.$router.push({
            name:'obligation',
            params:{
              consultId:consultId
            }
          })
        }

      },
      all(){
        this.$set(this.$data,'current','all')
        Api('nethos.consult.info.list',{
          token:this.token,
            pageNo:1,
            limit:10
        }).then(req=>{
          console.log(req,66666)
          if(req.succ){
            this.$set(this.$data,'inquiryList',req.list)
          }
        })
      },
      wait(){
        this.$set(this.$data,'current','wait')
        Api('nethos.consult.info.list',{
          token:this.token,
          statusList:[0]
        }).then(req=>{
          if(req.succ){
            this.$set(this.$data,'inquiryList',req.list)
          }
        })
      },
      going(){
        this.$set(this.$data,'current','going')
        Api('nethos.consult.info.list',{
          token:this.token,
          statusList:[2]
        }).then(req=>{
          if(req.succ){
            this.$set(this.$data,'inquiryList',req.list)
          }
        })
      },
      evaluate(){
        this.$set(this.$data,'current','evaluate')
        Api('nethos.consult.info.list',{
          token:this.token,
          statusList:[4]
        }).then(req=>{
          if(req.succ){
            this.$set(this.$data,'inquiryList',req.list)
          }
        })
      },
      yetEvaluate(){
        this.$set(this.$data,'current','yetEvaluate')
        Api('nethos.consult.info.list',{
          token:this.token,
          statusList:[6]
        }).then(req=>{
          if(req.succ){
            this.$set(this.$data,'inquiryList',req.list)
          }
        })
      },
      cancel(){
        this.$set(this.$data,'current','cancel')
        Api('nethos.consult.info.list',{
          token:this.token,
          statusList:[-1]
        }).then(req=>{
          console.log(req,66666)
          if(req.succ){
            this.$set(this.$data,'inquiryList',req.list)
          }
        })
      }



    }
  }
</script>

<style scoped lang="scss">
  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .wrap{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .tab{
    width: 100%;
    height: 50px;
    background: white;
    border: 1px solid gainsboro;
  }
  .tabGround{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
  }
  .tabItem{
    border-right: 1px solid gainsboro;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bak{
    background: yellowgreen;
  }
  .contain{
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    overflow: auto;
    flex: 1;
    margin-bottom: 50px;
  }
  .list{
    box-sizing: border-box;
    padding: 8px;
    border: 1px solid gainsboro;
    border-radius: 8px;
    background: white;
    margin-bottom: 10px;
  }
  .itemHeader{
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    padding-top: 10px;
  }
  .itemContain{
    height: 56px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;

  }
  .itemState{
    overflow: hidden;
  }
  .name{
    float: left;
  }
  .state{
    float: right;
    color: red;
  }
</style>
