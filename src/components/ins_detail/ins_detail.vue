<template>
    <div class="ins-detail" v-show="showPanel">
        <div class="cont">
            <div class="image" :style="{background:'url('+ins.img_url+') center center no-repeat'}"></div>
            <div class="name" v-html="ins.name"></div>
            <div class="des" v-html="ins.description"></div>
            <div class="type" v-html="'类型：'+ins.type"></div>
            <div class="grade" v-html="'等级：'+ins.grade"></div>
        </div>
        <div class="btn" @click="hide"></div>
    </div>
</template>
<script>
    export default {
        name: 'ins_detail',
        data() {
            return {
                showPanel: false,
                ins: {}
            }
        },
        watch: {
            ins(newVal) {
                let type = newVal.type;
                if (type === 'red') {
                    newVal.type = '红';
                } else if (newVal.type === 'yellow') {
                    newVal.type = '蓝'
                } else {
                    newVal.type = '绿';
                }
            }
        },
        methods: {
            show: function (data) {
                this.showPanel = true;
                this.ins = data;
            },
            hide: function () {
                this.showPanel = false;
            }
        }
    }
</script>
<style scoped lang="less">
    .ins-detail {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(200, 200, 200, 0.4);
        z-index: 50;
        font-size: 0.75rem;
        .cont {
            margin: 10rem auto 0;
            padding: 2rem;
            width: 12rem;
            border-radius: 1rem;
            background-color: rgba(255, 255, 255, 0.95);
            color: #868686;
            text-align: center;
            line-height: 1.2rem;
            .image {
                height: 3rem;
            }
            .name {
                line-height: 2rem;
                font-size: 0.875rem;
                font-weight: bold;
                color: #37c84d;
            }
            .des {
                margin: 0 1rem;
                line-height: 1.05rem;
            }
            .type {
                color: #1c8fea;
                line-height: 1.6rem;
            }
            .price {
                color: #da951c;
            }
        }
        .btn {
            margin: 1rem auto;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: url("/static/images/close.png") center center no-repeat;
            -webkit-background-size: contain;
            background-size: contain;
        }
    }
</style>