<template>
    <div class="room__info">
        <div class="room__info__header">
            <h3>{{roomInfo.name}}</h3>
        </div>
        <div class="room__info__body">
            <div class="list-user">
                <h2>People</h2>
                <span class="modal--people">
                    <a href="#" @click="addUser()">
                        <div>Add people</div>
                    </a>
                </span>
                <div class="user" v-for="user in roomInfo.members">
                    <span>
                        <p>{{user.username}}</p>
                        <button type="button" @click="removeUser(user._id)">Remove</button>
                    </span>
                </div>
            </div>
            <div>
                <RoomModal v-if="showModal" @close="closeModal()"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import RoomModal from "./RoomModal";
    import axios from "axios";

    export default {
        name: "RoomInfo",
        props: ['roomInfo'],
        components:{
          RoomModal
        },
        data() {
            return {
                searchInput: "",
                showModal: false,
            }
        },
        computed: {
            ...mapGetters(["getUserData"])
        },
        methods: {
            addUser() {
                this.showModal = true;
            },
            closeModal(){
                this.showModal = false;
            },
            removeUser(userId) {
                let roomId = this.$route.params.handle;
                let user = this.getUserData;
                let body = {
                    userId,
                    roomId,
                    user
                };
                let config = {
                    method: 'put',
                    url: '/v1/group/remove',
                    data: body
                };
                axios(config)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
            }
        },
        beforeCreate() {
        }
    }
</script>

<style scoped lang="scss">
    .room__info {
        display: flex;
        flex-direction: column;

        &__header {
            height: 120px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid white;
        }

        &__body {
            height: 50%;
            width: 100%;

            .list-user {

                display: flex;
                flex-direction: column;

                h2 {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }

                span {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    padding-left: 20px;

                    a {
                        text-decoration: none;
                        color: white;

                        div {
                            margin: 10px;
                        }
                    }
                }

                .user {
                    padding-left: 10px;

                    span {
                        width: 100%;
                        display: flex;
                        flex-direction: row;

                        p {
                        }

                        button {
                            margin-left: 65%;
                            padding: 0.1rem;
                            border-radius: 2px;
                            color: #fff;
                            background-color: transparent;
                            border: 1px solid transparent;

                        }
                    }
                }
            }
        }
    }
</style>