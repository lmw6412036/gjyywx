<template>
    <div>
        <top>
            <div class="middle big">消费记录</div>
        </top>
      <div class="wrap">
        <div class="detail" v-for="item of 5">
          <div class="patImg">
            <img src="../../assets/logo.png" alt="">
          </div>
          <div class="patName">
            <ul>
              <li>李康飞 2017-12-23</li>
              <li>名医视频问诊</li>
            </ul>
          </div>
          <div class="state">
            支付500
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
            return {}
        },
        mounted(){
          Api('nethos.pay.order.list',{
            token:token
          }).then(req=>{
            console.log(req,7686)
          })
        }
    }
</script>
<style scoped>
.wrap{
  margin-top: 10px;
  box-sizing: border-box;
  padding-bottom: 10px;
  border-top: 1px solid gainsboro;
}
  .detail{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: white;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom: 1px solid gainsboro;

  }

  .patImg img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

</style>
