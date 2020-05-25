<template>
    <div>
        <topbar></topbar>
        <left></left>
        <container></container>
        <bottom></bottom>
    </div>
</template>

<script>
// 全局组件
import topbar from './header.vue';
import container from './container.vue';
import bottom from './footer.vue';
import left from './left.vue';

export default {
    components: {
        topbar,
        container,
        bottom,
        left
    }
}
</script>