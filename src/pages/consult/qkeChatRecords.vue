<template>
  <div id="onlinepage">
    <top>
      <div class="middle big">全科分诊</div>
    </top>


    <!--<div  class="wrap">-->
      <!--<div class="leftMsg" >-->
        <!--<div class="otherImg">-->
          <!--<img class="otherTitle" src="" alt="">-->
        <!--</div>-->
        <!--<div class="floatLeft">-->
          <!--<div class="com">{{consult.consultContent}}</div>-->
        <!--</div>-->

      <!--</div>-->
      <!--<div   class="talk-detail" v-for="item of talkList">-->
        <!--<div>-->
          <!--<div class="rightMsg" v-if="item.replierType=='DOC'">-->
            <!--<div class="floatImg">-->
              <!--<img class="title" :src="item.replierAvatar" alt="">-->
            <!--</div>-->
            <!--<div class="floatRight">-->
              <!--<div class="comment">-->
                <!--{{item.replyContent}}-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->
          <!--<div class="rightMsg" v-else-if="item.replierType=='ASS'">-->
            <!--<div class="floatImg">-->
              <!--<img class="title" :src="item.replierAvatar" alt="">-->
            <!--</div>-->
            <!--<div class="floatRight">-->
              <!--<div class="comment">-->
                <!--{{item.replyContent}}-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->
          <!--<div class="leftMsg" v-else-if="item.replierType=='PAT'">-->
            <!--<div class="otherImg">-->
              <!--<img class="otherTitle" :src="item.replierAvatar" alt="">-->
            <!--</div>-->
            <!--<div class="floatLeft">-->
              <!--<div class="com">{{item.replyContent}}</div>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div>-->

      <!--</div>-->
    <!--</div>-->


    <div  class="wrap" ref="talking">
      <div class="leftMsg" >
        <div class="otherImg">
          <img class="otherTitle" src="" alt="">
        </div>
        <div class="floatLeft">
          <div class="com">
            <div>
              {{consult.consultContent}}
            </div>
            <div class="ImgBox" v-for="item of imgList" @click="showImg(item.url)">
              <img  class="inquiryImg" :src="item.url" alt="">
            </div>
          </div>
        </div>

      </div>
      <div   class="talk-detail" v-for="item of talkList">
        <div>
          <div class="rightMsg" v-if="item.replierType=='DOC'">
            <div class="floatImg">
              <img class="title" :src="item.replierAvatar" alt="">
            </div>
            <div class="floatRight">
              <div class="comment">
                {{item.replyContent}}
                <div  v-for="img of item.attaList" @click="showImg(img.url)">
                  <img   class="DocinquiryImg" :src="img.url" alt="">
                </div>
              </div>
            </div>

          </div>
          <div class="rightMsg" v-else-if="item.replierType=='ASS'">
            <div class="floatImg">
              <img class="title" :src="item.replierAvatar" alt="">
            </div>
            <div class="floatRight">
              <div class="comment">
                {{item.replyContent}}
                <div  v-for="img of item.attaList" @click="showImg(img.url)">
                  <img  class="DocinquiryImg" :src="img.url" alt="">
                </div>
              </div>
            </div>

          </div>
          <div class="leftMsg" v-else-if="item.replierType=='PAT'">
            <div class="otherImg">
              <img class="otherTitle" :src="item.replierAvatar" alt="">
            </div>
            <div class="floatLeft">
              <div class="com">
                {{item.replyContent}}
                <div  v-for="img of item.attaList" @click="showImg(img.url)">
                  <img  class="DocinquiryImg" :src="img.url" alt="">
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div >

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
        consultId:'',
        consult:{},
        talkList:[],
        imgList:[],
        attaList:[]
      }
    },
    mounted(){
      this.$set(this.$data,'consultId',this.$route.params.consultId)
      Api('nethos.consult.info.detail',{
        token:token,
        consultId:this.consultId,
        pageNo:1,
        pageSize:10
      }).then(req=>{
        console.log(req,132132132)
        if(req.succ){
          var obj = req.obj.consult;
          var list = req.obj.messageList;
          this.$set(this.$data,'consult',obj);
          this.$set(this.$data,'talkList',list);
          this.$set(this.$data,'attaList',list.attaList);
          this.$set(this.$data,'imgList',req.obj.attaList);
        }
      })
    },
    methods:{
      showImg(url){
        console.log(url);
        weui.gallery(url)
      }
    }
  }
</script>
<style scoped>

  #onlinepage{
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .comment {
    width: 150px;
    height: 35px;
    position: relative;
    background: #f8ac09;
    border-radius: 5px;
    float: right;
    line-height: 35px;
  }

  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    right: -16px;
    border: solid 8px;
    border-color: transparent transparent transparent #f8ac09;
    font-size: 0;
  }

  .wrap{
    flex: 1;
    overflow: auto;
    padding-top: 15px;
  }
  .talk-detail{
    margin-bottom: 5px;
  }


  .rightMsg{
    overflow: hidden;
  }
  .leftMsg{
    overflow: hidden;
  }
  .floatRight{
    float: right;
    height: auto;
  }
  .floatLeft{
    float: left;
  }
  .floatImg{
    float: right;
  }
  .otherImg{
    float: left;
  }
  .title{
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 20px;
    padding-left: 5px;
  }
  .otherTitle{
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 20px;
    padding-right: 5px;
  }

  .input-msg input{
    height: 23px;
    width: 92%;
    margin-top: -12px;
    outline: none;
    border: none;
  }
  .input-msg a{
    text-decoration: none;
    width: 50px;
  }
  .input-msg a span{
    display: inline-block;
    background: greenyellow;
    width: 40px;
    text-align: center;
  }

  .comment {
    width: 150px;
    min-height: 25px;
    position: relative;
    background: lawngreen;
    border-radius: 5px;
    float: right;
    line-height: 25px;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    padding: 7px 5px;
    box-sizing: border-box;

  }
  .DocinquiryImg{
    width: 100%;
    height: 100%;
    display: block;
  }

  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    right: -16px;
    border: solid 8px;
    border-color: transparent transparent transparent lawngreen;
    font-size: 0;
  }
  .ImgBox{
    float: left;
    width: 46px;
    height: 46px;
  }
  .inquiryImg{
    width: 46px;
    height: 46px;
    display: block;
  }
  .com {
    width: 150px;
    min-height: 25px;
    line-height: 25px;
    height: auto;
    position: relative;
    background: lawngreen;
    border-radius: 5px;
    float: left;
    word-wrap:break-word;
    word-break:break-all;
    padding: 7px 5px;
    box-sizing: border-box;

  }

  .com:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    left: -16px;
    border: solid 8px;
    border-color:  transparent lawngreen transparent transparent;
    font-size: 0;
  }
  .talk-detail{
    margin-bottom: 15px;
  }


  .rightMsg{
    overflow: hidden;
  }
  .leftMsg{
    overflow: hidden;
  }
  .floatRight{
    float: right;
    height: auto;
    margin-bottom: 10px;
  }
  .floatLeft{
    float: left;
    margin-bottom: 10px;
  }
  .floatImg{
    float: right;
  }
  .otherImg{
    float: left;
  }
  .title{
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 20px;
    padding-left: 5px;
  }





</style>
