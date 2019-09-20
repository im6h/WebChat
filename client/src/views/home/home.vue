<template>
    <div class="home-container">
        <app-nav id="navbar"></app-nav>
        <hr>
        <div class="main-container">
            <list-user id="listuser"></list-user>
            <chat id="chat"></chat>
        </div>
    </div>
</template>

<script>
    import AppNav from '@/components/navbar/navbar';
    import ListUser from '@/components/listUser/listUser';
    import Chat from '@/components/chat/chat';

    import {mapActions} from 'vuex';
    export default {
        name: "home",
        components:{
            AppNav,
            ListUser,
            Chat,
        },
        created() {
            return this.$store.dispatch("USER_LOADING")
        }
    }
</script>

<style scoped>
    @import "home.scss";
</style>