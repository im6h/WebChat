<template>
	<div class="file-message">
		<a v-bind:href="link" target="_blank">{{ file.originalname }}</a>
		<div>{{ file.size | fileSize }}</div>
	</div>
</template>

<script>
export default {
	name: 'FileMessage',
	props: ['file'],
	data() {
		return {
			dev: window.location.hostname === 'localhost',
		};
	},
	computed: {
		link() {
			const path  = this.file.path;
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
.file-message {
	> * {
		&:first-child {
		}
		&:nth-child(2) {
			font-size: 13px;
		}
	}
}
</style>
