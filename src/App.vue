<template>
    <div id="wzry">
        <m-header></m-header>
        <router-view class="view"></router-view>
        <alert></alert>
    </div>
</template>

<script>
import MHeader from "components/m_header/m_header";
import Alert from "components/alert/alert";
import axios from "axios";

export default {
    name: "App",
    created() {
        this._visit();
    },
    methods: {
        /**
         * 增加访问
         */
        _visit() {
            axios.get(`/api/common/visit`, {
                params: {
                    agent: encodeURIComponent(navigator.userAgent)
                }
            });
        }
    },
    components: {
        MHeader,
        Alert
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.view {
    position: fixed;
    top: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 20rem;
    margin: 0 auto;
    overflow: scroll;
}
</style>
