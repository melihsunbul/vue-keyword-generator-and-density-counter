import Vue from 'vue';
import App from './App.vue';

import FontAwesomeIcon from './fontAwesome';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
