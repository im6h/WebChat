<template>
    <span :title="nTitle">{{ content }}</span>
</template>

<script>
	export default {
		name: 'TextMessage',
		props: ['content', 'sender', 'date'],
		computed: {
			nTitle() {
				const date = new Date(this.date).toLocaleString();
				return `${this.sender} at ${date}`;
			},
		},
	};
</script>

<style scoped></style>
