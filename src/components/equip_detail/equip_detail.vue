<template>
    <div class="equip-detail" v-show="showPanel">
        <div class="cont">
            <img :src="equip.img_url">
            <div class="name" v-html="equip.name"></div>
            <div class="des" v-html="equip.des1"></div>
            <div class="des" v-if="equip.des2" v-html="equip.des2"></div>
            <div class="type" v-html="equip.type"></div>
            <div class="price" v-html="'售价：'+equip.sale_price"></div>
            <div class="price" v-html="'总价：'+equip.total_price"></div>
        </div>
        <div class="btn" @click="hide"></div>
    </div>
</template>
<script>
export default {
    name: "equip_detail",
    data() {
        return {
            showPanel: false,
            equip: {}
        };
    },
    watch: {
        equip(newVal) {
            let type = newVal.type;
            if (type) {
                let arr = ["攻击", "法术", "防御", "移动", "打野", "", "辅助"];
                newVal.type = arr[type - 1];
            }
        }
    },
    methods: {
        show: function(data) {
            this.showPanel = true;
            this.equip = data;
        },
        hide: function() {
            this.showPanel = false;
        }
    }
};
</script>
<style scoped lang="less">
.equip-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(200, 200, 200, 0.4);
    z-index: 50;
    font-size: 0.75rem;
    .cont {
        margin: 6rem auto 0;
        padding-bottom: 1rem;
        width: 16rem;
        border-radius: 1rem;
        background-color: rgba(255, 255, 255, 0.95);
        color: #868686;
        text-align: center;
        line-height: 1.2rem;
        img {
            margin-top: 2rem;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
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