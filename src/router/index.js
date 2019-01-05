import Vue from 'vue';
import Router from 'vue-router';

// 注册路由
Vue.use(Router);

const Home = resolve => require(['components/home/home'], resolve);
const Heros = resolve => require(['components/heros/heros'], resolve);
const HeroDetail = resolve => require(['components/hero_detail/hero_detail'], resolve);
const Inscription = resolve => require(['components/inscription/inscription'], resolve);
const Equip = resolve => require(['components/equip/equip'], resolve);
const Summoner = resolve => require(['components/summoner/summoner'], resolve);
const About = resolve => require(['components/about/about'], resolve);


export default new Router({
    routes: [{
        // 默认打开首页
        path: '/',
        redirect: 'home'
    }, {
        path: '/home',
        name: 'home',
        component: Home
    }, {
        path: '/heros',
        name: 'heros',
        component: Heros
    }, {
        path: '/hero_detail/:hero_id',
        name: 'hero_detail',
        component: HeroDetail
    }, {
        path: '/equip',
        name: 'equip',
        component: Equip
    }, {
        path: '/inscription',
        name: 'inscription',
        component: Inscription
    }, {
        path: '/summoner',
        name: 'summoner',
        component: Summoner
    }, {
        path: '/about',
        name: 'about',
        component: About
    }]
});