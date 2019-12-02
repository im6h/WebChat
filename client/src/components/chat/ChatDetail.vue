<template>
	<div class="page__message">
		<section class="page__left">
			<RoomList v-on:reRenderRoom="reRenderRoom()"></RoomList>
		</section>
		<section class="page__right">
			<Room :key="renderRoom"></Room>
		</section>
	</div>
</template>

<script>
import RoomList from '../room/RoomList';
import Room from '../room/Room';
import { EventBus } from '../../eventBus';

export default {
	name: 'MessagesDetail',
	components: {
		RoomList,
		Room,
	},
	data: function() {
		return {
			roomId: this.$route.params.handle,
			renderRoom: 0,
		};
	},
	methods: {
		reRenderRoom() {
			this.renderRoom += 1;
		},
	},
	created() {
		EventBus.$on('forceRerender', () => {
			this.renderRoom += 1;
		});
	},
	beforeDestroy() {
		EventBus.$off('forceRerender');
	},

};
</script>

<style scoped lang="scss">
.page__message {
	margin-left: 0;
	margin-right: 0;
	display: flex;
	flex-direction: row;
	height: calc(100vh - 66px);
	overflow: hidden;
}

.page__left {
	width: 27%;
	/*padding: 2px;*/
	/*border-right: 1px white solid;*/
	border-right: 1px solid #c8cfd2;
}

.page__right {
	width: 73%;
	overflow-y: scroll;
}
</style>
