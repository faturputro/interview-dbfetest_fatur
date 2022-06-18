import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'
import ElementPlus from 'element-plus';
import './assets/scss/main.scss'
import 'element-plus/dist/index.css';

import App from './App.vue'
import routes from './routes/main';
import globalComponents from './plugins/globalComponents';

const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(ElementPlus, { size: 'large' });
app.use(routes);
app.use(globalComponents);
app.use(createPinia()).mount('#app');