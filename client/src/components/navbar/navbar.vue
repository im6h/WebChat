<template>
    <div class="nav-container">
        <div class="nav-wrapper">
            <div class="menu-left">
                <a href="/">
                    <img class="img-navbar" src="../../assets/message.png" alt="">
                </a>
                <a href="/about" class="link">
                    <img class="img-navbar" src="../../assets/user.png" alt="">
                </a>
            </div>
            <div class="menu-right">
                <a href="/login">
                    <img src="../../assets/exit.png" class="avatar">
                </a>
                <p>{{userLogin.username}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "AppNav",
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters({
                userLogin:'userLogin'
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import "navbar.scss";
</style>