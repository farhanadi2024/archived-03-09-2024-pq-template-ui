import { setNumeralLocaleID, ShgComponent } from 'erp-template-vuetify-components';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

setNumeralLocaleID();

app.use(createPinia());
app.use(router);
app.use(ShgComponent);

import './assets/main.scss';
app.mount('#app');
