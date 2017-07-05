<template>
  <div>
      <app-header>

          <div ><p class="middle big">文章详情</p></div>
    </app-header>
      <div class="weui-loadmore" v-show="!Got">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <div class="window" ref="window" v-show="Got">

      <my-panel @activate="follow()" :hasArrow="hasArrow">
          <div slot="picture"><img :src="info.docAvatar"class="figure" onerror="this.src='../../../src/assets/u6883.png'"></div>
          <div slot="article" style="color:black">{{info.docName}}</div>
          <div  slot="ft"class="weui-msg__desc">{{footerWord}}</div>
    </my-panel>
      <my-article :containing="containing" height="400"></my-article>
          <div style="border-top:1px solid #ccc">
              <p  style="text-align:center"class="weui-msg__desc">长按识别二维码，关注我</p>
              <img :src="info.docQrcodeUrl" class="QrCode">
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

    import MyArticle from "../../lib/templete/detail.vue";
    import MyPanel from "../../lib/templete/panel.vue";
    import ScrollFresh from '../../lib/templete/scroll-fresh.vue';
    import AppHeader from "../../components/business/app-header.vue";
    import api from "../../lib/api";
  export default {
    data() {
      return {
          headerHeight:45,
          command:"nethos.doc.article.detail",
          containing:'{}',
          info:{},
          Got:false,

      };
    },
    computed:{
        footerWord(){
            return this.info.follow?"已关注":"关注我";
        },
        hasArrow(){
            return this.footerWord=='已关注'?"false":"true";
        }
    },
    components:{
        MyArticle,
        MyPanel,
        AppHeader
    },
    mounted() {
        this.$refs.window.style.height=document.documentElement.clientHeight-this.headerHeight+'px';
    },
    beforeDestroy() {

    },
    created(){
        let articleId=this.$route.params.id;
        this.params={"articleId":articleId};
        api(this.command,this.params)
        .then((val)=>{
            console.log(val);
            this.info=val.obj.sysDoc;
            this.containing=JSON.stringify(val.obj.docArticle);
            this.Got=true;
        })
    },
    methods: {
        follow(){
            if(this.info.follow){
                return;
            }
            alert("follow");
        }
    }
  };
</script>

<style scoped lang="scss">

    .window{
        overflow:auto;
    }
        .figure
    {
        width:60px;
        margin-right:5px;
        display:block;
        border-radius:50%;
        margin-right:1rem;
    }
    .QrCode{
        width:100%;
        padding:0 10%;
    }
</style>
