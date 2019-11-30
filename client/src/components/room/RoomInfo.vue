<template>
	<div class="room__info">
		<div class="room__info__header">
			<h3>{{ roomInfo.name }}</h3>
		</div>
		<div class="room__info__body" v-if="roomInfo.type === 'group'">
			<div class="list-user">
				<h2>Members</h2>
				<div class="modal--people">
					<a href="#" @click="addUser()">
						<div class="btn btn--gray">Invite member</div>
					</a>
				</div>
				<div class="user" v-for="user in roomInfo.members">
					<span class="user-info">
						<div v-bind:class="getStatusClass(user.username)"></div>
						<div>#{{ user.fullName }} ({{ user.username }})</div>
						<a href="#" @click="removeUser(user._id)">Remove</a>
					</span>
				</div>
			</div>
			<div>
				<RoomModal
					:memberInRoom="roomInfo.members"
					v-if="showModal"
					@close="closeModal()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoomModal from './RoomModal';
import axios from 'axios';
import { EventBus } from '../../eventBus';
import { getConnection } from '../../utils/websocket';
import { ONLINE } from '../../utils/evenTypes';

export default {
	name: 'RoomInfo',
	props: ['roomInfo'],
	components: {
		RoomModal,
	},
	data() {
		return {
			searchInput: '',
			showModal: false,
			onlines: [],
			isLoadeds: new Set(),
		};
	},
	computed: {
		...mapGetters(['getUserData']),
	},
	methods: {
		getStatusClass(username) {
			const isOnline = this.onlines.includes(username);
			if (!isOnline && !this.isLoadeds.has(username)) {
				this.isLoadeds.add(username);
				getConnection().emitEvent(ONLINE, username);
			}
			if (isOnline) return 'online-status';
			return 'offline-status';
		},
		addUser() {
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		removeUser(userId) {
			let roomId = this.$route.params.handle;
			let user = this.getUserData;
			let body = {
				userId,
				roomId,
				user,
			};
			let config = {
				method: 'put',
				url: '/v1/group/remove',
				data: body,
			};
			axios(config)
				.then(res => {
					EventBus.$emit('forceRerender');
				})
				.catch(err => {
					window.location.href = '/chat';
				});
		},
	},
	beforeCreate() {
		getConnection().onEvent(ONLINE, ({ username, isOnline }) => {
			if (isOnline === true) this.onlines.push(username);
		});
	},
	watch: {
		roomInfo() {
			this.onlines = [];
			this.isLoadeds = new Set();
		},
	},
};
</script>

<style scoped lang="scss">
.room__info {
	display: flex;
	flex-direction: column;

	&__header {
		height: 120px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #c8cfd2;
	}

	&__body {
		height: 50%;
		width: 100%;

		.add-btn {
			padding: 8px 15px;
			border: 1px solid #c8cfd2;
		}

		.list-user {
			display: flex;
			flex-direction: column;

			.modal--people {
				display: flex;
				justify-content: center;
			}

			h2 {
				margin-top: 20px;
				margin-bottom: 20px;
			}

			span {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: 20px;
				padding-left: 20px;

				a {
					text-decoration: none;
					color: #667576;

					div {
						margin: 10px;
					}
				}
			}

			.user {
				padding-left: 10px;
				margin: 10px;
				/* border: 1px solid; */
				border-bottom: 1px solid #c8cfd2;

				&-info {
					display: flex;
					justify-content: space-between;
					.status {
						height: 8px;
						width: 8px;
						border-radius: 50%;
						background: #5b6164;
					}
					.online-status {
						@extend .status;
						background: #4ad79b;
					}
					.offline-status {
						@extend .status;
						background: #d72b57;
					}
				}

				span {
					width: 100%;
					display: flex;
					flex-direction: row;

					p {
					}

					a {
						margin-right: 10px;
						padding: 0.1rem;
						font-size: 12px;
						/*color: #fff;*/
					}
				}
			}
		}
	}
}
</style>
