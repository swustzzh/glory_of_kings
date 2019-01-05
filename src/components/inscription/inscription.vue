<template>
    <div class="inscription">
        <!--类型-->
        <div class="types">
            <!--类型-->
            <div
                class="item"
                v-for="(item, index) in types"
                :key="index"
                @click="selectType(item,index)"
                :class="item.class"
            >
                <div class="type" v-html="item.name"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="types">
            <!--等级-->
            <div
                class="item"
                v-for="(item, index) in grades"
                :key="index"
                @click="selectGrade(item,index)"
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
                @click="selectIns(item.inscription_id)"
            >
                <div
                    class="image"
                    :style="{background:'url('+item.img_url+') center center no-repeat'}"
                ></div>
                <div class="name">{{item.name}}</div>
            </div>
            <div class="clear"></div>
        </div>
        <ins-detail ref="detail"></ins-detail>
    </div>
</template>

<script>
import axios from "axios";
import InsDetail from "components/ins_detail/ins_detail";
import Msg from "common/js/message.js";

export default {
    name: "inscription",
    data() {
        return {
            types: [],
            grades: [],
            list: [],
            type: "",
            grade: ""
        };
    },
    mounted() {
        this.type = "";
        this.grade = "";
        Msg.$emit("header", {
            show_back: true,
            title: "所有铭文"
        });
        this._getTypes();
        this._getGrades();
        this._getList();
    },
    methods: {
        /**
         * 获取所有分类
         */
        _getTypes() {
            this.types = [
                {
                    name: "全部",
                    class: "type1"
                },
                {
                    name: `红`,
                    class: ``
                },
                {
                    name: `蓝`,
                    class: ``
                },
                {
                    name: `绿`,
                    class: ``
                }
            ];
        },
        /**
         * 获取所有等级
         */
        _getGrades() {
            this.grades = [
                {
                    name: "全部",
                    class: "grade1"
                },
                {
                    name: 1,
                    class: ``
                },
                {
                    name: 2,
                    class: ``
                },
                {
                    name: 3,
                    class: ``
                },
                {
                    name: 4,
                    class: ``
                },
                {
                    name: 5,
                    class: ``
                }
            ];
        },
        /**
         * 获取铭文列表
         */
        _getList() {
            let params = {};
            if (this.type) {
                params.type = this.type;
            }
            if (this.grade) {
                params.grade = this.grade;
            }
            axios
                .get(`/api/inscription/getList`, {
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
         * 选择某个类型
         */
        selectType: function(item, index) {
            this.types.forEach(it => {
                it.class = ``;
            });
            item.class = `type${index + 1}`;
            if (index === 1) {
                this.type = "red";
            } else if (index === 2) {
                this.type = "yellow";
            } else if (index === 3) {
                this.type = "blue";
            } else {
                this.type = "";
            }
            this._getList();
        },
        /**
         * 选择某个等级
         */
        selectGrade(item, index) {
            this.grades.forEach(it => {
                it.class = ``;
            });
            item.class = `grade${index + 1}`;
            this.grade = index || "";
            this._getList();
        },
        /**
         * 选择某个铭文
         * 铭文图片 3403和1203有问题，显示不了
         */
        selectIns: function(id) {
            axios
                .get(`/api/inscription/getDetail`, {
                    params: {
                        inscription_id: id
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
        InsDetail
    }
};
</script>

<style scoped lang="less">
.inscription {
    font-size: 0;
    color: #868686;
    .types {
        margin: 0 0.8rem 0.5rem 0.4rem;
        white-space: nowrap;
        overflow-y: hidden;
        .item {
            margin-left: 0.4rem;
            width: 3rem;
            line-height: 1.4rem;
            font-size: 0.75rem;
            text-align: center;
            border-radius: 0.6rem;
            display: inline-block;
        }
        .interval {
            margin-left: 0.4rem;
        }
        .grade1 {
            background-color: #1c8fea;
            color: white;
        }
        .grade2 {
            background-color: #5dd473;
            color: white;
        }
        .grade3 {
            background-color: #b92fb9;
            color: white;
        }
        .grade4 {
            background-color: #7cfcfc;
            color: white;
        }
        .grade5 {
            background-color: #92f90c;
            color: white;
        }
        .grade6 {
            background-color: #e84a33;
            color: white;
        }
        .grade8 {
            background-color: #e7ca63;
            color: white;
        }
        .type1 {
            background-color: #7cfcfc;
            color: white;
        }
        .type2 {
            background-color: #e84a33;
            color: white;
        }
        .type3 {
            background-color: #e7ca63;
        }
        .type4 {
            background-color: #1c8fea;
        }
    }
    .line {
        border-bottom: 1px solid rgba(120, 120, 120, 0.2);
    }
    .cont {
        position: fixed;
        top: 5.7rem;
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
            padding: 0.5rem 0.7rem;
            display: inline-block;
            border: 2px solid rgba(200, 200, 200, 0.8);
            border-radius: 0.5rem;
            text-align: center;
            .image {
                height: 3rem;
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