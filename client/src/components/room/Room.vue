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
                        <MessageList :messages="getMessagesInRoom"/>
                        <transition name="slideDown">
                            <div class="chat__utyping" v-show="usersTyping.length > 0">
                                <span>{{  }}</span>
                            </div>
                        </transition>
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
			...mapGetters(['getUserData', 'getMessagesInRoom', 'getCurrentRoom']),
		},
		methods: {},
		created() {
            let roomId = this.$route.params.handle;
            this.$store.dispatch('fetchMessages', roomId);
            getConnection().onopen();
		},

	};
</script>

<style scoped lang="scss">
    .page {
        overflow: hidden;
    }
</style>