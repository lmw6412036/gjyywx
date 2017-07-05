<template>
    <div id="onlinepage">
        <top>
            <div class="middle big">我的医生</div>
        </top>
      <div class="wrap">
        <div  class="navbar">
          <div class="navbarHeader">
            <div class="weui-navbar__item " :class="{active:showTal}" @click.stop="recentlyTalking">
              最近会话
            </div>
            <div class="weui-navbar__item" :class="{active:showAttn}"  @click.stop="attentionDoc">
              关注医生
            </div>
          </div>
        </div>
        <div class="contain">
          <div v-show="showAttention" class="list" v-for="item of attentionList" @click="goDocCard(item.sysDoc.docId)">
            <div class="itemImg">
              <img :src="item.sysDoc.docAvatar" alt="">
            </div>
            <div class="itemContain">
              <ul>
                <li>{{item.sysDoc.docName}} &nbsp; &nbsp;&nbsp;<span class="fontCol">{{item.sysDoc.docTitle}}</span></li>
                <li><span class="fontCol">{{item.sysDoc.docDeptName}}</span></li>
                <li><span class="fontCol">{{item.sysDoc.docPicConsultStatus?'图文问诊':''}} &nbsp; &nbsp;&nbsp;{{item.sysDoc.docVideoConsultStatus?'视频问诊':''}}</span></li>
              </ul>
            </div>
            <div class="itemXing"><span class="fontCol">
              &gt;</span>
            </div>
          </div>
          <div v-show="showTalk" class="talkList" v-for="talkItem of talkList" @click="goTalking(talkItem.followDocpat.followId,talkItem.followDocpat.patVip)">
            <div class="talkImg">
              <img :src="talkItem.sysDoc.docAvatar" alt="">
              <span v-show="talkItem.unReadCount>0" class="weui-badge" style="position: absolute;top: 3px;right: 5px;">{{talkItem.unReadCount}}</span>
            </div>
            <div class="talkDetail">
              <ul>
                <li>{{talkItem.sysDoc.docName}} &nbsp; <span class="fontCol">{{talkItem.sysDoc.docTitle}}</span></li>
                <li class="message" v-if="talkItem.followMessage">{{talkItem.followMessage.msgText}}</li>
              </ul>
            </div>
            <div class="date" v-if="talkItem.followMessage">
              {{talkItem.followMessage.createTime | Todate}}
            </div>
          </div>
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
              attentionList:[],
              showAttention:false,
              talkList:[],
              showTalk:true,
              showTal:true,
              showAttn:false
            }
        },
      filters:{
        Todate
      },
        mounted(){
          this.recentlyTalking();
        },
      methods:{
        goDocCard(id){
          this.$router.push({
            name:'docCard',
            params:{
              id:id
            }
          })
        },
        recentlyTalking(){
          this.$set(this.$data,'showAttn',false)
          this.$set(this.$data,'showTal',true)
          Api('nethos.follow.message.last.list',{
            pageNo:1,
            pageSize:10,
            token:token
          }).then(req=>{
            console.log(req,22222)
            if(req.succ){
              if(!this.showTalk){
                this.$set(this.$data,'showAttention',!this.showAttention)
                this.$set(this.$data,'showTalk',!this.showTalk)
              }
              this.$set(this.$data,'talkList',req.list)
            }
          })
        },
        attentionDoc(){
          this.$set(this.$data,'showTal',false)
          this.$set(this.$data,'showAttn',true)
          Api('nethos.follow.docpat.list',{
            token:token
          }).then(req=>{
            console.log(req,666666)
            if(req.succ){
              this.$set(this.$data,'showTalk',false)
              this.$set(this.$data,'showAttention',true)
              this.$set(this.$data,'attentionList',req.list)
            }
          })
        },
        goTalking(id,vip){
          console.log(id,vip,77777)

          if(vip){
            this.$router.push({
              name:'talking',
              params:{
                id:id
              }
            })
          }else {
            this.$router.push({
              name:'noVipTalking',
              params:{
                id:id
              }
            })

          }

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
  .active{
    background: gainsboro;
  }
  .navbar{
    border: 1px solid gainsboro;
    margin-bottom: 10px;
  }
.navbarHeader{
  display: flex;
  background: white;
}

.contain{
  overflow:auto;
  flex: 1;
}

.list{
  border-bottom: 1px solid gainsboro;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  justify-content: space-between;
}
.itemImg{
  flex: 2;
}
.itemImg img{
  width: 50px;
  height: 50px;
}
.itemContain{
  flex: 6;
}
.itemXing{
  flex: 1;
}
.fontCol{
  color: gray;
}
  .talkList{
    display: flex;
    border-bottom: 1px solid gainsboro;
    background: white;
    display: flex;
    padding: 10px 10px;
    overflow: hidden
  }
  .talkImg img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .talkImg{
    flex: 2;
    position: relative;
  }
  .talkDetail{
    flex: 6;
    display: inline-block;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;

  }
  .date{
    flex: 3;
  }
  .message{

  }
</style>
