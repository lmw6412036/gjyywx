<template>

  <div class="viewpage view" style="overflow:auto;">
      <div class="page" ref="page">
          <div class="scroller" >
          <div class="page__hd">
              <h1 class="page__title title">{{info.title}}</h1>
              <p class="page__desc">{{info.viewCount}}阅读  {{time}}    <span class="box" @click="recommend">推荐</span></p>
    </div>
          <div class="page__bd">
              <p class="weui-article" style="word-break:break-all;" ref="article"></p>
    </div>
          <div class="page__ft">
    </div>
    </div>
    </div>
  </div>
</template>

<script>
  import Api from "../../lib/api"
  import AppHeader from "../../components/business/app-header.vue"
  export default {
    data() {
      return {
          info:{},
          isSucc:false,
          chosedIndex:0
      };
    },
    computed:{
        time(){
            return this.getLocalTime(this.info.createTime);
        }
    },
      props:{
          containing:{
              type:String,
              default:"",
              required:true
          },
          height:{
              type:String,
              default:"",
              required:false
          }
      },
      watch:{
          containing(){
              this.update();
          }
      },
    components:{
        AppHeader
    },
    mounted() {
        this.update();
    },
      created(){
      },
    beforeDestroy() {

    },
    methods: {
        update(){
            this.info=JSON.parse(this.containing);
            console.log(this.info);
            this.$refs.article.innerHTML=this.info.content;
            this.info.createTime/=1000;
            if(this.height!=''){
                this.$refs.page.style.height=this.height+'px';
            }
        },
        getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        },
        recommend(){
//            Api("nethos.system.information.top",{newId:this.info.articleId,top:true,token:window.localStorage['token']})
//            .then((val)=>{
//                console.log(val);
//                this.isSucc=true;
//                setTimeout(()=>{this.isSucc=false;},1000);
//            })
        }

    }
  };
</script>

<style scoped lang="scss">
    .title{
        font-family: 'Arial Normal', 'Arial';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        color: #CC6633;
    }
    .page__hd{
        text-align:center;

    }
    .page__desc{
        color:#CCCCCC;
        font-size:12px;
    }
    .page{
        overflow:auto;
/*        position:absolute;*/
/*        top:45px;*/
        width:100%;
        border-top:1px solid lightgrey;
    }
    .box{
        border:1px solid #ccc;
        border-radius:5px;
        display:inline-block;
        padding:0 5px;
    }
</style>
