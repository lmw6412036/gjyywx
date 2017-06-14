<template>
    <div id="app">
        <router-view></router-view>
        <loading :show="loadingshow" :text="loadingtext"></loading>
        <toast :time="toasttime" :show="toastshow" :text="toasttext"></toast>
        <msg :text="msgtext" :show="msgshow" :time="msgtime"></msg>
    </div>
</template>

<script>
    import Msg from "./components/ui/msg.vue"
    import Toast from "./components/ui/toast.vue"
    import Loading from "./components/ui/loading.vue"
    export default {
        name: 'app',
        data(){
            return {
                loadingshow: false,
                loadingtext: "数据加载中...",
                toasttext: "成功",
                toastshow: false,
                toasttime: 3000,
                msgtext:"消息通知",
                msgshow:false
            }
        },
        computed: {},
        components: {Loading, Toast,Msg},
        mounted(){
            //console.log(this.$bus)
            this.$bus.$on('loading', (res) => {
                if (res.status == "start") {
                    this.loadingshow = true;
                }
                if (res.status == "stop") {
                    this.loadingshow = false;
                }
            });

            //
            this.$bus.$on("toast", (res) => {
                console.log('toast', res);

                if (res.text) {
                    this.toastshow = true;
                    this.toasttext = res.text;
                }
                if (res.time) {
                    this.toasttime = res.time;
                }
            })

            this.$bus.$on("toasthide", (res) => {
                this.toastshow=false;
            })

            setTimeout(() => {
                this.msgshow=true;
                this.msgtext="测试消息"
            },5000)

        },
        watch: {},
        methods: {}
    }
</script>

<style lang="scss">
    @import "common/base";

    #app {
        position: fixed;
        background-color: map_get($colors, bg);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        overflow: hidden;
        .view {
            flex: 1;
            overflow: hidden;
        }
        .viewpage {
            display: flex;
            flex-direction: column;
        }
    }
</style>
