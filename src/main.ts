import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import {createPinia} from 'pinia'

import '@/assets/main.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min'


const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')


