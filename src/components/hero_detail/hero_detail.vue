<template>
    <div class="hero-detail">
        <!-- 上面背景图 -->
        <div class="skin">
            <img class="big-skin" :src="skin.big_img_url" alt>
            <div class="name">{{skin.skin_name}}</div>
        </div>
        <!-- 内容 -->
        <div class="cont" ref="cont">
            <!-- 英雄属性，类型，名称 -->
            <div class="attrs">
                <div class="hero-type">{{attrs.type}}</div>
                <div class="hero-name">{{attrs.name}}</div>
                <div class="small-skins">
                    <img
                        v-for="(item, index) in skins"
                        @click="clickSkin(item)"
                        :key="index"
                        :class="{active:item.click, 'mar-right':index!=0}"
                        :src="item.small_img_url"
                        alt
                    >
                    <div class="clear"></div>
                </div>
                <!-- 生存能力，攻击伤害，技能效果，上手难度 -->
                <ul class="attr">
                    <li class="item">
                        <div class="key">生存能力</div>
                        <div class="value">
                            <div class="live" :style="{width:attrs.live+'%'}"></div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="key">攻击伤害</div>
                        <div class="value">
                            <div class="attack" :style="{width:attrs.attack+'%'}"></div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="key">技能效果</div>
                        <div class="value">
                            <div class="skill" :style="{width:attrs.skill+'%'}"></div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="key">上手难度</div>
                        <div class="value">
                            <div class="difficulty" :style="{width:attrs.difficulty+'%'}"></div>
                        </div>
                    </li>
                    <div class="clear"></div>
                </ul>
            </div>
            <!-- 技能介绍 -->
            <div class="skills">
                <div class="title">技能介绍</div>
                <div class="skill-images">
                    <img
                        v-for="(item, index) in skills"
                        @click="clickSkill(item)"
                        :key="index"
                        :class="{'mar-left':index,'active':item.click}"
                        :src="item.img_url"
                        alt
                    >
                    <div class="clear"></div>
                </div>
                <div class="skill-name">{{skill.name}}</div>
                <div class="desc">{{skill.description}}</div>
                <div class="tips">小提示：{{skill.tips}}</div>
            </div>
            <!-- 技能加点 -->
            <div class="skill-summoner">
                <div class="title">技能加点</div>
                <!-- 主升，副升技能 -->
                <div class="skill">
                    <div
                        class="item"
                        v-for="(item, index) in recom_skills"
                        :key="index"
                        :class="{'mar-left':index}"
                    >
                        <div class="type">{{item.type}}</div>
                        <img :src="item.img_url" alt>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <!-- 召唤师技能 -->
                <div class="summoner">
                    <div class="type">召唤师技能</div>
                    <div
                        class="item"
                        v-for="(item, index) in recom_summoners"
                        :key="index"
                        :class="{'mar-left':index}"
                    >
                        <img :src="item.img_url" alt>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <!-- 推荐装备 -->
            <div class="equips">
                <div class="title">出装推荐</div>
                <div class="type">顺风出装</div>
                <div class="items">
                    <div class="equip" v-for="(item, index) in recom_equips.equips1" :key="index">
                        <img :src="item.img_url" alt>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <div class="tips">小提示：{{recom_equips.tips1}}</div>
                <div class="type">逆风出装</div>
                <div class="items">
                    <div class="equip" v-for="(item, index) in recom_equips.equips2" :key="index">
                        <img :src="item.img_url" alt>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <div class="tips">小提示：{{recom_equips.tips2}}</div>
            </div>
            <!-- 铭文搭配 -->
            <div class="inscription">
                <div class="title">铭文搭配</div>
                <div class="item" v-for="(item, index) in inscriptions.inscriptions" :key="index">
                    <img :src="item.img_url" alt>
                    <div class="name">{{item.name}}</div>
                </div>
                <div class="clear"></div>
                <div class="tips">小提示：{{inscriptions.tips}}</div>
            </div>
            <!-- 英雄使用技巧 -->
            <div class="artifices">
                <div class="title">使用技巧</div>
                <div class="desc" v-html="artifices.use_skill"></div>
            </div>
            <!-- 英雄战斗技巧 -->
            <div class="artifices">
                <div class="title">战斗技巧</div>
                <div class="desc" v-html="artifices.fight_skill"></div>
            </div>
            <!-- 英雄团战思路 -->
            <div class="artifices">
                <div class="title">团战思路</div>
                <div class="desc" v-html="artifices.battle_skill"></div>
            </div>
            <div class="links" v-if="links.length">
                <div class="title">英雄关系</div>
                <div class="type">最佳搭档</div>
                <router-link
                    tag="div"
                    class="item"
                    :to="{name:'hero_detail',params:{hero_id:links[0].hero_id1}}"
                >
                    <img :src="links[0].img_url" alt="图片">
                    <div class="desc">{{links[0].tips}}</div>
                    <div class="clear"></div>
                </router-link>
                <router-link
                    tag="div"
                    class="item"
                    :to="{name:'hero_detail',params:{hero_id:links[1].hero_id1}}"
                >
                    <img :src="links[1].img_url" alt="图片">
                    <div class="desc">{{links[1].tips}}</div>
                    <div class="clear"></div>
                </router-link>
                <div class="type">克制英雄</div>
                <router-link
                    tag="div"
                    class="item"
                    :to="{name:'hero_detail',params:{hero_id:links[2].hero_id1}}"
                >
                    <img :src="links[2].img_url" alt="图片">
                    <div class="desc">{{links[2].tips}}</div>
                    <div class="clear"></div>
                </router-link>
                <router-link
                    tag="div"
                    class="item"
                    :to="{name:'hero_detail',params:{hero_id:links[3].hero_id1}}"
                >
                    <img :src="links[3].img_url" alt="图片">
                    <div class="desc">{{links[3].tips}}</div>
                    <div class="clear"></div>
                </router-link>
                <div class="type">被谁克制</div>
                <router-link
                    tag="div"
                    class="item"
                    :to="{name:'hero_detail',params:{hero_id:links[4].hero_id1}}"
                >
                    <img :src="links[4].img_url" alt="图片">
                    <div class="desc">{{links[4].tips}}</div>
                    <div class="clear"></div>
                </router-link>
                <router-link
                    tag="div"
                    class="item"
                    :to="{name:'hero_detail',params:{hero_id:links[5].hero_id1}}"
                >
                    <img :src="links[5].img_url" alt="图片">
                    <div class="desc">{{links[5].tips}}</div>
                    <div class="clear"></div>
                </router-link>
            </div>
            <!-- 英雄故事，历史上的他 -->
            <div class="story-history">
                <div class="story" @click="story">英雄故事</div>
                <div class="history" @click="history">历史上的ta</div>
                <div class="clear"></div>
            </div>
        </div>
        <story ref="story"></story>
    </div>
