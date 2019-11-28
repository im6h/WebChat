<template>
	<div class="item__content">
		<text-message v-if="message.type === 'text'" v-bind:content="message.content" />
		<file-message v-if="message.type === 'file'" v-bind:file="message.content" />
		<image-message v-if="message.type === 'image'" v-bind:image="message.content" />
	</div>
</template>

<script>
import TextMessage from './TextMessage';
import FileMessage from './FileMessage';
import ImageMessage from './ImageMessage';
export default {
	name: 'Message',
	components: { ImageMessage, FileMessage, TextMessage },
	props: ['message'],
};
</script>

<style scoped>
.item__content {
	position: relative;
	background: #c8cfd2;
	color: #313a3b;
	padding: 0.5rem;
	border-radius: 8px;
	text-align: left;
	margin: 0 1rem;
	align-self: center;
	/*font-family: 'Work Sans';*/
	white-space: pre-line;
}
</style>
