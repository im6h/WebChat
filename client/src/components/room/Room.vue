<template>
    <div class="page page--room">
        <section class="section section--room section--mmt p-0">
            <div class="section__content u-max-height p-0">
                <div class="chat">
                    <div class="chat__content">
                        <div class="chat__header" v-if="getCurrentRoom">
                            <span class="section__title__part"># {{ getCurrentRoom.name }}</span>
                            <div class="chat__actions">
                            </div>
                        </div>
                        <MessageList :messages="messages"/>
                        <transition name="slideDown">
                            <div class="chat__utyping" v-show="usersTyping.length > 0">
                                <span>{{  }}</span>
                            </div>
                        </transition>
                        <ChatInput/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';
	import ChatInput from '../chat/ChatInput';
	import MessageList from '../chat/MessageList';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'Room',
		components: {
			ChatInput,
			MessageList,
		},
		data: function() {
			return {
				usersTyping: '',
				messages:[
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d96f76503064a002055731e",
						"content": "hello",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d96f76503064a002055731e",
						"content": "con mua ngang quas",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d96f76503064a002055731e",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d5845a840249a37848cc6c8",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d5845a840249a37848cc6c8",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d5845a840249a37848cc6c8",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d5845a840249a37848cc6c8",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d5845a840249a37848cc6c8",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d5845a840249a37848cc6c8",
						"content": "sdf",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},
					{
						"_id": "5d596c29f732dc504d539f99",
						"sender": "hirosume",
						"senderId": "5d96f76503064a002055731e",
						"content": "Chot ha",
						"room": "5d58f6e8bd920f3db0181bc0",
						"date": "2019-08-18T15:18:01.293Z",
						"__v": 0
					},




                ],
				idRoom: this.$route.params.handle,
			};
		},
		computed: {
			...mapGetters(['getUserData','getCurrentRoom']),
		},
		methods: {
			...mapActions(['fetchMessages'])
        },
		created() {
			let config = {
				url: `/v1/room/info/${this.idRoom}`,
				method: 'get',
			};
			axios(config).then(res => {
				if (res.data) {
					this.$store.dispatch('saveCurrentRoom', res.data);
				}
			}).catch(err => {
				console.log(err);
			});
            this.$store.dispatch('fetchMessages',this.idRoom);
		},
	};
</script>

<style scoped lang="scss">

</style>