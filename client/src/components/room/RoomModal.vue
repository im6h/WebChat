<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        <span>
                            <input type="text"
                                   placeholder="Search user | Input name of user"
                                   v-model="searchUser"
                            >
                            <button @click="searchUserByText()">Search</button>
                        </span>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body" v-if="users.length">
                        <div class="user" v-for="user in users">
                            <span>
                                <p>{{user.username}}</p>
                                <button v-if="checkAddUser(user)"
                                        type="button"
                                        class="added-button"
                                        disabled>Added</button>
                                <button v-else
                                        type="button"
                                        class="add-button"
                                        @click="addUser(user._id)">Add</button>
                            </span>
                        </div>
                    </slot>
                    <slot name="body" v-else>
                        <div class="user">
                            <span style="color: #18191c">No result search</span>
                        </div>
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button class="modal-default-button" @click="closeModal()">
                            Close
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import axios from "axios";
    import {EventBus} from "../../eventBus";
    import _ from "lodash";

    export default {
        name: "RoomModal",
        props: ["memberInRoom"],
        data() {
            return {
                searchUser: '',
                users: [],
            }
        },
        computed: {
            ...mapGetters(["getUserData", "getCurrentRoom"]),
        },
        methods: {
            searchUserByText() {
                let text = this.searchUser;
                axios.get(`/v1/user/search?text=${text}`)
                    .then(res => {
                        this.users = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            checkAddUser(user) {
                let members = this.getCurrentRoom.members;
                let nameMember = _.map(members, m=>{
                    return m._id
                });
                return(_.includes(nameMember,user._id));

            },
            addUser(userId) {
                let roomId = this.$route.params.handle;
                let user = this.getUserData;
                let config = {
                    method: 'post',
                    url: '/v1/group/invite',
                    data: {
                        userId,
                        roomId,
                        user
                    }
                };

                axios(config)
                    .then(res => {
                        console.log(res.data);
                        this.users = _.remove(this.users, (n) => {
                            return n._id !== userId;
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            closeModal() {
                this.$emit('close');
                EventBus.$emit('forceRerender');
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;

        .modal-wrapper {
            display: table-cell;
            vertical-align: middle;

            .modal-container {
                width: 500px;
                height: 500px;
                margin: 0px auto;
                padding: 20px 30px;
                background-color: #fff;
                border-radius: 2px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
                transition: all .3s ease;
                font-family: Helvetica, Arial, sans-serif;

                .modal-header {
                    width: 100%;

                    h3 {
                        margin-top: 0;
                        color: #42b983;
                    }

                    span {
                        width: 100%;

                        input {
                            width: 80%;
                            padding: 10px;
                            border-radius: 2px;
                            border-top: 1px solid transparent;
                            border-left: 1px solid transparent;
                            border-right: 1px solid transparent;
                        }

                        button {
                            width: 19%;
                            padding: 12px;
                            margin-left: 4px;
                            border-radius: 5px;
                            border: 1px solid white;
                            cursor: pointer;
                        }
                    }
                }

                .modal-body {
                    margin: 20px 0;
                    height: 350px;
                    width: 100%;

                    span {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        margin-left: 20px;
                        margin-right: 20px;
                        padding-bottom: 20px;

                        p {
                            color: #18191c;
                        }

                        .added-button {
                            margin-left: 70%;
                            padding: 0.4rem;
                            border-radius: 2px;
                            color: #b1b1b1;
                            background-color: transparent;
                            border: 1px solid transparent;

                        }

                        .add-button {
                            margin-left: 70%;
                            padding: 0.4rem;
                            border-radius: 2px;
                            color: #000;
                            background-color: transparent;
                            border: 1px solid transparent;
                            cursor: pointer;

                        }
                    }
                }

                .modal-footer {
                    .modal-default-button {
                        float: right;
                        padding: 10px 20px;
                        margin-left: 4px;
                        border-radius: 5px;
                        border: 1px solid white;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>