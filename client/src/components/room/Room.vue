<template>
    <div class="page page--room">
        <section class="section section--room section--mmt p-0">
            <div class="section__content u-max-height p-0">
                <div class="chat">
                    <div class="chat__content">
                        <div class="chat__header" v-if="getCurrentRoom">
                            <span class="section__title__part"># {{ getCurrentRoom.avatar }}</span>
                            <div class="chat__actions">
                            </div>
                        </div>
                        <MessageList
                                :messages="messages"/>
                        <MessageInput/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	import MessageInput from '../messages/MessageInput';
	import MessageList from '../messages/MessageList';
	import { mapGetters } from 'vuex';
    import {getConnection} from "../../utils/websocket";
    import axios from "axios";

    export default {
		name: 'Room',
		components: {
			MessageInput,
			MessageList,
		},
		data: function() {
			return {
				usersTyping: '',
				messages: [],
			};
		},
		computed: {
            ...mapGetters(["getUserData", "getCurrentRoom"]),
            fetchMessage() {
                let roomId = this.$route.params.handle;
                axios.get(`/v1/message/${roomId}`)
                    .then(res => {
                        this.messages = res.data;
                        this.$store.commit('MESSAGES_IN_ROOM', res.data);
                    })
                    .catch(err => console.log(err));
            }
		},
        methods: {},
		created() {
            this.fetchMessage;
            getConnection().onopen();
		},
    };
</script>

<style scoped lang="scss">
    .page {
        overflow: hidden;
    }
</style>