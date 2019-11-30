<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="modal-header">
					<slot name="header">
						<div class="header-container">
							<input
								type="text"
								placeholder="Search user | Input name of user"
								v-model="searchUser"
							/>
							<div class="btn btn--gray" @click="searchUserByText()">Search</div>
						</div>
					</slot>
				</div>
				<div class="modal-body">
					<slot name="body" v-if="users.length">
						<div class="user" v-for="user in users" :key="user.user">
							<span>
								<p>{{ user.username }}</p>
								<button
									v-if="checkAddUser(user)"
									type="button"
									class="added-button"
									disabled
								>
									Invited
								</button>
								<button
									v-else
									type="button"
									class="add-button"
									@click="addUser(user._id)"
								>
									Invite
								</button>
							</span>
						</div>
					</slot>
					<slot name="body" v-else>
						<div class="user">
							<span>No result search</span>
						</div>
					</slot>
				</div>
				<div class="modal-footer">
					<slot name="footer">
						<div class="btn btn--gray" @click="closeModal()">
							Close
						</div>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import { EventBus } from '../../eventBus';
import _ from 'lodash';

export default {
	name: 'RoomModal',
	props: ['memberInRoom'],
	data() {
		return {
			searchUser: '',
			users: [],
		};
	},
	computed: {
		...mapGetters(['getUserData', 'getCurrentRoom']),
	},
	methods: {
		searchUserByText() {
			let text = this.searchUser;
			axios
				.get(`/v1/user/search?text=${text}`)
				.then(res => {
					this.users = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		checkAddUser(user) {
			let members = this.getCurrentRoom.members;
			let nameMember = _.map(members, m => {
				return m._id;
			});
			return _.includes(nameMember, user._id);
		},
		addUser(userId) {
			let roomId = this.$route.params.handle;
			let user = this.getUserData;
			let config = {
				method: 'post',
				url: '/v1/group/invite',
				data: {
					userId,
					roomId,
					user,
				},
			};

			axios(config)
				.then(res => {
					this.users = _.remove(this.users, n => {
						return n._id !== userId;
					});
					this.$store.dispatch('addMember', { member: res.data.data });
				})
				.catch(err => {
					console.log(err);
				});
		},
		closeModal() {
			this.$emit('close');
			// EventBus.$emit('forceRerender');
		},
	},
};
</script>

<style scoped lang="scss">
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;

		.modal-container {
			width: 500px;
			height: 500px;
			margin: 0px auto;
			padding: 20px 30px;
			background-color: #fff;
			border-radius: 2px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
			transition: all 0.3s ease;
			/*font-family: Helvetica, Arial, sans-serif;*/

			.modal-header {
				width: 100%;

				h3 {
					margin-top: 0;
					color: #42b983;
				}

				> .header-container {
					width: 100%;
					display: flex;
					input {
						width: 60%;
						border-radius: 5px;
						border: 1px solid #c8cfd2;
						color: #c8cfd2;
						padding-left: 5px;
						&::placeholder {
							padding-left: 5px;
							color: #c8cfd2;
						}
					}
					/*input {*/
					/*	width: 80%;*/
					/*	padding: 10px;*/
					/*	border-radius: 2px;*/
					/*	border: 1px solid #c8cfd2;*/
					/*	!*border-top: 1px solid transparent;*!*/
					/*	!*border-left: 1px solid transparent;*!*/
					/*	!*border-right: 1px solid transparent;*!*/
					/*}*/

					/*button {*/
					/*	width: 19%;*/
					/*	padding: 10px;*/
					/*	margin-left: 4px;*/
					/*	!*border-radius: 5px;*!*/
					/*	border: 1px solid #c8cfd2;*/
					/*	cursor: pointer;*/
					/*}*/
				}
			}

			.modal-body {
				margin: 20px 0;
				height: 350px;
				width: 100%;
				> .user {
					&:first-child {
						border-top: 1px solid #c8cfd2;
					}
					border-bottom: 1px solid #c8cfd2;
				}
				span {
					width: 100%;
					display: flex;
					flex-direction: row;
					margin-left: 20px;
					margin-right: 20px;
					padding: 11px 0;

					p {
						color: #1679a3;
					}

					.added-button {
						margin-left: 60%;
						padding: 0.4rem;
						border-radius: 2px;
						color: #b1b1b1;
						background-color: transparent;
						border: 1px solid transparent;
					}

					.add-button {
						margin-left: 60%;
						padding: 0.4rem;
						border-radius: 2px;
						color: #242524;
						background-color: transparent;
						border: 1px solid transparent;
						cursor: pointer;
					}
				}
			}

			.modal-footer {
				.modal-default-button {
					float: right;
					padding: 10px 20px;
					margin-left: 4px;
					/*border-radius: 5px;*/
					border: 1px solid #c8cfd2;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
