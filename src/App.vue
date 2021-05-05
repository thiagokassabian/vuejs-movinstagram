<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
		<a class="navbar-brand" href="#">Movinstagram</a>
	</nav>
	<div class="container py-3">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
	components: {},
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
body {
	padding-top: 56px;
	background: #f5f5f5;
}
</style>
