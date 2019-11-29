<template>
	<div class="page page--room">
		<section class="section section--room section--mmt p-0">
			<div class="section__content u-max-height p-0">
				<div class="chat">
					<div class="chat__content">
						<div class="chat__header" v-if="roomInfo">
							<span class="section__title__part"># {{ roomInfo.name }}</span>
							<div class="chat__actions"></div>
						</div>
						<MessageList />
						<MessageInput />
					</div>
					<div class="info__room">
						<RoomInfo :room-info="roomInfo" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import MessageInput from '../messages/MessageInput';
import MessageList from '../messages/MessageList';
import RoomInfo from './RoomInfo';
import { mapGetters } from 'vuex';
import { getConnection } from '../../utils/websocket';
import axios from 'axios';
import { MESSAGE, FILE } from '../../utils/evenTypes';
import { EventBus } from '../../eventBus.js';

export default {
	name: 'Room',
	components: {
		RoomInfo,
		MessageInput,
		MessageList,
	},
	data: function() {
		return {
			roomInfo: {},
			keyRoomInfo: 0,
		};
	},
	computed: {
		...mapGetters({
			userData: 'getUserData',
		}),
	},
	methods: {
		fetchMessage() {
			let roomId = this.$route.params.handle;
			this.$store.dispatch('fetchMessages', roomId);
		},
		fetchInfoRoom() {
			let roomId = this.$route.params.handle;
			axios
				.get(`/v1/room/info/${roomId}`)
				.then(res => {
					this.roomInfo = res.data;
					this.$store.dispatch('saveCurrentRoom', res.data);
				})
				.catch(err => {
					console.log(err);
					this.$router.push('/');
				});
		},
	},
	created: function() {
		this.fetchMessage();
		this.fetchInfoRoom();
	},
	beforeUpdate() {
		getConnection().onEvent(MESSAGE, data => {
			if (data.content.type === 'file') {
				this.fetchMessage();
			} else {
				let lastMsg = Object.assign({ type: 'text' }, data);
				this.$store.dispatch('pushMessageInRoom', lastMsg);
				EventBus.$emit('reloadListRoom');
			}
		});
	},
};
</script>

<style scoped lang="scss">
.page {
	overflow: hidden;
}
.u-max-height {
	height: 100%;
	max-height: 100%;
}
.chat {
	display: flex;
	flex-direction: row;
	height: 100%;
	.chat__content {
		width: 70%;
		position: relative;
	}

	.info__room {
		width: 30%;
		/*margin-left: 2px;*/
		border-left: 1px solid #c8cfd2;
		color: #667576;
	}
}
</style>
