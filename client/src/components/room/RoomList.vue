<template>
    <div class="page roomList">
        <section class="section section--mmt mb-3">
            <div class="section__content">
                <Error :errorMessage="errorMessage"/>
                <div class="rooms">
                    <div class="rooms__actions">
                        <a @click="createRoom" class="btn btn--gray">Create Room</a>
                        <a @click="fetchRoomData" class="btn btn--gray">Refresh Rooms</a>
                    </div>
                    <div class="rooms__header">
                        <input
                                type="text"
                                class="rooms__search-input"
                                placeholder="Search | Enter 'my_rooms' for a list of your created rooms"
                                @change="onSearch"
                        />
                    </div>
                    <transition name="slideDown">
                        <ul class="rooms__list">
                            <transition-group name="slideUp" v-if="rooms.length > 0">
                                <li v-for="room in rooms" :key="room._id" class="rooms__list-item">
                                    <a
                                            class="rooms__list-item-link"
                                            @click="$emit('reRenderRoom')"
                                            @click.prevent="handleRoomClick(room)"
                                    >
                                        <div v-bind:class="getClass(room._id, room.unread)">
                                            <div class="rooms__item-details">
                                                <div class="rooms__item-avatar">
                                                    {{ room.avatar}}
                                                </div>
                                                <div
                                                        v-if="room.lastMessage"
                                                        class="rooms__item-message"
                                                >
                                                    <div class="sender-name">
                                                        <div>
                                                            {{ room.lastMessage.sender }}
                                                        </div>
                                                        <div>
															<span>
																{{ room.lastMessage.date | date }}
															</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                            class="content"
                                                            v-if="room.lastMessage.type === 'text'"
                                                    >
                                                        {{ room.lastMessage.content }}
                                                    </div>
                                                    <div
                                                            class="content"
                                                            v-if="room.lastMessage.type !== 'text'"
                                                    >
                                                        Attached file
                                                    </div>
                                                </div>
                                                <div
                                                        v-if="!room.lastMessage"
                                                        class="rooms__item-message"
                                                >
                                                    Không có tin nhắn
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </transition-group>
                            <span v-else>No rooms</span>
                        </ul>
                    </transition>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';
	import { mapGetters } from 'vuex';
	import Error from '../../components/error/Error.vue';
	import { EventBus } from '../../eventBus.js';
	import { getConnection } from '../../utils/websocket';
	import { JOIN } from '../../utils/evenTypes';

	export default {
		name: 'RoomList',
		props: ['message'],
		components: {
			Error,
		},
		data: function() {
			return {
				rooms: [],
				room_name: null,
				privateRoomName: null,
				password: null,
				privateRoomPassword: null,
				errorMessage: this.message,
				errors: [],
			};
		},
		computed: {
			...mapGetters({
				getUserData: 'getUserData',
			}),
			currentRoomId() {
				return this.$route.params.handle;
			},

		},
		methods: {
			getClass(_id, unread) {
				const currentRoom = this.$route.params.handle;
				const cl = 'rooms__item-container';
				if(unread) {
                    return cl + ' animation';
				}
				if (currentRoom === _id) {
					return cl + ' selected';
				}
				return cl;
			},
			handleRoomClick(room) {
				this.$store.dispatch('saveCurrentRoom', room);
				this.$store.dispatch('clearUnread', room._id);
				this.$router
					.push({
						name: 'ChatDetail',
						params: {
							handle: room._id,
						},
					})
					.catch(err => err);
			},
			createRoom() {
				let config = {
					url: '/v1/group',
					method: 'post',
					data: {
						userId: this.getUserData._id,
						members: [this.getUserData._id],
					},
				};
				axios(config)
					.then(({ data: roomId }) => {
						this.fetchRoomData();
						getConnection().emitEvent(JOIN, { roomId });
					})
					.catch(err => {
						console.log(err);
					});
			},
			fetchRoomData() {
				axios
					.get('/v1/room')
					.then(res => {
						this.rooms = res.data;
						this.$store.dispatch('updateRoom', res.data);
						this.$store.dispatch('saveCurrentRoom', res.data[0]);
					})
					.catch(err => {
						console.log(err);
					});
			},
			onSearch(e) {
				const value = e.target.value;
				if (!value) {
					return this.fetchRoomData();
				}
				axios
					.get('/v1/room/search?text=' + value)
					.then(({ data }) => {
						this.rooms = data;
						this.$store.dispatch('updateRoom', data);
					})
					.catch(e => {
						console.log(e);
					});
			},
			filterRoom() {
			},
		},
		created() {
			this.fetchRoomData();
			EventBus.$on('reloadListRoom', () => {
				this.fetchRoomData();
			});
		},
	};
</script>

<style lang="scss">
    @import '../../assets/scss/views/rooms.scss';
</style>
