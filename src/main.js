import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'


createApp(App).use(router).use(store).mount('#app')
