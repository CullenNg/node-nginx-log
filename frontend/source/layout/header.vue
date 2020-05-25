<template>
    <div id="header">
        
    </div>
</template>

<script>
export default {

    methods: {
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