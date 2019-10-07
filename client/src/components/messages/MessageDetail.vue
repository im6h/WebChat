<template>
    <div class="page__message">
        <section class="page__left">
            <RoomList></RoomList>
        </section>
        <section class="page__right">
            <Room></Room>
        </section>
    </div>
</template>

<script>
	import RoomList from '../room/RoomList';
	import Room from '../room/Room';

	export default {
		name: 'MessagesDetail',
		components: {
			RoomList,
			Room,
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

    .page__right {
        width: 70%;
    }
</style>