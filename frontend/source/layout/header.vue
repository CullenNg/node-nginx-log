<template>
    <div id="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handle_select">
            <el-menu-item index="1">Nginx日志</el-menu-item>
            <el-menu-item index="3" disabled>分析</el-menu-item>
            <el-menu-item index="4" disabled>其他</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeIndex: '1'
        }
    },

    methods: {
        handle_select () {

        }
    }
}
</script>

<style lang="less" scoped>

#header {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 60px;
    font-size: 0.48rem;
    text-align: center;
    line-height: 60px;
    display: flex;
    z-index: 3;
    background-color: #fff;
    padding-left: 14px;
    &:after {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background:rgba(139,139,139, 0.13);
        content: ' ';
    }
}

</style>