<template>
	<div class="item__content">
		<text-message
			v-if="message.type === 'text'"
			v-bind:content="message.content"
			v-bind:sender="message.sender"
			v-bind:date="message.date"
		/>
		<file-message
			v-if="message.type === 'file'"
			v-bind:file="message.content"
			v-bind:sender="message.sender"
			v-bind:date="message.date"
		/>
		<image-message
			v-if="message.type === 'image'"
			v-bind:image="message.content"
			v-bind:sender="message.sender"
			v-bind:date="message.date"
		/>
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
