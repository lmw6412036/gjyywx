<template>
    <div>
      <top>
        <div class="middle big">付款</div>
      </top>
      <div class="wrap">
        <div class="detail">
          <ul>
            <li>订单金额</li>
            <li>￥199</li>
          </ul>

        </div>

          <div class="weui-cells__title">支付方式</div>
          <div class="way" @click="selectPeople">
            <div>微信</div>
            <div>
              <i class="weui-icon-success "></i>
            </div>
          </div>

        <div class="btn">

          <a href="javascript:;" class="weui-btn weui-btn_default">提交</a>

        </div>

      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api'
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){

        }
    }
</script>
<style  scoped>
  .detail{
    background: white;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    height: 150px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 15px;
    text-align: center;
  }
  .way{
    background: white;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .btn{
    box-sizing: border-box;
    margin-top: 100px;
    padding: 10px 15px;
  }
</style>
