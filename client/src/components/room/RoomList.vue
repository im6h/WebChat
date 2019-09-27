<template>
    <div class="page roomList">
        <section class="section section--mmt mb-3">
            <div class="section__heading mt-6">
                <span class="section__title">Room List</span>
            </div>
            <div class="section__content">
                <Error :errorMessage="errorMessage"/>
                <p class="section__lead">Enter a room and start chatting!</p>
                <div class="rooms" v-if="rooms">
                    <div class="rooms__header">
                        <input
                                type="text"
                                class="rooms__search-input"
                                placeholder="Search | Enter 'my_rooms' for a list of your created rooms"
                                v-model="searchInput"
                        >
                    </div>
<!--                    <transition name="slideDown">-->
<!--                        <ul class="rooms__list">-->
<!--                            <transition-group name="slideUp" v-if="filteredRooms.length > 0">-->
<!--                                <li-->
<!--                                        v-for="room in filteredRooms"-->
<!--                                        :key="room._id"-->
<!--                                        class="rooms__list-item"-->
<!--                                >-->
<!--                                    <a-->
<!--                                            :href="`room/${room._id}`"-->
<!--                                            class="rooms__list-item-link"-->
<!--                                            @click.prevent="handleRoomClick(room)"-->
<!--                                    >-->
<!--                                        <div class="rooms__item-container">-->
<!--                                            <div class="rooms__item-details">-->
<!--                                                <p>{{ room.name }}</p>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                            </transition-group>-->
<!--                            <span v-else>No Rooms</span>-->
<!--                        </ul>-->
<!--                    </transition>-->
                    <div class="rooms__actions">
                        <a @click="openModal" class="btn btn--info">Create Room</a>
                        <a @click="fetchRoomData" class="btn btn--info">Refresh Rooms</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';

	import Error from '../error/Error.vue';

	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'RoomList',
        props:['message'],
		components: {
			Error,
		},
		data: function() {
            return{
            	errorMessage: this.message,
                searchInput:'',
                rooms:[],
            }
		},
		computed: {
			...mapGetters({}),
			filteredRooms(){

            }
        },
		methods: {
			handleRoomClick(room){

            },
            openModal(){

            },
            fetchRoomData(){

            }
        },
		created() {
		},
	};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/views/rooms";
</style>