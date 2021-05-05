<template>
	<div class="card shadow mb-4">
		<div class="card-body">
			<div class="mb-4">
				<div class="d-flex align-items-center mb-3">
					<img
						:src="imgPath(user)"
						class="avatar avatar-user rounded-circle mr-2"
					/>
					<strong>{{ user }}</strong>
				</div>
				<p class="font-weight-light h3 mb-0">{{ title }}</p>
			</div>
			<div class="row">
				<div class="col-md-5">
					<img
						:src="picture"
						class="poster img-fluid w-100 rounded"
						loading="lazy"
					/>
				</div>
				<div class="col-md-7">
					<div>Comments | {{ commentsLength }}</div>
					<div class="comments mb-4">
						<div
							v-for="(comment, index) in comments"
							:key="index"
							class="d-flex align-items-center mb-2"
						>
							<div
								class="avatar rounded-circle mr-2"
								:style="{
									'background-image':
										'url(' + imgPath(comment.user) + ')',
								}"
							></div>
							<span class="d-inline-block mr-2"
								><strong>{{ comment.user }}</strong></span
							>
							<span>{{ comment.comment }}</span>
						</div>
					</div>

					<div class="send-comment">
						<form @submit="checkForm">
							<input
								type="text"
								v-model.trim="commentText"
								class="form-control"
								placeholder="Digite seu comentário"
							/>
							<button
								type="submit"
								class="btn btn-outline-dark btn-sm"
							>
								enviar
							</button>
						</form>
					</div>

					<br /><br />

					<button @click="toggleLike" :class="{ active: isLiked }">
						like
					</button>

					<dl>
						<dt>Likes | {{ likesLength }}</dt>
						<dd v-for="(like, index) in likes" :key="index">
							{{ like.user }}
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { onMounted, watch, ref, toRefs } from "vue";
import {
	getComments,
	getLikes,
	deleteLike,
	addLike,
	addComment,
} from "../timeline-service.ts";
import { imgAvatarPath } from "../utils";
import { v4 as uuidv4 } from "uuid";

export default {
	name: "Post",
	components: {},
	props: {
		selectedUser: String,
	},
	setup(props, { attrs, emit }) {
		const { id, user, title, picture } = toRefs(attrs.post);
		const { selectedUser } = toRefs(props);
		const comments = ref(null);
		const commentsLength = ref(null);
		const likes = ref(null);
		const likesLength = ref(null);
		const isLiked = ref(null);
		const commentText = ref(null);

		onMounted(() => {
			getComments(id.value).then(response => {
				comments.value = response;
				commentsLength.value = comments.value.length;
			});

			getLikes(id.value).then(response => {
				likes.value = response;
				likesLength.value = likes.value.length;
				verifyIsLiked();
			});
		});

		watch(selectedUser, () => verifyIsLiked());

		const imgPath = user => imgAvatarPath(user);

		const toggleLike = () => {
			if (isLiked.value) {
				const like = findLike();
				deleteLike(like.id).then(() => {
					const index = likes.value.indexOf(like);
					if (index > -1) likes.value.splice(index, 1);
					isLiked.value = false;
					likesLength.value--;
					emit("decrementLike");
				});
			} else {
				const like = {
					id: uuidv4(),
					postId: id.value,
					user: selectedUser.value,
				};
				addLike(like).then(() => {
					isLiked.value = true;
					likes.value.push(like);
					likesLength.value++;
					emit("incrementLike");
				});
			}
		};

		const verifyIsLiked = () => {
			findLike() ? (isLiked.value = true) : (isLiked.value = false);
		};

		const findLike = () => {
			const like = likes.value.find(
				element => element.user === selectedUser.value
			);
			return like;
		};

		const checkForm = e => {
			if (commentText.value) {
				const comment = {
					id: uuidv4(),
					comment: commentText.value,
					user: selectedUser.value,
					postId: id.value,
				};
				addComment(comment).then(() => {
					comments.value.push(comment);
					commentsLength.value++;
					emit("incrementComment");
				});
			}
			e.preventDefault();
		};

		return {
			id,
			user,
			title,
			picture,
			comments,
			likes,
			isLiked,
			toggleLike,
			commentsLength,
			likesLength,
			verifyIsLiked,
			commentText,
			checkForm,
			imgPath,
		};
	},
};
</script>
<style scoped>
.post {
	border: 1px solid #000;
	padding: 15px;
	margin-bottom: 10px;
}
.poster {
	width: 100px;
}
button.active {
	background: cyan;
}

.avatar-user {
	max-width: 50px;
}

div.avatar {
	width: 35px;
	height: 35px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.send-comment {
	position: relative;
}
.send-comment input {
	border: none;
	border-radius: 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.125);
	padding-right: 35px;
}

.send-comment button {
	position: absolute;
	top: 0;
	right: 0;
	/* color: #212529; */
}
</style>
