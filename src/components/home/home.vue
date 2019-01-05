<template>
    <div class="home">
        <!-- 推荐内容 -->
        <div class="recommend">
            <div class="title">推荐内容</div>
            <div class="text" v-html="recom_text"></div>
            <img :src="recom_img" alt>
        </div>
        <!-- 英雄，装备，铭文 -->
        <div class="list">
            <router-link
                tag="div"
                class="item"
                v-for="(item,index) in list"
                :key="index"
                :class="{'mar-left':index%2,'mar-top':index>1}"
                :to="{name:item.class}"
            >
                <img class="image" :src="item.img_url" alt>
                <div :class="item.class"></div>
                <div class="text" v-html="item.name"></div>
            </router-link>
            <div class="clear"></div>
        </div>
        <!-- 周免英雄 -->
        <div class="week">
            <div class="title">周免英雄</div>
            <div class="items" ref="week_items">
                <router-link
                    tag="div"
                    class="item"
                    v-for="(item, index) in week"
                    :class="{'mar-left': index!= 0}"
                    :key="item.hero_id"
                    :to="{name:'hero_detail',params:{hero_id:item.hero_id}}"
                >
                    <img :src="item.img_url" alt>
                    <div class="name" v-html="item.name"></div>
                </router-link>
            </div>
        </div>
        <!-- 新手推荐 -->
        <div class="junior">
            <div class="title">新手推荐</div>
            <div class="items" ref="junior_items">
                <router-link
                    tag="div"
                    class="item"
                    v-for="(item, index) in junior"
                    :key="item.hero_id"
                    :class="{'mar-left': index!== 0}"
                    :to="{name:'hero_detail',params:{hero_id:item.hero_id}}"
                >
                    <img :src="item.img_url" alt>
                    <div class="name" v-html="item.name"></div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Msg from "common/js/message.js";

export default {
    name: "home",
    data() {
        return {
            recom_text: "",
            recom_img: "",
            list: [],
            week: [],
            hot: [],
            junior: []
        };
    },
    mounted() {
        Msg.$emit("header", {
            mid: true,
            show_about: true
        });
        this._getWeekHeros();
        this._getJuniorHeros();
        this._initRecom();
        this._initList();
    },
    methods: {
        // 获取周免英雄
        _getWeekHeros() {
            axios
                .get("/api/common/getweek")
                .then(res => {
                    if (res.data.success) {
                        this.week = res.data.result.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取新手英雄
        _getJuniorHeros() {
            axios
                .get("/api/hero/getJunior")
                .then(res => {
                    if (res.data.success) {
                        this.junior = res.data.result.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取热门英雄
        _getHotHeros() {
            axios
                .get("/api/hero/getHot")
                .then(res => {
                    if (res.data.success) {
                        this.hot = res.data.result.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 初始化推荐内容
        _initRecom() {
            this.recom_text = "史上最柔的巨无霸，防御塔守护者--盾山";
            this.recom_img =
                "http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/509/509-bigskin-1.jpg";
        },
        // 初始化英雄，装备，铭文数据
        _initList() {
            this.list = [
                {
                    name: "英雄",
                    class: "heros",
                    img_url: "/static/images/kai.png"
                },
                {
                    name: "装备",
                    class: "equip",
                    img_url:
                        "http://game.gtimg.cn/images/yxzj/img201606/itemimg/1235.jpg"
                },
                {
                    name: "铭文",
                    class: "inscription",
                    img_url:
                        "http://game.gtimg.cn/images/yxzj/img201606/mingwen/3518.png"
                },
                {
                    name: "技能",
                    class: "summoner",
                    img_url:
                        "https://game.gtimg.cn/images/yxzj/img201606/summoner/80115.jpg"
                }
            ];
        }
    }
};
</script>
<style scoped lang="less">
@fontSmall: 0.75rem;
@fontMiddle: 0.875rem;
@fontBig: 1rem;

@borderRadius: 5px;

// 主页
.home {
    // 推荐内容
    .recommend {
        margin: 0 auto 0.5rem;
        width: 19rem;
        font-size: 0;
        .title {
            font-size: @fontMiddle;
            font-weight: bold;
        }
        .text {
            font-size: @fontMiddle;
            line-height: 1.5rem;
            color: #868686;
        }
        img {
            width: 19rem;
            border-radius: @borderRadius;
        }
    }

    // 英雄，装备，铭文
    .list {
        margin: 1.5rem auto 0.5rem;
        font-size: @fontMiddle;
        font-weight: bold;
        color: white;
        width: 19rem;
        // 单个内容
        .item {
            position: relative;
            width: 9.25rem;
            height: 3rem;
            float: left;
            border-radius: @borderRadius;
            .image {
                position: absolute;
                top: -0.8rem;
                right: 0.2rem;
                width: 3rem;
                height: 3rem;
                transform: scale(0.9);
                border-radius: 50%;
                object-fit: contain;
                filter: opacity(0.7) saturate(3);
                -webkit-filter: opacity(0.7) saturate(3);
                z-index: 1;
            }
            .text {
                position: absolute;
                left: 0.2rem;
                bottom: 0.6rem;
                color: white;
            }
        }
        .heros,
        .equip,
        .inscription,
        .summoner {
            position: absolute;
            top: 0;
            left: 0;
            border-radius: @borderRadius;
            width: 100%;
            height: 100%;
            filter: opacity(0.7);
        }
        .heros {
            background-image: -webkit-linear-gradient(
                bottom left,
                #1057fc,
                #7cfcfc
            );
            background-image: -o-linear-gradient(bottom left, #1057fc, #7cfcfc);
            background-image: linear-gradient(to top right, #1057fc, #7cfcfc);
        }
        .equip {
            background-image: -webkit-linear-gradient(
                bottom left,
                #b92fb9,
                #be81f7
            );
            background-image: -o-linear-gradient(bottom left, #b92fb9, #be81f7);
            background-image: linear-gradient(to top right, #b92fb9, #be81f7);
        }
        .inscription {
            background-image: -webkit-linear-gradient(
                bottom left,
                #31b404,
                #81f781
            );
            background-image: -o-linear-gradient(bottom left, #31b404, #81f781);
            background-image: linear-gradient(to top right, #31b404, #81f781);
        }
        .summoner {
            background-image: linear-gradient(to top right, #ff0040, #f3f781);
            background-image: -webkit-linear-gradient(
                bottom left,
                #ff0040,
                #f3f781
            );
            background-image: -o-linear-gradient(bottom left, #ff0040, #f3f781);
        }
        .mar-left {
            margin-left: 0.5rem;
        }
        .mar-top {
            margin-top: 1.2rem;
        }
    }

    // 周免英雄 // 新手推荐
    .week,
    .junior {
        margin: 0 0.5rem;
        .title {
            line-height: 2rem;
            font-size: @fontMiddle;
            font-weight: bold;
        }
        .items {
            white-space: nowrap;
            overflow-y: hidden;
            font-size: 0;
        }
        // 单个英雄
        .item {
            display: inline-block;
            width: 3rem;
            // 图片
            img {
                width: 3rem;
                height: 3rem;
                background-size: contain;
            }
            // 名称
            .name {
                line-height: 1rem;
                font-size: @fontSmall;
                text-align: center;
                color: #868686;
            }
        }
        .mar-left {
            margin-left: 1rem;
        }
    }
    .clear {
        clear: both;
    }
}
</style>