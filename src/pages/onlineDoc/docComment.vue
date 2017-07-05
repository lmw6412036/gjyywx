<template>
  <div>
      <app-header>
          <div> <p class="middle big" style="font-size:1rem">医生评价</p></div>
    </app-header>
      <div class="totalComment">
      <p class="header weui-msg__desc">{{doctor.docName}}的评价</p>
        <div>
          <label v-for="i of 5" :class="{active : Math.round(doctor.docScoure/2)>=i}">
            &#xe60b;</label>
        </div>
    </div>
      <scroll-fresh @pullUp="pullUp" @pullDown="pullDown" top="145" :isCompleted="isCompleted" :nothingMore="nothingMore" right="true">
          <div slot="containing" ref="scroller">
<!--      <div class="scroller" ref="scroller">-->
          <div v-for="item in comments" class="well">
              <div>
                <span class="xingxing" v-for="i of 5" :class="{active : Math.round(item.sysComment.score/2)>=i}">
                  &#xe60b;</span>
              </div>
              <p>{{item.sysComment.content}}</p>
              <div class="test">
              <p>{{item.sysComment.moudleType}}</p>
                  <p style="flex:1 1 auto;text-align:right;padding-top:5px" class="weui-msg__desc"><img :src="item.sysPat.patAvatar" onerror="this.src='../../../src/assets/u6883.png'"class="smallPic">{{item.sysPat.patName}} | {{item.sysComment.createTime | goodTime}}</p>
    </div>
    </div>
    </div>
<!--    </div>-->
    </scroll-fresh>
  </div>
</template>

<script type="text/ecmascript-6">
    import ScrollFresh from '../../lib/templete/scroll-fresh.vue';
    import AppHeader from "../../components/business/app-header";
    import api from "../../lib/api";
    import {goodTime} from  '../../lib/filter'
  export default {
    data() {
      return {
          doctor:{},
          comments:[],
          page:{},
          isCompleted:false,
          nothingMore:false
      };
    },
    filters:{
      goodTime
    },
    computed:{

    },
    components:{
        AppHeader,
        ScrollFresh
    },
    mounted() {
        let params={"docId":this.$route.params.id,'pageSize':10,'pageNo':1};
        this.apiRequest(params);

    },
    beforeDestroy() {

    },
    methods: {
        apiRequest(params,pullUp){
            api("nethos.doc.comment.list",params)
            .then((val)=>{
                console.log(val)
                this.doctor=val.list[0].sysDoc;
                if(pullUp){
                    this.comments.push(...val.list);
                }
                else{
                    this.comments=val.list;
                }
                this.page=val.paginator;
                this.update();
                //this.setHeight();
                setTimeout(()=>{
                    this.isCompleted=true;
                },50);
                setTimeout(()=>{
                    this.isCompleted=false;
                },100);
            })
        },
        pullDown(){
            let params={"docId":this.$route.params.id,'pageNo':1,'pageSize':10};
            this.apiRequest(params,false);
        },
        pullUp(){
            let params={'docId':this.$route.params.id,'pageNo':this.page.nextPage,'pageSize':10};

          console.log(this.page);
            if(this.page.hasNextPage){
                this.apiRequest(params,true);
            }
            else{
                setTimeout(()=>{
                    this.isCompleted=true;
                    this.nothingMore=true;
                },50);
                setTimeout(()=>{
                    this.isCompleted=false;
                    this.nothingMore=false;
                },100);
            }
        },
        update(){
            var test=0;
            this.comments.forEach((item)=>{
                if(item.sysComment.moudleType=='DOCPIC'){
                    item.sysComment.moudleType="图文问诊";
                    test++;
                }
                else if(item.sysComment.moudleType=="DOCVIDEO"){
                    item.sysComment.moudleType="视频问诊"
                }
            })
            console.log(test);
        },
        setHeight(){
            let headerHeight=45;
            let totalHeight=150;
            this.$refs.scroller.style.height=document.documentElement.clientHeight-headerHeight-totalHeight+'px';
        }

    }
  };
</script>

<style scoped lang="scss">
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_umg51q7zjupzxgvi.woff') format('woff');
  }
  label {
    font-family: 'iconfont';
    font-size: 25px;
  }
  .xingxing{
    font-family: 'iconfont';
    font-size: 12px;
  }
  .active {
    color: #eeba1b;
  }
    $totalHeight:100px;
    $background:s#333333;
    .well{
        width:18rem;
        background:white;
        margin:10px auto;
        border-radius:5px;
        border:1px solid $background;
    }
    .scroller{
        background:rgb(248,248,248);
        overflow:auto;
    }
    .test{

        display:flex;
        flex-direction:row;
    }
    .totalComment{
        padding-top:10px;
        height:$totalHeight;
        text-align:center;
    }
    p{
        font-size:0.77rem;
        padding:5px;
        &.header{
            padding-top:10px;
            font-size:1rem;
        }
    }
    .smallPic{
        height:1rem;
        padding-top:5px;
        border-radius:10px;
    }
</style>
