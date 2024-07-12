import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'

const app = createApp(App)
Object.values(components).forEach(component => {
    app.component(component.name, component);
});

app.mount('#app')
