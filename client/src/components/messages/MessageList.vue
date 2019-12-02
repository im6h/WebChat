<template>
	<div class="messagesList" id="list" ref="list">
		<div class="message" v-for="message in getMessagesInRoom" :key="message._id">
			<div class="item__right" v-if="message.sender === getUserData.username">
				<message v-bind:message="message" />
			</div>
			<div class="message__item__left" v-else>
				<message v-bind:message="message" />
			</div>
		</div>
		<div class="message typing-message" v-if="shouldBeShowTyping">
			<small class="text-color">{{ typingText }}</small>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from './Message';
export default {
	name: 'MessageList',
	components: { Message },
	data: function() {
		return {};
	},
	computed: {
		...mapGetters(['getUserData', 'getMessagesInRoom', 'getTypings']),
		shouldBeShowTyping() {
			return this.getTypings.length !== 0;
		},
		typingText() {
			const typings = this.getTypings;
			if (typings.length !== 0) {
				if (typings.includes(this.getUserData.username)) {
					if (typings.length === 1) {
						return 'Bạn đang gõ ...';
					}
					return `Bạn và ${typings.length - 1} người đang gõ ...`;
				} else {
					return `${typings.length - 1} người đang gõ ...`;
				}
			}
			return 'Someone is typing...';
		},
	},
	methods: {},
	beforeMount() {},
	updated() {
		let container = this.$refs.list;
		container.scrollTop = container.scrollHeight;
	},
};
</script>

<style scoped lang="scss">
.messagesList {
	/*margin: 5px 20px;*/
	padding: 0;
	display: inline-flex;
	flex-direction: column;
	height: 74vh;
	overflow-x: auto;
	width: 100%;
}

.message {
	width: 100%;
	display: flex;
}

.item__right {
	width: 100%;
	display: flex;
	transition: opacity 0.5s ease, transform 0.5s ease;
	position: relative;
	background: transparent;
	padding: 0.5rem;
	border-radius: 8px;
	text-align: left;
	justify-content: flex-end;
	/*font-family: 'Work Sans';*/
	white-space: pre-line;
}

.message__item__left {
	width: 100%;
	display: flex;
	transition: opacity 0.5s ease, transform 0.5s ease;
	position: relative;
	background: transparent;
	padding: 0.5rem;
	border-radius: 8px;
	text-align: left;
	margin: 0 1rem;
	align-self: center;
	justify-content: flex-start;
	/*font-family: 'Work Sans';*/
	white-space: pre-line;
}

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
.typing-message {
	padding-left: 30px;
}
</style>
