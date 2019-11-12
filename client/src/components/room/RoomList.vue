<template>
    <div class="page roomList">
        <section class="section section--mmt mb-3">
            <div class="section__content">
                <Error :errorMessage="errorMessage"/>
                <div class="rooms">
                    <div class="rooms__actions">
                        <a @click="createRoom" class="btn btn--info">Create Room</a>
                        <a @click="fetchRoomData" class="btn btn--info">Refresh Rooms</a>
                    </div>
                    <div class="rooms__header">
                        <input
                                type="text"
                                class="rooms__search-input"
                                placeholder="Search | Enter 'my_rooms' for a list of your created rooms"
                                v-model.trim="searchInput"
                        >
                    </div>
                    <transition name="slideDown">
                        <ul class="rooms__list">
                            <transition-group name="slideUp" v-if="rooms.length > 0">
                                <li
                                        v-for="room in rooms"
                                        :key="room._id"
                                        class="rooms__list-item"
                                >
                                    <a
                                            :href="`room/${room._id}`"
                                            class="rooms__list-item-link"
                                            @click.prevent="handleRoomClick(room)"
                                    >
                                        <div class="rooms__item-container">
                                            <div class="rooms__item-details">
                                                <p>{{ room.avatar }}</p>
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
				searchInput: '',
				errorMessage: this.message,
				errors: [],
			};
		},
		computed: {
			...mapGetters({
				getUserData: 'getUserData',
				// rooms : 'getRoomData'
			}),
		},
		methods: {
			// ...mapActions(['updateRoomData', 'addRoom', 'deleteRoom', 'saveCurrentRoom']),
			filteredRooms() {

			},
			handleRoomClick(room) {
				this.$store.dispatch('saveCurrentRoom', room);
				this.$router.push({
					name: 'ChatDetail',
					params: {
						handle: room._id,
					},
				}).catch(err => err);

			},
			handleDelete() {

			},
			createRoom() {
				let config = {
					url: '/v1/group',
					method: 'post',
					data: {
						'userId': this.getUserData._id,
						'members': [
							this.getUserData._id,
						],
					},
				};
				axios(config)
					.then(res => {
						console.log(res);

					})
					.catch(err => {
						console.log(err);
					});
			},
			fetchRoomData() {
				axios.get('/v1/room')
					.then(res => {
						this.rooms = res.data;
						this.$store.dispatch('updateRoom', res.data);
						this.$store.dispatch('saveCurrentRoom',res.data[0]);
						// let firstRoom = res.data[0];
						// this.$store.dispatch('saveCurrentRoom')
					})
					.catch(err => {
						console.log(err);
					});
			},

		},
		created: function() {
			this.fetchRoomData();
			if (this.errorMessage) {
				setTimeout(() => {
					this.errorMessage = '';
				}, 1500);
			}
		},
	};
</script>

<style lang="scss">
    @import '../../assets/scss/views/rooms.scss';

</style>
