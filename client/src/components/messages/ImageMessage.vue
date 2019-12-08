<template>
	<div class="image-message" :title="nTitle">
		<a v-bind:href="link" target="_blank">
			<img v-bind:src="link" v-bind:alt="image.originalname" />
		</a>
	</div>
</template>

<script>
export default {
	name: 'ImageMessage',
	props: ['image', 'sender', 'date'],
	data() {
		return {
			dev: window.location.hostname === 'localhost',
		};
	},
	computed: {
		link() {
			const path = this.image.path;
			if (path) {
				if (this.dev) {
					return `http://localhost:8080/${path}`;
				}
				return '/' + path;
			}
			return '';
		},
		nTitle() {
			const date = new Date(this.date).toLocaleString();
			return `${this.sender} at ${date}`;
		},
	},
};
</script>

<style scoped lang="scss">
.image-message {
	img {
		max-width: 500px;
	}
}
</style>
