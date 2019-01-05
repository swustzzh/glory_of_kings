<template>
    <div class="heros">
        <div class="types">
            <div
                class="item"
                v-for="(item,index) in types"
                :key="index"
                @click="selectType(item)"
                :class="item.class"
            >
                <div class="type" v-html="item.name"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="line"></div>
        <!-- 内容 -->
        <div class="cont">
            <router-link
                tag="div"
                class="item"
                v-for="(it,index) in list"
                :key="index"
                :to="{name: 'hero_detail', params:{ hero_id: it.hero_id}}"
            >
                <div
                    class="image"
                    v-bind:style="{background:'url('+it.img_url+') center center no-repeat'}"
                ></div>
                <div class="desc">
                    <div class="name" v-html="it.name"></div>
                    <div class="type" v-html="it.type" :style="{color:type_color}"></div>
                </div>
                <div class="clear"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Msg from "common/js/message.js";

export default {
    name: "heros",
    data() {
        return {
            types: [],
            colors: [
                "#1c8fea",
                "#5dd473",
                "#b92fb9",
                "#fcac2e",
                "#4f18f9",
                "#e84a33",
                "#bbe745"
            ],
            type_color: "", // 类型颜色
            heros: [],
            list: []
        };
    },
    created() {
        Msg.$emit("header", {
            show_back: true,
            title: "所有英雄"
        });
        this.type_color = this.colors[0];
        this._getTypes();
        this._getHeros();
    },
    methods: {
        /**
         * 获取所有英雄分类
         */
        _getTypes: function() {
            this.types = [
                {
                    type: "",
                    name: "全部",
                    class: "type1"
                },
                {
                    type: 1,
                    name: "战士",
                    class: ""
                },
                {
                    type: 2,
                    name: "法师",
                    class: ""
                },
                {
                    type: 3,
                    name: "坦克",
                    class: ""
                },
                {
                    type: 4,
                    name: "刺客",
                    class: ""
                },
                {
                    type: 5,
                    name: "射手",
                    class: ""
                },
                {
                    type: 6,
                    name: "辅助",
                    class: ""
                }
            ];
        },
        /**
         * 获取所有英雄列表
         */
        _getHeros: function(type) {
            axios
                .get("/api/hero/getList")
                .then(it => {
                    let rows = it.data.result.rows;
                    rows.forEach(it => {
                        it.type = this.types[it.hero_type].name;
                        if (it.hero_type2) {
                            it.type += `/${this.types[it.hero_type2].name}`;
                        }
                        this.heros.push(it);
                    });
                    this.list = this.heros;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取某个类型的英雄
         */
        _getTypeHeros(type, name) {
            if (name !== "全部") {
                this.list = [];
                this.heros.forEach(it => {
                    if (it.type.indexOf(name) !== -1) {
                        this.list.push({
                            hero_id: it.hero_id,
                            name: it.name,
                            img_url: it.img_url,
                            type: name
                        });
                    }
                });
            } else {
                this.list = this.heros;
            }
        },
        /**
         * 选择某个英雄类型
         */
        selectType: function(item) {
            this.types.forEach(it => {
                it.class = "";
            });
            item.class = `type${item.type + 1}`;
            this._getTypeHeros(item.type, item.name);
            this.type_color = this.colors[item.type || 0];
        },
        /**
         * 选择某个英雄
         */
        selectHero: function(id) {
            this.$router.push({
                path: `/hero_detail/${id}`
            });
        }
    }
};
</script>

<style scoped lang="less">
@typeHeight: 1.4rem;
.heros {
    font-size: 0;
    color: #868686;
    .types {
        margin: 0 0.8rem 0.5rem 0.4rem;
        white-space: nowrap;
        overflow-y: hidden;
        .item {
            margin-left: 0.4rem;
            width: 3rem;
            line-height: @typeHeight;
            font-size: 0.75rem;
            text-align: center;
            border-radius: 0.6rem;
            display: inline-block;
        }
        .interval {
            margin-left: 0.4rem;
        }
        .type1 {
            background-color: #1c8fea;
            color: white;
        }
        .type2 {
            background-color: #5dd473;
            color: white;
        }
        .type3 {
            background-color: #b92fb9;
            color: white;
        }
        .type4 {
            background-color: #fcac2e;
            color: white;
        }
        .type5 {
            background-color: #4f18f9;
            color: white;
        }
        .type6 {
            background-color: #e84a33;
            color: white;
        }
        .type7 {
            background-color: #bbe745;
            color: white;
        }
    }
    .line {
        border-bottom: 1px solid rgba(120, 120, 120, 0.2);
    }
    .cont {
        position: fixed;
        top: @typeHeight + 2.5rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        margin: 0.5rem auto;
        width: 20rem;
        font-size: 0;
        // 英雄项
        .item {
            margin: 0.5rem 0.5rem 1rem;
            .image {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                float: left;
            }
            .desc {
                margin-left: 0.5rem;
                line-height: 1.4rem;
                font-size: 0.75rem;
                float: left;
                .name {
                    height: 1.6rem;
                    font-size: 0.875rem;
                }
            }
        }
    }

    .clear {
        clear: both;
    }
}
</style>