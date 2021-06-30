import VueRouter from 'vue-router';
import KeywordDensity from './pages/KeywordDensity.vue';
import KeywordGenerator from './pages/KeywordGenerator.vue';
import Vue from 'vue';

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/keyword-density' },
        { path: '/keyword-density', component: KeywordDensity },
        { path: '/keyword-generator', component: KeywordGenerator },
    ],
});

export default router;
