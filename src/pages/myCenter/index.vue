<template>
    <div>
        <top>
            <div class="middle big">我的</div>
        </top>
      <div class="wrap">
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;" >
            <div class="weui-cell__bd">
             <div class="detail">
               <div class="patImg">
                 <label for="upload_img" class="label_img"> <img :src="patDetail.patAvatar" alt=""></label>
                 <input  @change.stop="upLoad" type="file" id="upload_img" >
               </div>

               <div class="name">
                 <ul>
                   <li>{{patDetail.patName}}</li>
                   <li class="sex">{{patDetail.patGender=='M'?'男':'女'}}  {{patDetail.age}}</li>
                 </ul>
               </div>
             </div>
            </div>
            <div class="weui-cell__ft" @click.stop="goMyMsg(patDetail)">
            </div>
          </a>
        </div>
        <div class="project">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>我的问诊</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goUsers">
              <div class="weui-cell__bd">
                <p>常用就诊人</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goMyRegistration(patDetail.patId)">
              <div class="weui-cell__bd">
                <p>我的挂号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
        <div class="health">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>健康档案</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
        <div class="consume">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goExpenseHistory">
              <div class="weui-cell__bd">
                <p>消费记录</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
        <div class="account">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goAccount">
              <div class="weui-cell__bd">
                <p>账户相关</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goUserHelp">
              <div class="weui-cell__bd">
                <p>使用帮助</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="about">
              <div class="weui-cell__bd">
                <p>关于</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    import ajax from '../../lib/ajax'
    var token = localStorage.getItem('token');
    export default{
        components: {
            top
        },
        data(){
            return {
              patDetail:{},
              attaId:'',
              patId:''
            }
        },
        mounted(){
          this.getData()

        },
      methods:{
        getData(){
          Api('nethos.pat.info.get',{
            token:token
          }).then(req=>{
            console.log(req,56666);
            if(req.succ){
              this.$set(this.$data,'patDetail',req.obj)
              this.$set(this.$data,'patId',req.obj.patId)
            }else {
              alert('获取失败')
            }
          })
        },
        editDetail(){
          Api('nethos.pat.info.modify',{
            patId:this.patId,
            patAvatar:this.attaId,
            token:token
          }).then(req=>{
            if(req.succ){
              this.getData()
            }else {
              alert('更换失败')
            }
          })
        },
        upLoad(e){
          console.log(456456)
          e.stopPropagation();
          var files = e.target.files[0]
          ajax(files,{}).then(data=>{
            if(data.succ){
              this.attaId = data.obj.attaId;
              this.editDetail();
            }
          })
        },
        goUserHelp(){
          this.$router.push('userHelp')
        },
        goMyRegistration(patId){
          console.log(patId)
          this.$router.push({
            name:'myRegistration',
           params:{
             id:patId
           }
          })
        },
        goUsers(){
          this.$router.push('users')
        },
        goExpenseHistory(){
          this.$router.push('expenseHistory')
        },
        goAccount(){
          this.$router.push('accountAbout')
        },
        goMyMsg(patDetail){
          console.log(patDetail)
          this.$router.push({
            name:'editMe',
            params:{
              patDetail:patDetail
            }
          })
        },
        about(){
          this.$router.push('about')
        }
      }
    }
</script>
<style scoped>
  .detail{
    display: flex;
    box-sizing: border-box;
    padding: 10px;
  }
  .patImg{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .patImg img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .name{
    box-sizing: border-box;
    padding-left: 15px;
  }
  .sex{
    color: gray;
  }
  .project{
    margin: 15px 0px;
  }
  .health{
    margin-bottom: 15px;
  }
  #upload_img{
    display: none;
  }
</style>
