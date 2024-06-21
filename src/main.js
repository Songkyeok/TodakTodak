import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixins from './mixins';

// vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueSweetalert2);
app.mount("#app");
app.mixin(mixins);

// 테스트 시, 카카오 앱 키 변경 필요
window.Kakao.init('2b5055e323d999380925a00dc0158c2a');