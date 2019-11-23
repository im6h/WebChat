<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        <span>
                            <input type="text"
                                   placeholder="Search user"
                                   v-model="searchUser"
                            >
                            <button @click="searchUserByText()">Search</button>
                        </span>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <div class="user" v-for="user in users">
                            <span>
                                <p>{{user.username}}</p>
                                <button type="button" @click="addUser(user._id)">Add</button>
                            </span>
                        </div>
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button class="modal-default-button" @click="$emit('close')">
                            Cancel
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
    export default {
        name: "RoomModal",
        data() {
            return {
                searchUser: '',
                users: [],
            }
        },
        computed: {
            ...mapGetters(["getUserData"])
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
                    .then(res=>{
                        console.log(res.data);
                        this.$emit('close')
                    })
                    .catch(err=>{
                        console.log(err)
                    })
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
                    h3 {
                        margin-top: 0;
                        color: #42b983;
                    }
                }

                .modal-body {
                    margin: 20px 0;

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

                        button {
                            margin-left: 65%;
                            padding: 0.1rem;
                            border-radius: 2px;
                            color: #000;
                            background-color: transparent;
                            border: 1px solid transparent;

                        }
                    }
                }

                .modal-footer {
                    .modal-default-button {
                        float: right;
                    }
                }
            }
        }
    }
</style>