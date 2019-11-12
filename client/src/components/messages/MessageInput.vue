<template>
    <div class="input__chat">
        <input type="text" v-model="message">
        <img src="../../assets/img/baseline_insert_emoticon_white_18dp.png" alt="">
        <img src="../../assets/img/baseline_file_copy_white_18dp.png" alt="" @click="sendFile()">
        <button class="btn btn--clear btn--info" @click="sendMessage">Send</button>
    </div>
</template>
<script>
	import { getConnection } from '../../utils/websocket';
	import { MESSAGE, TYPING, FILE } from '../../utils/evenTypes';
	import axios from 'axios';

	export default {
		name: 'Chat',
		components: {},
		data: function() {
			return {
				message: '',
			};
		},
		methods: {
			sendMessage() {
				let roomId = this.$route.params.handle;
				getConnection().emitEvent(MESSAGE, {
					content: this.message,
					roomId,
				});
				this.message = '';
				this.$store.dispatch('fetchMessages', roomId);
			},
			sendTyping() {

			},
		},


	};
</script>
<style scoped lang="scss">
    .input__chat {
        margin: 2rem 1rem 1px;
        padding: 10px 5px;
        border: 1px white solid;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        width: 97%;
        right: 5px;
        left: 2px;

        input {
            width: 80%;
            background-color: transparent;
            border: transparent;
            color: white;
            padding-right: 10px;
            margin-right: 20px;

        }

        img {
            margin-top: 5px;
            width: 30px;
            height: 30px;
            margin-left: 2px;
            margin-right: 2px;

        }

    }
</style>