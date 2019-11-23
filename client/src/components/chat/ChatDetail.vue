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
    import axios from 'axios';

    export default {
        name: 'MessagesDetail',
        components: {
            RoomList,
            Room,
        },
        data: function () {
            return {
                roomId: this.$route.params.handle,
                renderRoom: 0,
            };
        },
        methods: {
            reRenderRoom() {
                this.renderRoom += 1;
            },
            // currentRoom(){
            // 	let config = {
            // 		method:'get',
            //         url:`/v1/room/info/${this.roomId}`
            //     };
            //     axios(config)
            //         .then(res=>{
            //             this.$store.dispatch('saveCurrentRoom',res.data);
            //         })
            //         .catch(err => err)
            // }
        },
    };
</script>

<style scoped lang="scss">
    .page__message {
        margin-left: 0;
        margin-right: 0;
        display: flex;
        flex-direction: row;
        height: 93vh;
        overflow: hidden;
    }

    .page__left {
        width: 30%;
        padding: 2px;
        border-right: 1px white solid;
    }

    .page__right {
        width: 70%;
        overflow-y: scroll;
    }
</style>