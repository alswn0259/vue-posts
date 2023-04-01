import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';
// import globalComponents from './plugins/global-components';
// import focus from './directives/focus';
import globalDirective from './plugins/global-directive';
import dayjs from './plugins/dayjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
app.use(dayjs);
app.use(globalDirective);
// app.use(globalComponents);
// app.directive('focus', focus);
app.use(funcPlugins);
app.use(objPlugins, { name: '짐코딩' });
app.use(person, { name: '홍길동' });
app.use(router)
app.mount('#app');
