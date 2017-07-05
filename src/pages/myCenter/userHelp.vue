<template>
    <div>
        <top>
            <div class="middle big">使用说明</div>
        </top>
      <div class="wrap">
        <div class="project">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(1)">
              <div class="weui-cell__bd">
                <p>全科分诊</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(2)">
              <div class="weui-cell__bd">
                <p>名医视频</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(3)">
              <div class="weui-cell__bd">
                <p>在线医生</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(4)">
              <div class="weui-cell__bd">
                <p>预约挂号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(5)">
              <div class="weui-cell__bd">
                <p>查报告单</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;"  @click="goDetail(6)">
              <div class="weui-cell__bd">
                <p>排队叫号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(7)">
              <div class="weui-cell__bd">
                <p>我的医生</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>
        </div>
        <div class="patMessage">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(8)">
              <div class="weui-cell__bd">
                <p>常用就诊人</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(9)">
              <div class="weui-cell__bd">
                <p>健康档案</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(10)">
              <div class="weui-cell__bd">
                <p>消费明细</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>
        </div>
        <div class="account">
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;"  @click="goDetail(11)">
              <div class="weui-cell__bd">
                <p>修改绑定手机号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(12)">
              <div class="weui-cell__bd">
                <p>修改密码</p>
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
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){

        },
        methods: {
          goDetail(state){
            this.$router.push({
              name: 'detailDescription',
              params: {
                state: state
              }
            })
          },

        }
    }
</script>
<style scoped>

</style>
