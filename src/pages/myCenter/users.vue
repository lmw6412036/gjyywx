<template>
    <div>
        <top>
            <div class="middle big">常用就诊人</div>
            <span slot="right" class="step" @click="goAddUser">添加</span>
        </top>
      <div class="wrap">
        <div class="patMassage">
          <div class="weui-cells" v-for="patDetail of list" @click="goEditUser(patDetail)">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <div class="detail">
                  <div class="name">
                    <ul>
                      <li>{{patDetail.compatName}} &nbsp;&nbsp;<span>{{patDetail.compatGender=='M'?'男':'女'}}&nbsp;&nbsp;{{patDetail.compatAge}}</span></li>
                      <li>手机号 : {{patDetail.compatMobile}}</li>
                      <li>身份证号 : {{patDetail.compatIdcard}}</li>
                      <li>病案号 : </li>
                    </ul>
                  </div>
                </div>
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
    var token = localStorage.getItem('token')
    export default{
        components: {
            top
        },
        data(){
            return {
              list:[],
              patId:""
            }
        },
        mounted(){
          Api('nethos.pat.compat.list',{
            token:token
          }).then(req=>{
            console.log(req,6666)
            if(req.succ){
              this.$set(this.$data,'list',req.list);
              this.$set(this.$data,'patId',req.list[0].patId)
            }
          })
        },
      methods:{
        goAddUser(){
          this.$router.push({
            name:'addUser',
            params:{
              patId:this.patId
            }
          })
        },
        goEditUser(patDetail){
          this.$router.push({
            name:'editUser',
            params:{
              patObj:patDetail
            }
          })
        },
      }
    }
</script>
<style scoped>
    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
  .name{
    color: gray;
  }
</style>
