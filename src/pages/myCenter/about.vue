<template>
    <div>
        <top>
            <div class="middle big">关于</div>
        </top>
      <div class="wrap">
        <div>
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>关于我们</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>检查新版本</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>使用条款</p>
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

        }
    }
</script>
<style scoped>

</style>
