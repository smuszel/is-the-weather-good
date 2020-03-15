import Vue from 'vue';
import App from './App.vue';
import vSelect from 'vue-select';
import vSlider from 'vue-slider-component';
import 'vue-select/dist/vue-select.css';
import 'vue-slider-component/theme/default.css';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);
Vue.component('v-slider', vSlider);

new Vue({
  render: h => h(App)
}).$mount('#app');
