<template>
	<div class="file-message" :title="nTitle">
		<a v-bind:href="link" target="_blank" style="color:#616d6d;">{{ file.originalname }}</a>
		<div>{{ file.size | fileSize }}</div>
	</div>
</template>

<script>
export default {
	name: 'FileMessage',
	props: ['file', 'sender', 'date'],
	data() {
		return {
			dev: window.location.hostname === 'localhost',
		};
	},
	computed: {
		link() {
			const path = this.file.path;
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
