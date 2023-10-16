import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia()

loadFonts()

createApp(App)
.use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
