<template>
    <div class="page__message">
        <section class="page__left">
            <RoomList></RoomList>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';
	import RoomList from '../room/RoomList';
	import Room from '../room/Room';


	export default {
		name: 'Chat',
		components: {
			RoomList,
			Room,
		},
		data: function() {
			return {};
		},
		methods: {
			currentRoom() {
				let roomId = this.$route.params.handle;
				let config = {
					method: 'get',
					url: `/v1/room/info/${roomId}`,
				};
				axios(config)
					.then(res => {
						this.$store.dispatch('saveCurrentRoom', res.data);
					})
					.catch(err => err);
			},
		},
		created: function() {
			axios.get('/v1/room')
				.then(res => {
					// this.$store.commit('updateRoom',res.data);
					this.$router.push({
						name: 'ChatDetail',
						params: {
							handle: res.data[0]._id,
						},
					});
				})
				.catch(err => err);
		},
	};
</script>

<style scoped lang="scss">
    .page__message {
        margin-left: 0;
        margin-right: 0;
        display: flex;
        flex-direction: row;
        min-height: 85vh;
    }

    .page__left {
        width: 30%;
        padding: 2px;
        border-right: 1px white solid;
    }
</style>