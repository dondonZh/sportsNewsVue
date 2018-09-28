<template>

    <nav class="bar bar-tab">
        <a class="tab-item external active" @click="routerReplace('/exchange/home')">
            <span class="icon icon-home"></span>
            <span class="tab-label">首页</span>
        </a>
        <!--<a class="tab-item external" @click="routerReplace('/address/new')">-->
            <!--<span class="icon icon-gift"></span>-->
            <!--<span class="tab-label">最新</span>-->
            <!--<span class="badge">2</span>-->
        <!--</a>-->
        <!--<a class="tab-item external" @click="routerReplace('/address/all')">-->
            <!--<span class="icon icon-message"></span>-->
            <!--<span class="tab-label">消息</span>-->
        <!--</a>-->
        <a class="tab-item external" @click="routerReplace('/user/me')">
            <span class="icon icon-me"></span>
            <span class="tab-label">个人中心</span>
        </a>

    </nav>

</template>

<script>

    export default {
        data() {
            return {
                path: ''
            }
        },
        methods: {
            routerReplace(path) {
                var nav = $(".tab-item").each(function () {//工具栏切换
                    $(this).removeClass('active');
                });
                event.currentTarget.setAttribute("class", "tab-item external active");
                this.$router.push(path);
            },
        },

    }

</script>
