<template>
    <div ref="msg" class="fixed msg tac" v-show="isshow">
        <span class="big">{{text}}</span>
    </div>
</template>

<script>
    import Dom from  "../../lib/dom"
    export default {
        props: {
            text: String,
            time: {
                type: Number,
                default: 3000
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {};
        },
        computed: {
            isshow: {
                get(){
                    this._show(this.show);
                    return this.show
                },
                set(value){
                    console.log('set', value)
                }
            }
        },
        components: {},
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
            _show(value){
                console.log("kdkdk", value)
                if (value) {
                    console.log(Dom.hasClass(this.$refs.msg,'tac'))
                    setTimeout(() => {
                        console.log("定时")
                    }, this.time)
                }
            }
        },
        watch: {}
    };
</script>

<style scoped lang="scss">
    .msg {
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 20170000;
        opacity: 0;
        transition: all 3s;
        &.show {
            opacity: 1;
            bottom: 4rem;
        }
        span {
            border-radius: .5rem;
            padding: .5rem 2rem;
            display: inline-block;
            color: white;
            background-color: rgba(0, 0, 0, .5);
        }
    }
</style>
