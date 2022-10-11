import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/main.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min'


const app = createApp(App)
app.use(router)

app.mount('#app')


