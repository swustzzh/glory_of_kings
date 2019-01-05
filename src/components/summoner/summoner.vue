<template>
    <div class="summoner">
        <div class="cont">
            <img :src="summoner.big_img_url" alt>
            <div class="name" v-html="summoner.name"></div>
            <div class="grade">等级{{summoner.rank}}解锁</div>
            <div class="cd">冷却时间：{{summoner.cd}}秒</div>
            <div class="desc" v-html="summoner.description"></div>
        </div>
        <div class="items">
            <div class="item" v-for="(item, index) in list" :key="index" @click="select(item)">
                <div
                    class="image"
                    :style="{background:'url('+item.img_url+') center center no-repeat'}"
                    :class="item.class"
                ></div>
                <div class="name" v-html="item.name"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Msg from "common/js/message.js";
import axios from "axios";

export default {
    name: "summoner",
    data() {
        return {
            list: [],
            summoner: {}
        };
    },
    mounted() {
        Msg.$emit("header", {
            title: "召唤师技能",
            show_back: true
        });
        this._initList();
    },
    methods: {
        /**
         * 初始化所有技能
         * @private
         */
        _initList: function() {
            axios
                .get("/api/summoner/getList")
                .then(res => {
                    let rows = res.data.result.rows;
                    rows[0].class = "active";
                    this.list = rows;
                    this.summoner = rows[0];
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 选择某个技能
         */
        select: function(item) {
            this.list.forEach(item => {
                item.class = "";
            });
            item.class = "active";
            this.summoner = item;
        }
    }
};
</script>

<style scoped lang="less">
.summoner {
    color: #868686;
    font-size: 0.75rem;
    // 大图
    .cont {
        margin: 0 0.5rem 0.5rem;
        border-bottom: 1px solid #eee;
        img {
            width: 19rem;
            border-radius: 5px;
        }
        .name {
            line-height: 1.6rem;
            font-size: 0.875rem;
            font-weight: bold;
            color: #00a383;
        }
        .grade,
        .cd {
            line-height: 1.2rem;
        }
        .desc {
            line-height: 1.2rem;
            height: 2.5rem;
        }
    }
    // 所有技能
    .items {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0.5rem;
        margin: 0 auto;
        width: 20rem;
        .item {
            width: 4.75rem;
            display: inline-block;
            text-align: center;
            .image {
                margin: 0 auto;
                width: 3rem;
                height: 3rem;
                border-radius: 10px 0 10px 0;
                border: 2px solid #eee;
            }
            .name {
                margin-bottom: 0.2rem;
                line-height: 1.4rem;
            }
            .active {
                border: 2px solid #92f90c;
            }
        }
    }
}
</style>