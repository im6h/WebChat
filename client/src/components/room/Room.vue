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
import { MESSAGE, ONLINE } from '../../utils/evenTypes';
import {EventBus} from '../../eventBus.js';

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
				});
		},
	},
	created: function() {
		this.fetchMessage();
		this.fetchInfoRoom();
	},
	beforeUpdate() {
		getConnection()
			.onEvent(MESSAGE, data => {
				this.$store.dispatch('pushMessageInRoom', data);
				EventBus.$emit('reloadListRoom');
			})
			.onEvent(ONLINE, data => {});
	},
	beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.page {
	overflow: hidden;
}

.chat {
	display: flex;
	flex-direction: row;

	.chat__content {
		width: 70%;
	}

	.info__room {
		width: 30%;
		margin-left: 2px;
		border-left: 1px solid white;
	}
}
</style>