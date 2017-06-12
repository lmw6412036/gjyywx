<template>
    <div class="tab">
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../../components/business/app-footer.vue"
    export default {
        data() {
            return {};
        },
        computed: {},
        components: {
            AppFooter
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    .tab{
        display: flex;
        flex-direction: column;
    }
</style>
