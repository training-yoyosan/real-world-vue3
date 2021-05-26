import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
import dateFilter from '@/filters/date'

const app = createApp(App)
app.use(store).use(router).mount('#app')

app.config.globalProperties.$filters = {
  dateFilter,
}
