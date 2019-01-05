<template>
    <div class="m-header">
        <div class="btn-back" v-if="show_back" @click="back"></div>
        <div v-if="show_search">
            <label>
                <input v-if="show_search" type="text" v-model="input">
            </label>
            <div class="btn-search" @click="search"></div>
        </div>
        <div v-else>
            <div class="text" :class="{'left':!mid}" v-html="title"></div>
            <div class="btn-about" v-if="show_about" @click="about"></div>
        </div>
    </div>
</template>

<script>
    import Msg from 'common/js/message.js';

    export default {
        name: 'm_header',
        data() {
            return {
                show_back: false,
                title: '荣耀百科',
                mid: true,
                input: '',
                show_search: false,
                show_about: true
            }
        },
        mounted() {
            this._getMsg();
        },
        methods: {
            /**
             * 返回
             */
            back() {
                this.$router.go(-1);
            },
            /**
             * 更多
             */
            about() {
                this.$router.push({
                    path: '/about'
                });
            },
            search() {
            },
            /**
             * 获取传递的消息
             */
            _getMsg() {
                Msg.$on('header', (data) => {
                    this.show_back = data.show_back || false;
                    this.show_search = data.show_search || false;
                    this.show_about = data.show_about || false;
                    this.mid = data.mid || false;
                    this.title = data.title || '荣耀百科';
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .m-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 20rem;
        height: 2rem;
        line-height: 2rem;
        .btn-back {
            position: absolute;
            margin: 0.5rem;
            width: 1rem;
            height: 1rem;
            background: url('/static/images/back.png') center center no-repeat;
            background-size: contain;
        }
        .text {
            margin: 0 2rem;
            font-size: 0.875rem;
            font-weight: bold;
            text-align: center;
            color: #2c3e50;
            max-width: 16rem;
            height: 2rem;
            overflow: hidden;
        }
        .left {
            text-align: left;
        }
        input {
            position: absolute;
            top: 0.4rem;
            left: 2rem;
            right: 0;
            padding-left: 0.4rem;
            width: 15.8rem;
            height: 1.2rem;
            border-radius: 0.2rem;
            border: 1px solid rgba(200, 200, 200, 0.9);
            color: #868686;
            outline: none;
            box-sizing: border-box;
        }
        .btn-about {
            position: absolute;
            margin: 0.5rem 0.5rem 0.5rem 0;
            top: 0;
            right: 0;
            width: 1.5rem;
            height: 1rem;
            background: url('/static/images/about.png') center center no-repeat;
            background-size: contain;
        }
        .btn-search {
            position: absolute;
            margin: 0.5rem 0.5rem 0.5rem 0;
            top: 0;
            right: 0;
            width: 1.5rem;
            height: 1rem;
            background: url('/static/images/search.png') center center no-repeat;
            background-size: contain;
        }
    }
</style>
