<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import AppHeader from './components/business/app-header.vue'
    export default {
        name: 'app',
        data(){
            return {}
        },
        computed: {
            t(){
                return this.$store.state.news.t;
            }
        },
        components: {AppHeader},
        mounted(){

        },
        watch: {},
        methods: {
            tt(){
                this.$store.dispatch("news_t", 2)
            }
        }
    }
</script>

<style lang="scss">
    @import "common/common";
    #app {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        > .view {
            overflow: hidden;
            flex: 1;
        }
    }
</style>
