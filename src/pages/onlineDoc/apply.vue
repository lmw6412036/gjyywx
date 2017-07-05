<template>
    <div>
      <top>
        <div class="middle big">申请须知</div>
        <span slot="right" class="step" @click="goPictureInquiry">下一步</span>
      </top>
      <div class="wrap">
        <div class="list">
          <div class="itemImg">
            <img :src="docObj.docAvatar" alt="">

          </div>
          <div class="itemContain">
            <ul>
              <li>{{docObj.docName}} &nbsp; &nbsp;&nbsp;<span class="fontCol">{{docObj.docTitle}}</span></li>
              <li><span class="fontCol">{{docObj.docHosName}}</span></li>
              <li>{{docObj.docDeptName}}</li>
            </ul>
          </div>
        </div>
        <div class="print">
            <div>图文问诊价格</div>
            <div>{{docObj.docPicConsultPrice}}</div>
        </div>
        <div class="rule">
          <div class="pictureRule">
             在线医生图文规则
          </div>
          <ul>
            <li>1,您需要先付款，再向医生提问</li>
            <li>2,医生会在48小时内回复您，逾期自动退款</li>
            <li>3,医生第一次回复您之后，您可以在24小时内继续追问</li>
          </ul>
        </div>
        <label for="weuiAgree" class="weui-agree">
          <input v-model="agree" id="weuiAgree" type="checkbox" class="weui-agree__checkbox"/>
            <span class="weui-agree__text">
                我已阅读并同意<a href="javascript:void(0);">《相关条款》</a>
            </span>
        </label>
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
              id:null,
              docObj:{},
              agree:''
            }
        },
        mounted(){
            this.$set(this.$data,'id',this.$route.params.id)
          Api('nethos.doc.card',{
            docId:this.id
          }).then(req=>{
            if(req.succ){
              console.log(req,99992222)
              this.$set(this.$data,'docObj',req.obj.sysDoc)
            }
          })
        },
      methods:{
        goPictureInquiry(){
          if(this.agree){
            this.$router.push({
              name:'pictureInquiry',
              params:{
                id:this.docObj.docId
              }
            })
          }else {
            weui.alert('请先同意相关条约')
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
  .list{
    margin: 10px 0;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    background: white;
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }
  .itemImg{
    flex: 2;
  }
  .itemImg img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .itemContain{
    flex: 7;
  }

  .fontCol{
    color: gray;
  }
  .print{
    padding: 15px 10px;
    box-sizing: border-box;
    background: white;
    border-bottom: 1px solid gainsboro;
    display: flex;
    justify-content: space-between;
  }
  .rule{
    margin-top: 10px;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    box-sizing: border-box;
    padding: 15px 10px;
    background: white;
  }
  .rule li{
    color: gray;
  }
</style>
