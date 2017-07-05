<template>
  <div id="wrapper" ref="wrapper">
      <div id="scroller" ref="scroller">
          <slot name="pullDown">
              <div id="pullDown" style="display:flex;flex-direction:row;justify-content:center;align-items:center"><div>下拉刷新</div></div>
    </slot>
          <slot name="containing"></slot>
 
          <div ref="supplement" style="height:0px;background-color:#F8F8F8" id="supplement"></div>
          <slot name="pullUp" v-if="hasRight">
              <div id="pullUp" ref="pullUp" style="text-align:center;" >正在加载</div>
    </slot>
    </div>
    </div>
</template>

<script>
    import {scrollprobe} from"./iscroll-probe.js";
    import {isPassive} from "./demoUtils.js";



  export default {
      mounted()
      {
          var that=this;
          document.getElementById("wrapper").style.top=this.top+'px';
          if(this.hasRight)
          {
              document.getElementById("pullUp").style.height=this.bottom+'px';
          }
          setTimeout(that.load,20);

      },
      data()
      {
          return{
              myScroll:{},
              pullDownOffset:0,
              step:0,
              isShown:false,
              flag:false
          }
      },
      computed:{
          hasRight(){
              return eval(this.right);
          }
      },
      props:
      {
          right:{
             type:String,
              default:"false",
              required:false
          },
          isCompleted:
          {
              type:Boolean,
              default:false,
              required:false
          },
          nothingMore:
          {
              type:Boolean,
              default:false,
              required:false
          }
          ,
          
          height:{
              type:String,
              default:"50",
              required:false
      },
          top:{
              type:String,
              default:"105",
              requried:false
          },
          bottom:{
              type:String,
              default:"30",
              required:false
          }
      },
      watch:
      {
          isCompleted()
          {
              
              if(this.isCompleted){
                  this.isShown=false;
                  if(this.step==1)
                  {
                      this.myScroll.scrollTo(0,this.pullDownOffset,300);
                      document.getElementById("pullDown").innerHTML="下拉刷新";
                  }
                  else
                  {
                      
                      if(this.nothingMore)
                      {
                          this.$refs.pullUp.innerHTML="无更多内容";
                      }
                  }
                  this.step=0;
                 setTimeout(()=>{this.flag=false;},1000);
                  setTimeout(()=>{this.refresh()},100);
              }
          }
      },
      methods:
      {
          refresh(){
            this.$refs.supplement.style.height=0+'px';
              let wrapperHeight=this.myScroll.wrapper.clientHeight;
              console.log("wrapperHeight"+wrapperHeight);
              let scrollerHeight=this.myScroll.scroller.clientHeight;
              console.log("scrollerHeight"+scrollerHeight);
              let tempHeight=wrapperHeight-scrollerHeight-this.pullDownOffset;
              if(this.hasRight){
                  tempHeight+=parseInt(this.bottom);
              }
              console.log("tempHEIGHT"+tempHeight);
              this.$refs.supplement.style.height=Math.max(tempHeight,0)+'px';
              console.log("supplement"+this.$refs.supplement.style.height);
              if(this.$refs.supplement.style.height==0){this.isShown=true};
              this.myScroll.refresh();
          },
          load()
              {  
              
                  var pullDownEl = document.getElementById('pullDown');
                  var _this=this;
                  document.getElementById("pullDown").style.height=this.height+'px';
                  this.pullDownOffset=-parseInt(this.height);
                  this.myScroll = new IScroll('#wrapper', {
                       useTranstion:true,
                       fadeScrollbars:true,
                       scrollY:true,
                       scrollX:true,
                       probeType:2,
                       startY:this.pullDownOffset
                   });
                  this.refresh();
                  this.myScroll.scrollTo(0,this.pullDownOffset,300);
                  var pullDown=document.getElementById('pullDown');
                  var pullUp=document.getElementById("pullUp");
                    
                  this.myScroll.on("scrollEnd",()=>{    
                      if(this.myScroll.y==this.myScroll.maxScrollY&&this.hasRight&&!this.flag){
                        this.step=2;
                        this.flag=true;
                    }
                    if(this.myScroll.y==0)
                    {
                        if(this.step==0)
                        {
                            this.myScroll.scrollTo(0,_this.pullDownOffset,300);
                        }
                        else
                        {
                            if(this.step==1&&this.flag){
                                pullDown.innerHTML="加载中";
                                setTimeout(()=>{this.$emit("pullDown");},200);
                              
                            }
                        }
                    }
                    else if(this.myScroll.y>this.pullDownOffset){
                            this.myScroll.scrollTo(0,_this.pullDownOffset,300);
                    }
                    else if(this.myScroll.y<this.myScroll.maxScrollY-this.pullDownOffset){
                        if(this.step==2&&this.flag){
                            this.$emit("pullUp");
                            } 
                    }
                  
                });
              
              this.myScroll.on("scroll",()=>{
                  if(this.step==0&&this.myScroll.y>0&&!_this.flag){
                      pullDown.innerHTML="释放更新";
                      _this.step=1;
                      _this.flag=true;
                  }
                    if (this.myScroll.y<=0){
                        pullDown.innerHTML="下拉刷新";
                    }
              });
          }
      }
  }
</script>

<style scoped lang="scss">

#wrapper {
    position: absolute;  
    z-index: 1;
    bottom: 50px;  
    left: 0;  
    width: 100%;  
    background: rgb(248, 248, 248);  
    overflow: auto;
}

#scroller {
    background-color:rgb(248, 248, 248);
    position: absolute;  
    z-index: 1;  
    -webkit-tap-highlight-color: rgba(0,0,0,0);  
    width: 100%;  
    -webkit-transform: translateZ(0);  
    -moz-transform: translateZ(0);  
    -ms-transform: translateZ(0);  
    -o-transform: translateZ(0);  
    transform: translateZ(0);  
    -webkit-touch-callout: none;  
    -webkit-user-select: none;  
    -moz-user-select: none;  
    -ms-user-select: none;  
    user-select: none;  
    -webkit-text-size-adjust: none;  
    -moz-text-size-adjust: none;  
    -ms-text-size-adjust: none;  
    -o-text-size-adjust: none;  
    text-size-adjust: none; 
}
</style>
