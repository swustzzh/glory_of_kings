<template>
    <div class="equips">
        <!--装备类型-->
        <div class="types">
            <div
                class="item"
                v-for="(item, index) in types"
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
            <div
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="selectEquip(item.equip_id)"
            >
                <img class="image" :src="item.img_url">
                <div class="name">{{item.name}}</div>
            </div>
            <div class="clear"></div>
        </div>
        <equip-detail ref="detail"></equip-detail>
    </div>
</template>

<script>
import axios from "axios";
import EquipDetail from "components/equip_detail/equip_detail";
import Msg from "common/js/message.js";

export default {
    name: "equip",
    data() {
        return {
            types: [],
            list: []
        };
    },
    mounted() {
        Msg.$emit("header", {
            show_back: true,
            title: "所有装备"
        });
        this._getEquipTypes();
        this._getEquipList();
    },
    methods: {
        /**
         * 获取所有装备分类
         */
        _getEquipTypes: function() {
            axios
                .get("/api/equip/getTypes")
                .then(res => {
                    let rows = res.data.result.rows;
                    rows.unshift({ name: "全部", type: "", class: "type1" });
                    this.types = res.data.result.rows;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取所有装备列表
         */
        _getEquipList: function(type) {
            let params = type ? { equip_type: type } : {};
            axios
                .get("/api/equip/getList", {
                    params: params
                })
                .then(res => {
                    this.list = res.data.result.rows;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 选择某个装备类型
         */
        selectType: function(item) {
            this.types.forEach(it => {
                it.class = "";
            });
            item.class = "type" + (item.type + 1);
            this._getEquipList(item.type);
        },
        /**
         * 选择某个装备
         */
        selectEquip: function(id) {
            axios
                .get(`/api/equip/getDetail`, {
                    params: {
                        equip_id: id
                    }
                })
                .then(res => {
                    let r = res.data.result;
                    this.$refs.detail.show(r);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    components: {
        EquipDetail
    }
};
</script>

<style scoped lang="less">
@typeHeight: 1.4rem;
.equips {
    font-size: 0;
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
        }
        .type2 {
            background-color: #5dd473;
        }
        .type3 {
            background-color: #b92fb9;
        }
        .type4 {
            background-color: #7cfcfc;
        }
        .type5 {
            background-color: #92f90c;
        }
        .type6 {
            background-color: #e84a33;
        }
        .type8 {
            background-color: #e7ca63;
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
        // 装备项
        .item {
            margin: 0.5rem 0 0 0.8rem;
            float: left;
            img {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
            }
            .name {
                width: 4rem;
                height: 1.2rem;
                text-align: center;
                font-size: 0.75rem;
            }
        }
    }

    .clear {
        clear: both;
    }
}
</style>