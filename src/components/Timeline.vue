<template>
	<div v-if="likesLength && commentsLength">
		<div class="d-flex align-items-center mb-3">
			<img
				:src="imgPath(timeline)"
				class="avatar rounded-circle img-thumbnail mr-3"
				alt=""
			/>
			<div>
				<dl class="list-unstyled mb-0">
					<dt>{{ timeline }}</dt>
					<dd>
						<strong>{{ posts.length }}</strong> posts
					</dd>
					<dd>
						<strong>{{ commentsLength }}</strong> comentários
					</dd>
					<dd>
						<strong>{{ likesLength }}</strong> likes
					</dd>
				</dl>
			</div>
		</div>

		<select v-model="selectedUser" class="form-control select-user">
			<option disabled value="">Escolha um herói</option>
			<option v-for="(user, i) in users" :key="i" :value="user">{{
				user
			}}</option>
		</select>

		<post
			v-for="(post, index) in posts"
			:key="index"
			:post="post"
			:selectedUser="selectedUser"
			@incrementLike="likesLength++"
			@decrementLike="likesLength--"
			@incrementComment="commentsLength++"
		/>
	</div>
</template>
<script>
import { onMounted, ref } from "vue";
import { getPosts, getAllLikes, getAllComments } from "../timeline-service.ts";
import Post from "./Post";
import { imgAvatarPath } from "../utils";

export default {
	name: "Timeline",
	components: {
		Post,
	},
	setup() {
		const users = [
			"antman",
			"aquaman",
			"batman",
			"blackWidow",
			"captainAmerica",
			"captainMarvel",
			"greenLantern",
			"ironMan",
			"spiderMan",
			"superman",
			"thor",
			"wonderWoman",
		];
		const timeline = "superman";

		const posts = ref([]);
		const selectedUser = ref("batman");
		const likesLength = ref(0);
		const commentsLength = ref(0);

		const imgPath = user => imgAvatarPath(user);

		onMounted(() => {
			getPosts().then(response => {
				posts.value = response;
			});
			getAllLikes().then(response => {
				likesLength.value = response.length;
			});
			getAllComments().then(response => {
				commentsLength.value = response.length;
			});
		});

		return {
			posts,
			selectedUser,
			users,
			imgPath,
			timeline,
			likesLength,
			commentsLength,
		};
	},
};
</script>
<style scoped>
.avatar {
	width: 120px;
}
.select-user {
	position: fixed;
	top: 9px;
	right: 15px;
	z-index: 1031;
	width: auto;
}

dl {
	position: relative;
	top: -2px;
}
dt {
	font-size: 1.5rem;
}
dd {
	margin-bottom: 0;
	font-size: 0.8rem;
}
</style>
