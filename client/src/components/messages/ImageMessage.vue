<template>
	<div class="image-message">
		<a v-bind:href="link" target="_blank">
			<img v-bind:src="link" v-bind:alt="image.originalname" />
		</a>
	</div>
</template>

<script>
export default {
	name: 'ImageMessage',
	props: ['image'],
	data() {
		return {
			dev: window.location.hostname === 'localhost',
		};
	},
	computed: {
		link() {
			const path = this.image.path;
			if (path) {
				console.log(this);
				if (this.dev) {
					return `http://localhost:8080/${path}`;
				}
				return path;
			}
			return '';
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
