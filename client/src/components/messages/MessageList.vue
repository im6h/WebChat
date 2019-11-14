<template>
    <div class="messagesList" id="list" ref="list">
        <div class="message" v-for="message in messages" :key="message._id">
            <div class="item__right" v-if="message.sender === getUserData.username">
                <div class="item__content">
                    <span>{{ message.content }}</span>
                </div>
            </div>
            <div class="message__item__left" v-else>
                <div class="item__content">
                    <span>{{ message.content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import axios from 'axios';

    export default {
        name: 'MessageList',
        props: ['messages'],
        data: function () {
            return {
                getMessage: [],
            };
        },
        computed: {
            ...mapGetters(['getUserData', 'getMessagesInRoom']),
            fetchMessageInRoom: function () {
                const roomId = this.$route.params.handle;
                let config = {
                    method: 'get',
                    url: `/v1/message/${roomId}`
                };
                if (this.getMessagesInRoom.length === 0) {
                    axios(config).then(res => {
                        this.$store.commit('MESSAGES_IN_ROOM', res.data);
                    }).catch(err => console.log(err));
                }
            }
        },
        methods: {},
        created() {
            this.fetchMessageInRoom;

        },
        updated() {
            let container = this.$refs.list;
            // console.log(container);
            container.scrollTop = container.scrollHeight;
        }
    };
</script>

<style scoped lang="scss">

    .messagesList {
        margin: 5px 20px;
        padding: 0;
        display: inline-flex;
        flex-direction: column;
        height: 77vh;
        overflow-x: auto;
        width: 97%;
    }

    .message {
        width: 100%;
        display: flex;
    }

    .item__right {
        width: 100%;
        display: flex;
        transition: opacity 0.5s ease, transform 0.5s ease;
        position: relative;
        background: transparent;
        padding: 0.5rem;
        border-radius: 8px;
        text-align: left;
        justify-content: flex-end;
        font-family: 'Work Sans';
        white-space: pre-line;
    }

    .message__item__left {
        width: 100%;
        display: flex;
        transition: opacity 0.5s ease, transform 0.5s ease;
        position: relative;
        background: transparent;
        padding: 0.5rem;
        border-radius: 8px;
        text-align: left;
        margin: 0 1rem;
        align-self: center;
        justify-content: flex-start;
        font-family: 'Work Sans';
        white-space: pre-line;
    }

    .item__content {
        position: relative;
        background: #3c9adf;
        padding: 0.5rem;
        border-radius: 8px;
        text-align: left;
        margin: 0 1rem;
        align-self: center;
        font-family: 'Work Sans';
        white-space: pre-line;
    }

</style>