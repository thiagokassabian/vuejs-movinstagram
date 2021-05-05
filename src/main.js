import { createApp } from "vue";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import Timeline from "./components/Timeline";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/timeline", component: Timeline },
		{ path: "/", redirect: "/timeline" },
	],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
