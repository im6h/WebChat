<template>
    <div class="messagesList" v-if="messages.length !== 0">
        <div class="message" v-for="message in messages" :key="message._id">
            <div class="item__right" v-if="message.sender === getUserData.username">
                <div class="item__content">
                    <span>{{ message.content }}</span>
                </div>
            </div>
            <div class="message__item__left" v-else>
                <div class="item__content">
                    <span>{{ message.content }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="messagesList" v-else>
        <div class="message" v-for="message in getMessage" :key="message._id">
            <div class="item__right" v-if="message.sender === getUserData.username">
                <div class="item__content">
                    <span>{{ message.content }}</span>
                </div>
            </div>
            <div class="message__item__left" v-else>
                <div class="item__content">
                    <span>{{ message.content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import axios from 'axios';
	export default {
		name: 'MessageList',
		props: ['messages'],
		data: function() {
			return {
				getMessage: [],
			};
		},
		computed: {
			...mapGetters(['getUserData', 'getMessagesInRoom']),
		},
		methods: {},
		created() {
			const roomId = this.$route.params.handle;
			let config = {
				method: 'get',
				url: `/v1/message/${roomId}`,
			};
			axios(config)
				.then(res => {
					this.getMessage = res.data;
				})
				.catch(err => err);
		},
	};
</script>

<style scoped lang="scss">

    .messagesList {
        margin: 5px 20px;
        padding: 0;
        display: inline-flex;
        flex-direction: column;
        border-bottom: 1px white solid;
        height: 77vh;
        overflow-x: auto;
        width: 100%;
        overflow-y: auto;
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
        margin: 0 3rem;
        justify-content: flex-end;
        font-family: 'Work Sans';
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
        font-family: 'Work Sans';
        white-space: pre-line;
    }

    .item__content {
        position: relative;
        background: #3c9adf;
        padding: 0.5rem;
        border-radius: 8px;
        text-align: left;
        margin: 0 1rem;
        align-self: center;
        font-family: 'Work Sans';
        white-space: pre-line;
    }

</style>