</template>
<script>
import axios from "axios";
import MHeader from "components/m_header/m_header";
import Story from "components/story/story";
import Msg from "common/js/message.js";

export default {
    name: "hero_detail",
    data() {
        return {
            skin: {}, // 当前皮肤
            skins: [],
            attrs: {},
            skill: {}, //要显示的skill
            skills: [],
            recom_skills: [],
            recom_summoners: [],
            recom_equips: {},
            inscriptions: {},
            artifices: {},
            links: []
        };
    },
    watch: {
        $route(to, from) {
            if (to.path !== from.path) {
                // 点击同级路由，刷新页面
                location.reload();
            }
        }
    },
    mounted() {
        Msg.$emit("header", {
            show_back: true,
            title: "英雄详情"
        });
        this._getAttrs();
        this._getSkills();
        this._getSkins();
        this._getRecomSkills();
        this._getRecomSummoners();
        this._getRecomEquips();
        this._getRecomInscriptions();
        this._getArtifices();
        this._getLinks();
        this._getStoryHistory();
    },
    methods: {
        /**
         * 点击皮肤
         */
        clickSkin(skin) {
            this.skins.forEach(item => {
                item.click = false;
            });
            skin.click = true;
            this.skin = skin;
        },
        /**
         * 点击技能
         */
        clickSkill(skill) {
            this.skills.forEach(item => {
                item.click = false;
            });
            skill.click = true;
            this.skill = skill;
        },
        /**
         * 点击故事
         */
        story() {
            axios
                .get("/api/hero/getStory", {
                    params: this.$route.params
                })
                .then(res => {
                    let story = JSON.parse(localStorage.getItem("stories"))
                        .story;
                    this.$refs.story.show({ title: "英雄故事", desc: story });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 点击历史
         */
        history() {
            axios
                .get("/api/hero/getHistory", {
                    params: this.$route.params
                })
                .then(res => {
                    let his = JSON.parse(localStorage.getItem("stories"))
                        .history;
                    this.$refs.story.show({ title: "历史上的ta", desc: his });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取英雄属性
         */
        _getAttrs() {
            let types = ["战士", "法师", "坦克", "刺客", "射手", "辅助"];
            axios
                .get("/api/hero/getAttrs", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        let tmp = res.data.result;
                        tmp.type = types[tmp.hero_type - 1];
                        if (tmp.hero_type2) {
                            tmp.type += "/" + types[tmp.hero_type2 - 1];
                        }
                        this.attrs = tmp;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取技能
         */
        _getSkills() {
            axios
                .get("/api/hero/getSkills", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.skills = res.data.result.rows;
                        this.skills.forEach((item, index) => {
                            item.click = !index;
                        });
                        this.skill = this.skills[0];
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取所有皮肤
         */
        _getSkins() {
            axios
                .get("/api/hero/getSkins", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.skins = res.data.result.rows;
                        // 默认激活第一个皮肤样式
                        this.skins.forEach((item, index) => {
                            item.click = !index;
                        });
                        this.skin = this.skins[0];
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取推荐英雄技能
         */
        _getRecomSkills() {
            axios
                .get("/api/hero/getRecomSkills", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.recom_skills = res.data.result.rows;
                        this.recom_skills[0].type = "主升";
                        this.recom_skills[1].type = "副升";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取推荐召唤师技能
         */
        _getRecomSummoners() {
            axios
                .get("/api/hero/getRecomSummoners", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.recom_summoners = res.data.result.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取推荐装备
         */
        _getRecomEquips() {
            axios
                .get("/api/hero/getRecomEquips", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.recom_equips = res.data.result;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取推荐铭文
         */
        _getRecomInscriptions() {
            axios
                .get("/api/hero/getRecomInscriptions", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.inscriptions = res.data.result;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取英雄使用技巧、战斗技巧、团战思路
         */
        _getArtifices() {
            axios
                .get("/api/hero/getartifice", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        this.artifices = res.data.result;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取英雄关系
         */
        _getLinks() {
            axios
                .get("/api/hero/getlinks", {
                    params: this.$route.params
                })
                .then(res => {
                    if (res.data.success) {
                        let rows = res.data.result.rows;
                        rows.forEach(it => {
                            it.img_url = `http://game.gtimg.cn/images/yxzj/img201606/heroimg/${
                                it.hero_id1
                            }/${it.hero_id1}.jpg`;
                        });
                        this.links = rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取英雄故事和历史
         */
        _getStoryHistory() {
            axios
                .get(`/api/hero/get_stories`, {
                    params: this.$route.params
                })
                .then(res => {
                    localStorage.setItem(
                        "stories",
                        JSON.stringify(res.data.result)
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    components: {
        MHeader,
        Story
    }
};
</script>
<style scoped lang="less">
@baseImgSize: 2.5rem;
// 皮肤
.skin {
    position: fixed;
    top: 2rem;
    font-size: 0;
    // 大图
    .big-skin {
        width: 20rem;
        height: 10rem;
    }
    // 皮肤名称
    .name {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 0.875rem;
        color: #e7ca63;
        text-align: center;
    }
}

// 内容
.cont {
    position: fixed;
    top: 2rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    margin: 0 auto;
    width: 20rem;
    // 标题
    .title {
        line-height: 1.6rem;
        height: 1.6rem;
        font-size: 0.83rem;
        font-weight: bold;
    }
    // 英雄属性
    .attrs {
        padding: 7rem 0.5rem 0;
        background: -webkit-linear-gradient(rgba(255, 255, 255, 0.2), #fff);
        background: -o-linear-gradient(rgba(255, 255, 255, 0.2), #fff);
        background: linear-gradient(rgba(255, 255, 255, 0.2), #fff);
        background-size: 20rem 15.2rem;
        width: 19rem;
        // 类型
        .hero-type {
            font-size: 0.875rem;
            color: #f3c258;
            line-height: 1rem;
        }
        // 英雄名称
        .hero-name {
            font-size: 1rem;
            font-weight: bold;
            line-height: 2rem;
        }
        // 小皮肤
        .small-skins {
            position: absolute;
            top: 7.5rem;
            right: 0.5rem;
            opacity: 0.8;
            img {
                width: 2rem;
                height: 2rem;
                border: 2px solid white;
                border-radius: 0 6px;
                box-sizing: border-box;
                float: right;
            }
            .active {
                border: 2px solid #f3c258 !important;
            }
        }
        // live, attack, skill, difficulty
        .attr {
            margin: 0.4rem auto 0;
            color: #868686;
            font-size: 0.75rem;
            line-height: 1.2rem;
            // 名称
            .key {
                width: 4rem;
                float: left;
            }
            // 属性值
            .value {
                margin-top: 0.4rem;
                width: 15rem;
                background-color: #eee;
                border-radius: 0.2rem;
                float: left;
                //
                .live,
                .attack,
                .skill,
                .difficulty {
                    height: 0.4rem;
                    border-radius: 0.2rem;
                }
                .live {
                    background-color: #1c8fea;
                }
                .attack {
                    background-color: #e7ca63;
                }
                .skill {
                    background-color: #5dd473;
                }
                .difficulty {
                    background-color: #e84a33;
                }
            }
        }
    }
    // 技能
    .skills {
        padding: 0 0.5rem;
        background-color: white;
        // 技能图片
        .skill-images {
            margin-bottom: 0.5rem;
            img {
                float: left;
                padding: 0.1rem;
                width: @baseImgSize;
                height: @baseImgSize;
                border: 1px solid #eee;
                border-radius: 50%;
            }
            .active {
                border: 1px solid #f3c258;
            }
        }
        // 技能名称，描述
        .skill-name,
        .desc {
            font-size: 0.75rem;
            color: black;
        }
        .desc {
            line-height: 1rem;
        }
    }
    // 技能加点
    .skill-summoner {
        padding: 0 0.5rem;
        background-color: white;
        // 技能
        .skill {
            float: left;
        }
        // 召唤师技能
        .summoner {
            float: right;
        }
        .skill,
        .summoner {
            text-align: center;
            // 类型
            .type {
                font-size: 0.75rem;
                line-height: 1.4rem;
            }
            .item {
                width: 3rem;
                color: black;
                text-align: center;
                float: left;
                img {
                    margin: 0.2rem auto;
                    width: @baseImgSize;
                    height: @baseImgSize;
                    border-radius: 50%;
                }
                // 名称
                .name {
                    font-size: 0.625rem;
                    line-height: 1rem;
                }
            }
        }
    }
    // 出装推荐
    .equips {
        padding: 0 0.5rem;
        background-color: white;
        // 装备类型
        .type {
            font-size: 0.75rem;
            line-height: 1.4rem;
        }
        // 装备列表
        .items {
            overflow-y: hidden;
            white-space: nowrap;
            .equip {
                width: 3.15rem;
                text-align: center;
                display: inline-block;
            }
            img {
                margin: 0.2rem auto;
                width: @baseImgSize;
                height: @baseImgSize;
                border-radius: 50%;
                display: inline-block;
            }
            .name {
                line-height: 1rem;
                font-size: 0.625rem;
            }
        }
    }
    // 铭文搭配
    .inscription {
        padding: 0 0.5rem;
        background-color: white;
        .item {
            width: 6rem;
            text-align: center;
            font-size: 0;
            float: left;
            img {
                width: auto;
                height: @baseImgSize;
                margin: 0.2rem auto;
                display: inline-block;
            }
            .name {
                line-height: 1rem;
                font-size: 0.625rem;
            }
        }
    }
    // 使用技巧，战斗技巧，团战思路
    .artifices {
        padding: 0 0.5rem;
        background-color: white;
        line-height: 1rem;
        .desc {
            font-size: 0.65rem;
            color: #868686;
        }
    }
    // 英雄关系
    .links {
        padding: 0 0.5rem;
        background-color: white;
        line-height: 1.2rem;
        .type {
            font-size: 0.75rem;
            line-height: 1.4rem;
        }
        .item {
            margin-bottom: 0.3rem;
            font-size: 0.65rem;
            color: #868686;
            img {
                margin: 0.2rem 0;
                width: 3rem;
                height: 3rem;
                float: left;
            }
            .desc {
                margin-left: 3.5rem;
            }
        }
    }
    // 英雄故事，历史上的他
    .story-history {
        padding: 0.5rem 0.5rem 1rem;
        line-height: 1.6rem;
        text-align: center;
        font-size: 0.875rem;
        .story {
            margin-left: 1.5rem;
            width: 6.5rem;
            float: left;
            border: 2px solid #f3c258;
            box-sizing: border-box;
            border-radius: 0.5rem;
        }
        .history {
            margin-right: 1.5rem;
            width: 6.5rem;
            float: right;
            border: 2px solid #f3c258;
            box-sizing: border-box;
            border-radius: 0.5rem;
        }
    }
}

// 提示
.tips {
    margin-top: 0.5rem;
    font-size: 0.65rem;
    color: #868686;
    line-height: 1rem;
}

// 左边距
.mar-left {
    margin-left: 1rem;
}

// 右边距
.mar-right {
    margin-right: 0.5rem;
}

// 清除浮动
.clear {
    clear: both;
}
</style>
