<template>
    <div id="onlinepage">
        <top>
            <div class="middle big">{{consult.docName}}</div>
            <span slot="right" class="step" @click="cancelApply">{{msg}}</span>
        </top>
      <div class="titleHeader">
        {{consult.consultStatusDescription}}
      </div>
      <div class="contain" v-if="talkList.length==0">
        <div class="name">{{consult.consulterName}}</div>
        <div class="comment">
          {{consult.consultContent}}
          <div class="ImgBox" v-for="item of attaList" @click="showImg(item.url)">
            <img  class="inquiryImg" :src="item.url" alt="">
          </div>

        </div>
      </div>
      <div v-else class="wrap" ref="talking">
        <div class="leftMsg" >
          <div class="otherImg">
            <img class="otherTitle" src="" alt="">
          </div>
          <div class="floatLeft">
            <div class="com">
              <div>
                {{consult.consultContent}}
              </div>
              <div class="ImgBox" v-for="item of attaList" @click="showImg(item.url)">
                <img  class="inquiryImg" :src="item.url" alt="">
              </div>
            </div>
          </div>

        </div>
        <div @click="cancel"  class="talk-detail" v-for="item of talkList">
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
        <div class="bottom">
          <div class="robot-room-wirte yk-box yk-cell">
            <div class="yk-cell-bd mr10">
              <edit-div :message="clean" v-model="text" id="inputArea" class="input-text"></edit-div>
            </div>
            <div v-show="!text.length" class="showJia" @click.stop="showCheckList"><span class="jia">+</span></div>
            <button v-show="text.length" class="send-btn" @click="send()">发送</button>
          </div>
          <div class="checkList" v-show="checkList">
            <div class="upload">
              <label for="upload_img" class="label_img">图片</label>
              <input  @change="upLoad" type="file" id="upload_img" >
            </div>
          </div>
        </div>
      </div >
      <div class="btn" v-show="consult.consultStatus=='NEEDPAY'">
        <a href="javascript:;" class="weui-btn weui-btn_primary">付款</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import editDiv from '../../lib/templete/editDiv.vue'
    import Ajax from '../../lib/ajax'
    var token = localStorage.getItem('token')
    export default{
        components: {
            top,
          editDiv
        },
        data(){
            return {
              consultId:'',
              consult:{},
              text:'',
              msg:'',
              talkList:[],
              checkList:false,
              clean:true,
              attaList:[],
              attaIdList:[]
            }
        },
        mounted(){
          this.$set(this.$data,'consultId',this.$route.params.consultId);
          this.getData()

        },
      methods:{
        getData(){
          Api('nethos.consult.info.detail',{
            token:token,
            consultId:this.consultId,
            pageNo:1,
            pageSize:10
          }).then(req=>{
            if(req.succ){
              console.log(req,9999)
              var obj = req.obj.consult;
              var list = req.obj.messageList;
              this.$set(this.$data,'consult',obj);
              this.$set(this.$data,'talkList',list);
              this.$set(this.$data,'attaList',req.obj.attaList);
              setTimeout(()=>{
                this.$refs.talking.scrollTop = this.$refs.talking.scrollHeight - this.$refs.talking.clientHeight;
              },50)
              if(list.length==0){
                this.$set(this.$data,'msg','取消申请');
              }else {
                this.$set(this.$data,'msg','结束咨询');
              }
            }
          })
        },
        send(){
          Api('nethos.consult.info.reply',{
            token:token,
            consultId:this.consultId,
            replyContent:this.text,
            attaIdList:this.attaIdList
          }).then(req=>{
            if(req.succ){
              this.clean=!this.clean;
              this.$set(this.$data,'attaIdList',[])
              this.$set(this.$data,'text','')
              this.getData()
            }else {
              weui.alert(req.msg)
            }
          })
        },
        cancelApply(){
         var url = this.consult.consultTypeName=='全科分诊'?'nethos.consult.info.pic.cancel':'nethos.consult.info.docpic.cancel';
          var self = this;
          weui.confirm(self.msg, {
            title: '我们将为你'+self.msg,
            buttons: [{
              label: '暂不取消',
              type: 'default',
              onClick: function(){ }
            }, {
              label: '确定取消',
              type: 'primary',
              onClick: function(){
                if(self.talkList.length>0){
                  Api('nethos.consult.info.complete',{
                    token:token,
                    consultId:self.consultId
                  }).then(req=>{
                    if(req.succ){
                      console.log(456)
                      self.$router.push({
                        name:'myInquiry'
                      })
                    }else {
                      weui.alert(req.msg)
                    }
                  })
                }else {
                  Api(url,{
                    token:token,
                    consultId:self.consultId
                  }).then(req=>{
                    if(req.succ){
                      console.log(123)
                      self.$router.push({
                        name:"myInquiry"
                      })
                    }else {
                      weui.alert(req.msg)
                    }
                  })
                }

              }
            }]
          });
        },
        upLoad(e){
          var files = e.target.files[0]
          Ajax(files,{}).then(data=>{
            if(data.succ){
              this.attaIdList[0] = data.obj.attaId;
              this.send()
            }

          })
        },
        showCheckList(){
          this.$set(this.$data,'checkList',!this.checkList)
        },
        cancel(){
          this.$set(this.$data,'checkList',false)
        },
        showImg(url){
          weui.gallery(url, {
            className: 'imgBox'
          });
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
    #onlinepage{
      overflow: auto;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  .titleHeader{
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    box-sizing: border-box;
    padding: 5px;
    background: white;
    text-align: center;
  }
  .contain{
    margin-top: 20px;
    box-sizing: border-box;
    padding: 10px;
  }
  .name{
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    text-align: center;
    background: white;
    float: right;
    margin-left: 5px;
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
  .btn{
    position: fixed;
    left: 0;
    bottom: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }

    .wrap{
      flex: 1;
      overflow: auto;
      padding-top: 15px;
      padding-bottom: 45px;
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

    .bottom{
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: auto;
      background: white;
    }
    .mr10 {
      margin-right: 10px;
      width: 100%;
    }
    .yk-cell {
      display: flex;
      align-items: center;
    }
    .yk-box {
      padding: 10px 15px
    }
    .robot-room-wirte {
      background: #eee;
      box-sizing: border-box;
      border-top: 1px solid #dedede;
    }
    .robot-room-wirte .input-text {
      display: block;
      border: none;
      outline: none;
      width: 100%;
      border: 1px solid #ddd;
      box-shadow: inset 0 0 9px #ddd;
      border-radius: 3px;
      resize: none;
      background: #fff;
      word-break: break-all;
      max-height: 90px;
      overflow-y: scroll;
      box-sizing: border-box;
      padding: 4px 5px;
      line-height: 21px;
      font-size: 14px;
    }
    .robot-room-wirte .input-text::-webkit-scrollbar {
      /*width: 0;*/
      /*opacity: 0;*/
      display: none;
    }
    .robot-room-wirte .showJia{
      width: 32px;
      height: 32px;
      line-height: 27px;
      box-sizing: border-box;
      text-align: center;
      text-decoration: none;
      border-radius: 16px;
      color: #454545;
      display: block;
      font-size: 16px;
      min-width: 32px;
      max-width: 32px;
      background: white;
      border: 1px solid #ddd;
      outline: none;

    }
    .robot-room-wirte .send-btn {
      width: 38px;
      height: 32px;
      line-height: 32px;
      box-sizing: border-box;
      background: greenyellow;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-appearance: none;
      text-align: center;
      text-decoration: none;
      border-radius: 5px;
      color: #454545;
      display: block;
      font-size: 14px;
      min-width: 50px;
      max-width: 50px;
      background: greenyellow;
      border: 1px solid #ddd;
      box-sizing: border-box;
      outline: none;
      align-self: flex-end
    }
    .robot-room-wirte .send-btn:active {
      opacity: 0.6;
    }

    .checkList{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 20px;
    }
    .upload{
      display: flex;
      align-items: center;
    }
    #upload_img{
      display: none;
    }
    .label_img{
      width: 50px;
      height: 50px;
      border-radius: 5px;
      line-height: 50px;
      text-align: center;
      border: 1px solid darkgray;
    }


</style>
