<template>
    <div id="mainlayer">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    computed: {
        loading () {
            return this.$store.state.loading;
        }
    },
    watch: {
        /**
         * 监听 store 里面的 loading 状态
         */
        loading (val) {
            this.$loading(val);
        }
    }
}
</script>

<style lang="less" scoped>

#mainlayer {
    position: relative;
    padding-top: 74px;
    padding-right: 14px;
    margin-left: 200px;
    padding-left: 14px;
    
}

</style>
