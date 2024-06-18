import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(store).use(router).use(VueSweetalert2).mount("#app");

// 테스트 시, 카카오 앱 키 변경 필요
window.Kakao.init('2b5055e323d999380925a00dc0158c2a');