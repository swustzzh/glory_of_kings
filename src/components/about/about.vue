<template xmlns="http://www.w3.org/1999/html">
    <div class="about">
        <div class="image"></div>
        <div class="name" v-html="name"></div>
        <div class="msg" v-html="QQ"></div>
        <div class="msg" v-html="email"></div>
        <div class="tips" v-html="tips"></div>
        <!--<div class="github">github<br><a :href="git" v-html="git"></a></div>-->
        <div class="version" v-html="'当前版本<br>' + version+'<br><br>更新时间<br>' + time"></div>
        <div class="desc" v-html="desc"></div>
    </div>
</template>

<script>
import Msg from "common/js/message.js";
import axios from "axios";

export default {
    name: "about",
    data() {
        return {
            name: "z智慧",
            QQ: "1436154055",
            email: "swustzzh@163.com",
            tips: "人间不值得",
            // git: 'https://github.com/swustzzh/glory_of_kings',
            version: "战神觉醒 指挥官驾到 长城守卫军集结版本",
            time: "2018.11.22",
            desc: "数据取自王者荣耀官网<br>属于个人学习作品，请勿商用<br>"
        };
    },
    mounted() {
        Msg.$emit("header", {
            show_back: true,
            title: "关于"
        });
    },
    methods: {
        /**
         * 获取所有访问次数
         */
        _get_visits() {
            axios.get("/api/common/visit_count").then(res => {
                this.visits = res.data.result;
            });
        }
    }
};
</script>

<style scoped lang="less">
.about {
    text-align: center;
    color: #868686;
    font-size: 0.75rem;
    .image {
        margin: 2rem auto;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background: url("/static/images/head.jpg") center center no-repeat;
        -webkit-background-size: contain;
        background-size: contain;
    }
    .name {
        line-height: 2rem;
        letter-spacing: 1px;
        color: #e84a33;
        font-size: 0.875rem;
        font-weight: bold;
    }
    .msg {
        line-height: 1.2rem;
        color: #1c8fea;
    }
    .tips {
        margin: 1rem auto;
    }
    .github {
        margin: 1rem auto;
    }
    .version {
        margin: 2rem;
        color: #6e6d87;
    }
    .desc {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        margin-bottom: 1rem;
    }
}
</style>