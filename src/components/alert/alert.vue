<template>
    <div class="alert" v-show="showAlert">
        <div class="msg" :style="{marginTop:marTop}" v-html="msg"></div>
    </div>
</template>

<script>
import Msg from "common/js/message.js";

export default {
    name: "alert",
    data() {
        return {
            showAlert: false,
            marTop: "",
            msg: "我是msg"
        };
    },
    mounted() {
        Msg.$on("alert", data => {
            this._show(data);
        });
        this._setPosition();
    },
    methods: {
        /**
         * 显示alert
         */
        _show: function() {
            this.showAlert = true;
            this.msg = data;
            this.clearInterval(this.timer);
            this.timer = setTimeout(() => {
                this._hide();
            }, 2000);
        },
        /**
         * 隐藏alert
         */
        _hide: function() {
            this.showAlert = false;
        },
        /**
         * 设置alert位置
         * @private
         */
        _setPosition: function() {
            // 1.8为alert高度
            const height =
                ((window.innerHeight * 20) / window.innerWidth - 1.8) / 2;
            this.marTop = height.toFixed(2) + "rem";
        }
    }
};
</script>

<style scoped lang="less">
.alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    .msg {
        padding: 0.3rem 1rem;
        font-size: 0.75rem;
        color: black;
        line-height: 1.2rem;
        border-radius: 0.8rem;
        background-color: rgba(200, 200, 200);
        display: inline-block;
    }
}
</style>