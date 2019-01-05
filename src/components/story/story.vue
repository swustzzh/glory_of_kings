<template>
    <!--显示英雄故事，历史上的ta-->
    <div class="story" v-show="showStory">
        <div class="cont">
            <div class="title" v-html="title"></div>
            <div class="desc" v-html="desc"></div>
        </div>
        <div class="btn" @click="hide"></div>
    </div>
</template>

<script>
    export default {
        name: "story",
        data() {
            return {
                showStory: false,
                title: '',
                desc: ''
            }
        },
        methods: {
            show: function (data) {
                this.title = data.title;
                this.desc = data.desc;
                this.showStory = true;
            },
            hide: function () {
                this.showStory = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .story {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(200, 200, 200, 0.2);
        z-index: 50;
        font-size: 0.75rem;
        .cont {
            position: fixed;
            top: 0;
            bottom: 4rem;
            left: 0;
            right: 0;
            margin: 2rem auto 0;
            width: 18rem;
            border-radius: 1rem;
            background-color: rgba(255, 255, 255, 0.95);
            color: #868686;
            text-align: center;
            line-height: 1.2rem;
            .title {
                line-height: 2rem;
                font-size: 0.875rem;
                font-weight: bold;
                color: #37c84d;
            }
            .desc {
                line-height: 1.05rem;
                text-align: left;
                position: fixed;
                top: 4rem;
                bottom: 4.5rem;
                left: 2rem;
                right: 2rem;
                overflow: auto;
                margin: 0 auto;
                width: 16rem;
            }
        }
        .btn {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 1rem;
            margin: 0.5rem auto;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: url("/static/images/close.png") center center no-repeat;
            -webkit-background-size: contain;
            background-size: contain;
        }
    }
</style>