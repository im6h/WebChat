<template>
    <div class="list-container">
        <div class="search-bar">
            <input type="text" placeholder="Search ...">
            <img src="../../assets/img/baseline_search_black_36dp.png">
            <img src="../../assets/img/group.jpg" alt="">
        </div>
        <div class="list-user">
            <div v-for="user in listUser">
                <div class="item">
                    <img src="../../assets/img/logo.png" alt="">
                    <p>{{user.fullName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "listUser",
        data() {
            return {
            }
        },
        computed:{
           ...mapGetters({
               listUser:'users'
           })
        },
        created() {

        }
    }
</script>

<style scoped lang="scss">
    @import "listUser.scss";
</style>