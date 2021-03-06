<template>
	<div class="input__chat">
		<div v-if="isTyping" class="type__wrap">
			<p>Somebody typing ...</p>
		</div>
		<input type="text" v-model="message" @change="onChange" @input="onInput" />
		<emoji-picker @emoji="insert" :search="search">
			<div
				class="emoji-invoker"
				slot="emoji-invoker"
				slot-scope="{ events: { click: clickEvent } }"
				@click.stop="clickEvent"
			>
				<img src="../../assets/img/emoji_emotions-24px.svg" />
			</div>
			<div slot="emoji-picker" slot-scope="{ emojis, insert }">
				<div class="emoji-picker" style>
					<div class="emoji-picker__search">
						<input type="text" v-model="search" v-focus />
					</div>
					<div>
						<div v-for="(emojiGroup, category) in emojis" :key="category">
							<h5>{{ category }}</h5>
							<div class="emojis">
								<span
									v-for="(emoji, emojiName) in emojiGroup"
									:key="emojiName"
									@click="insert(emoji)"
									:title="emojiName"
								>{{ emoji }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</emoji-picker>
		<div class="up__file">
			<img src="../../assets/img/file_copy-24px.svg" alt @click="selectFile()" />
			<input type="file" ref="file" hidden="hidden" @change="fileUpload" />
		</div>
		<div class="show__file" v-if="file">
			<span class="text-color">
				<p>{{ fileName }}</p>
				<div class="btn--action">
					<div class="btn--gray remove-file-btn" @click="removeFile()">Remove</div>
				</div>
			</span>
		</div>
		<button class="btn btn--clear btn--gray" @click="sendMessage">Send</button>
	</div>
</template>
<script>
import { getConnection } from '../../utils/websocket';
import { MESSAGE, FILE, TYPING } from '../../utils/evenTypes';
import EmojiPicker from 'vue-emoji-picker';
import axios from 'axios';
import { EventBus } from '../../eventBus.js';
import { mapGetters } from 'vuex';
export default {
	name: 'Chat',
	components: {
		EmojiPicker,
	},
	data: function() {
		return {
			message: '',
			search: '',
			file: null,
		};
	},
	computed: {
		...mapGetters(['isTyping']),
		fileName() {
			return this.file.name.substring(0, 4) + '...';
		},
	},
	methods: {
		insert(emoji) {
			this.message += emoji;
		},
		sendMessage() {
			let roomId = this.$route.params.handle;
			this.typing === false;
			if (this.file !== null) {
				let form = new FormData();
				form.append('file', this.file);
				axios
					.post('/v1/file', form)
					.then(res => {
						getConnection().emitEvent(FILE, {
							fileId: res.data,
							roomId,
						});
					})
					.catch(err => console.log(err));
				this.file = null;
			} else {
				if (this.message !== '') {
					getConnection().emitEvent(MESSAGE, {
						content: this.message,
						roomId,
					});
					this.message = '';
					EventBus.$emit('reloadMessage');
				}
			}
		},
		selectFile() {
			this.$refs.file.click();
		},
		fileUpload(events) {
			this.file = events.target.files[0];
		},
		removeFile() {
			this.file = '';
		},
		onChange(e) {
			const value = e.target.value;
			this.sendMessage();
		},
		onInput() {
			let roomId = this.$route.params.handle;
			if (this.message !== '') {
				this.sendTyping(roomId, true);
			}else{
				this.sendTyping(roomId,false);
			}
		},
		sendTyping(room, typing) {
			getConnection().emitEvent(TYPING, {
				room,
				typing,
			});
		},
	},
};
</script>
<style scoped lang="scss">
.input__chat {
	/*margin: 2rem 1rem 1px;*/
	padding: 10px 5px;
	border: 1px #c8cfd2 solid;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 10px;
	width: 94%;
	left: 4%;
	right: 4%;
	.type__wrap {
		position: absolute;
		bottom: 70px;
		left: 0px;
		color: #667576;
	}
	input {
		width: 80%;
		background-color: transparent;
		border: transparent;
		color: #241919;
		padding-right: 10px;
		padding-left: 0.5rem;
		margin-right: 20px;
		font-size: 14px;
		outline: none;
	}

	.up__file {
		margin-top: 5px;
		width: 30px;
		height: 30px;
		margin-left: 2px;
		margin-right: 2px;
	}
	.show__file {
		position: absolute;
		width: 100%;
		bottom: 68px;
		left: 0px;
		right: 0px;
		border-top: 1px solid white;
		padding-top: 5px;
		span {
			display: flex;
			p {
				margin-right: 5%;
			}
			.btn--action {
				.btn--remove {
					margin-left: 4px;
					border: 1px solid transparent;
					background-color: #18191c;
					color: white;
				}
				.remove-file-btn {
					font-size: 11px;
					padding: 2px 5px;
				}
			}
		}
	}
	.emoji-invoker {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 1rem;
		margin-top: 5px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			transform: scale(1.1);
		}
	}

	.emoji-picker {
		position: fixed;
		z-index: 1;
		top: 550px;
		left: 1000px;
		/*font-family: Montserrat;*/
		border: 1px solid #ccc;
		width: 15rem;
		height: 20rem;
		overflow-y: scroll;
		overflow-x: hidden;
		padding: 1rem;
		box-sizing: border-box;
		border-radius: 0.5rem;
		background: #fff;
		box-shadow: 1px 1px 8px #c7dbe6;

		h5 {
			margin-bottom: 0;
			color: #b1b1b1;
			text-transform: uppercase;
			font-size: 0.8rem;
			cursor: default;
		}

		.emojis {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			&:after {
				content: '';
				flex: auto;
			}

			span {
				padding: 0.2rem;
				cursor: pointer;
				border-radius: 5px;

				&:hover {
					background: #ececec;
					cursor: pointer;
				}
			}
		}
	}

	.emoji-picker__search {
		display: flex;

		> input {
			flex: 1;
			border-radius: 10rem;
			border: 1px solid #ccc;
			padding: 0.5rem 1rem;
			outline: none;
			color: black;
		}
	}
}
</style>
