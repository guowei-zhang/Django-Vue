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

//传表单数据设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 


app.use(store).use(router).mount('#app')