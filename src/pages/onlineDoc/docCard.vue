<template>
    <div class="parent">
        <top>
          <div class="middle big">医生名片</div>
          <span slot="right" class="step" @click="attentionDoc">{{docObj.follow?'取消关注':'关注医生'}}</span>
        </top>
      <div class="wrapContain">
          <div class="docDetail">
            <div class="docHeader">
              <div class="docImg docTitle">
                <img :src="docObj.docAvatar" alt="">
              </div>
              <div class="docName docTitle">{{docObj.docName}} &nbsp;&nbsp;<span>{{docObj.docFamousConsultStatus?'名医':''}}</span></div>
              <div class="docOffice docTitle">{{docObj.docDeptName}} &nbsp;&nbsp;{{docObj.docTitle}}</div>
              <div class="docHospital docTitle">{{docObj.docHosName}}</div>
              <div class="docXing docTitle">
                <label v-for="i of 5" :class="{active : Math.round(docObj.docScoure/2)>=i}">
                  &#xe60b;</label>
                <span @click="goEvaluate(docObj.docId)">查看评价&gt</span>
              </div>
            </div>

            <div class="docFeature">
              <div class="registration">
                <ul>
                  <li>图片</li>
                  <li>预约挂号</li>
                </ul>
              </div>
              <div class="docPicConsultStatus">
                <ul @click="goToApply">
                  <li>图片</li>
                  <li>{{docObj.docPicConsultStatus?'图文咨询':''}}</li>
                  <li>￥{{docObj.docPicConsultPrice}}</li>
                </ul>
              </div>
              <div class="docVideoConsultStatus">
                <ul>
                  <li>图片</li>
                  <li>{{docObj.docVideoConsultStatus?'视频问诊':''}}</li>
                  <li>￥{{docObj.docVideoConsultPrice}}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="strong">
            <div class="docStrong">医生擅长</div>
            <div  :class="{strongContain:showHeight,autoHeight:!showHeight}">
              {{docObj.docSkill}}
            </div>
            <div class="arrows" @click="spread"><span class="arrowLt">&lt;</span></div>
          </div>

          <div class="introduce">
            <div class="docStrong">医生介绍</div>
            <div  :class="{docIntroduce:docIntroduce,autoIntroduce:!docIntroduce}">
              {{docObj.docResume}}
            </div>
            <div class="arrows" @click="introduceSpread"><span class="arrowLt">&lt;</span></div>
          </div>

         <div class="docEssay">
            <div class="docStrong">医生文章  <div class="more" @click="goEssay(docObj.docId)">更多</div></div>

            <div :class="{essayContain:essayHeight}">
              <ul>
                <li class="essay" v-for="item of essayList">
                  <span class="essayTitle">{{item.title}}&nbsp;&nbsp;&nbsp;</span>
                  <span class="essayNum"> {{item.readTimes}} 阅读 &nbsp;&nbsp;&nbsp;</span>
                  <span class="essayDate">{{item.createTime | Todate}}</span>
                </li>
              </ul>
            </div>
            <div class="arrows" @click="essaySpread"><span class="arrowLt">&lt;</span></div>
          </div>

         <div class="code">
           <p>扫二维码，关注我</p>
           <p class="codeImg">
             <img :src="docObj.docQrcodeUrl" alt="">
           </p>
         </div>

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
              id:null,
              showHeight:true,
              docIntroduce:true,
              essayHeight:true,
              docObj:{},
              essayList:[]
            }
        },
      filters:{
        Todate
      },
        mounted(){
          this.$set(this.$data,'id',this.$route.params.id);
         this.getData()
        },
      methods:{
        goEssay(id){
          console.log(123132)
          this.$router.push({
            name:"docArticle",
            params:{
              docId:id
            }
          })
        },
        goEvaluate(id){
          this.$router.push({
            name:"docComment",
            params:{
              docId:id
            }
          })
        },
        getData(){
          Api('nethos.doc.card',{
            docId:this.id,
            token:token
          }).then(req=>{
            if(req.succ){
              console.log(req,999)
              this.$set(this.$data,'docObj',req.obj.sysDoc)
              this.$set(this.$data,'essayList',req.obj.docArticleList)
            }
          })
        },
        spread(){
          this.$set(this.$data,'showHeight',!this.showHeight)
        },
        introduceSpread(){
          this.$set(this.$data,'docIntroduce',!this.docIntroduce)
        },
        essaySpread(){
          this.$set(this.$data,'essayHeight',!this.essayHeight)
        },
        attentionDoc(){


          console.log(token)
          var url = this.docObj.follow?'nethos.follow.cancel':'nethos.follow.dp.add'
          Api(url,{
            docId:this.docObj.docId,
            token:token
          }).then(req=>{
            this.getData()
            console.log(req,111111)

          })
        },
        goToApply(){
          this.$router.push({
            name:'apply',
            params:{
              id:this.docObj.docId
            }
          })

        }
      }
    }
</script>
<style  scoped>
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_umg51q7zjupzxgvi.woff') format('woff');
  }
  label {
    font-family: 'iconfont';
  }
  .active {
    color: #eeba1b;
  }
  .parent{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .step{
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  .wrapContain{
    overflow: auto;
    flex: 1;
  }
  .docHeader{
    padding: 10px 0;
  }
  .docDetail{
    background: white;
    border-top: 1px solid gainsboro;
    margin-bottom: 10px;
  }
  .docTitle{
    padding: 5px 0;
  }
  .docHospital{
    display: flex;
    justify-content: center;
  }
  .docImg{
    display: flex;
    justify-content: center;

  }
  .docImg img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .docName{
    display: flex;
    justify-content: center;

  }
  .docOffice{
    display: flex;
    justify-content: center;
  }
  .docXing{
    display: flex;
    justify-content: center;
  }
  .docFeature{
    display: flex;
    justify-content: space-around;
  }
  .docFeature li{
    text-align: center;
  }
  .strong{
    background: white;
    margin-bottom: 20px;
    padding: 10px;
  }
  .strongContain{
    height: 56px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    transition: height 1s;
  }
  .autoHeight{
    height: auto;
    transition: height 1s;
  }
  .arrows{
    color: gainsboro;
    text-align: center;
  }
  .arrowLt{
    display: inline-block;
    transform:rotate(270deg);
  }
  .docIntroduce{
    height: 56px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    transition: height 1s;
  }
  .essayContain{
    height: 56px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    transition: height 1s;
  }
  .autoIntroduce{
    height: auto;
    transition: height 1s;
  }
  .introduce{
    background: white;
    margin-bottom: 20px;
    padding: 10px;
  }
  .docEssay{
    background: white;
    margin-bottom: 20px;
    padding: 10px;
  }
  .essay{
    display: flex;
    justify-content: space-between;
  }
.essay span{
    display: inline-block;
}
  .essayTitle{
    flex: 5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .essayNum{
    flex: 2;
  }
  .essayDate{
    flex: 3;
  }
  .code{
    text-align: center;
    margin-top: 10px;
  }
  .codeImg{
    width: 100%;
   text-align: center;
  }
  .codeImg img{
    width: 150px;
    height: 150px;
  }
  .more{
    float: right;
    padding-right: 15px;
  }

</style>
