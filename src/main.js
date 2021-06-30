import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueClipboard from 'vue-clipboard2';

import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'tailwindcss/tailwind.css';
import FontAwesomeIcon from './fontAwesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('the-header', TheHeader);
Vue.component('the-nav', TheNav);

Vue.use(ElementUI);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
