import { createApp } from 'vue';
import App from './App.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'; // Берем с доки

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faCheckCircle, faExclamationCircle); // Добавляем нужные иконки


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');


import 'bootstrap/dist/css/bootstrap.min.css';
