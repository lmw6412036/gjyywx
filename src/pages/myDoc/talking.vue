<template>
    <div id="onlinepage">
        <top>
            <div class="middle big">{{name}}</div>
        </top>
      <div  class="wrap">
          <div ref="talking" @click="cancel" class="talk-detail" >
            <div  v-for="item in talkList">
              <div class="rightMsg" v-if="item.msgReceiverType=='DOC'">
                <div class="floatImg">
                  <img class="title" src="../../assets/logo.png" alt="">
                </div>
                <div class="floatRight">
                  <div class="comment">
                    {{item.msgText}}
                    <img v-if="item.sysAttachment" @click="bigImg(item.sysAttachment.url)" :src="item.sysAttachment.url" alt="">
                  </div>
                </div>

              </div>
              <div class="leftMsg" v-else-if="item.msgReceiverType=='PAT'">
                <div class="otherImg">
                  <img class="otherTitle" :src="detail.sysDoc.docAvatar" alt="">
                </div>
                <div class="floatLeft">
                  <div class="com">
                    {{item.msgText}}
                    <img v-if="item.sysAttachment"  @click="bigImg(item.sysAttachment.url)" :src="item.sysAttachment.url" alt="">
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="robot-room-wirte yk-box yk-cell">
              <div class="yk-cell-bd mr10">
                <edit-div :message="msg" v-model="text" id="inputArea" class="input-text"></edit-div>
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
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import editDiv from '../../lib/templete/editDiv.vue'
    import Ajax from '../../lib/ajax'
    var token  = localStorage.getItem('token')
    export default{
        components: {
          top,
          editDiv
        },
        data(){
            return {
              followId:null,
              name:'',
              msgValue:'',
              showMsg:false,
              lists:[],
              id:null,
              user_id:null,
              img:null,
              checkList:false,
              text:'',
              srcList:[],
              talkList:[],
              detail:{},
              msg:true,
              attaId:''
            }
        },
        mounted(){
          this.$set(this.$data,'followId',this.$route.params.id)
           this.getData()
        },
      methods:{
        bigImg(url){
          weui.gallery(url)
        },
        getData(){
          Api('nethos.follow.message.detail.list',{
            followId:this.followId,
            token:token,
          }).then(req=>{
            console.log(req,898989)
            if(req.succ){
              this.$set(this.$data,'name',req.obj.sysDoc.docName)
              this.$set(this.$data,'talkList',req.list)
              this.$set(this.$data,'detail',req.obj)
              setTimeout(()=>{
                this.$refs.talking.scrollTop = this.$refs.talking.scrollHeight - this.$refs.talking.clientHeight;
              },50)
            }
          })
        },
        showCheckList(){
          this.$set(this.$data,'checkList',!this.checkList)
        },
        cancel(){
          this.$set(this.$data,'checkList',false)
        },
        upLoad(e){
          var files = e.target.files[0]
          Ajax(files,{}).then(data=>{
            if(data.succ){
              this.attaId = data.obj.attaId;
              console.log(data,'图片上传成功',66666)
              this.send()
            }
          })
        },
        send(){
          Api('nethos.follow.message.add',{
            followId:this.followId,
            msgText:this.text,
            token:token,
            attaId:this.attaId
          }).then(req=>{
            console.log(req,33333)
            this.msg=!this.msg;
            this.text='';
            this.attaId=''

            this.getData()
          })
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
  .wrap{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .talk-detail{
     margin-top: 15px;
     margin-bottom: 50px;
     overflow: auto;
     flex: 1;
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

    .comment {
      width: 150px;
      height: auto;
      position: relative;
      background: #f8ac09;
      border-radius: 5px;
      word-wrap:break-word;
      word-break:break-all;
    }
    .comment img{
      width: 100%;
      height: 110%;
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
      border-color: transparent transparent transparent #f8ac09;
      font-size: 0;
    }
    .com {
      width: 150px;
      height: auto;
      position: relative;
      background: #f8ac09;
      border-radius: 5px;
      word-wrap:break-word;
      word-break:break-all;
    }
  .com img{
    width: 100%;
    height: 110%;
    display: block;
  }
    .com:after {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: 5px;
      left: -16px;
      border: solid 8px;
      border-color:  transparent #f8ac09 transparent transparent;
      font-size: 0;
    }
</style>
