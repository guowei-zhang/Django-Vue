import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'
import store from './store'
import installElementPlus from './plugins/element'
import axios from 'axios';

import * as echarts from 'echarts';


const app = createApp(App)
installElementPlus(app)


//挂载全局对象
app.config.globalProperties.$API = api;
app.config.globalProperties.$Echarts = echarts;
app.config.globalProperties.$Axios = axios;




app.use(store).use(router).mount('#app')