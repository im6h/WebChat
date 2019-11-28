<template>
	<div class="room__info">
		<div class="room__info__header">
			<h3>{{ roomInfo.name }}</h3>
		</div>
		<div class="room__info__body">
			<div class="list-user">
				<h2>People</h2>
				<span class="modal--people">
					<a href="#" @click="addUser()">
						<div>Add people</div>
					</a>
				</span>
				<div class="user" v-for="user in roomInfo.members">
					<span>
						<p>{{ user.username }}</p>
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
		};
	},
	computed: {
		...mapGetters(['getUserData']),
	},
	methods: {
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
				.catch(err => console.log(err));
		},
	},
	beforeCreate() {},
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

		.list-user {
			display: flex;
			flex-direction: column;

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
					color: #c8cfd2;

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
				span {
					width: 100%;
					display: flex;
					flex-direction: row;

					p {
					}

					a {
						margin-left: 20px;
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
