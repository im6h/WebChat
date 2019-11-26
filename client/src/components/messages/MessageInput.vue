<template>
	<div class="input__chat">
		<input type="text" v-model="message" />
		<emoji-picker @emoji="insert" :search="search">
			<div
				class="emoji-invoker"
				slot="emoji-invoker"
				slot-scope="{ events: { click: clickEvent } }"
				@click.stop="clickEvent"
			>
				<img src="../../assets/img/baseline_insert_emoticon_white_18dp.png" />
			</div>
			<div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
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
			<img src="../../assets/img/baseline_file_copy_white_18dp.png" alt @click="selectFile()" />
			<input type="file" ref="file" hidden="hidden" @change="fileUpload" />
		</div>
		<div class="show__file" v-if="file">
			<span>
				<p>{{fileName}}</p>
				<div class="btn--action">
					<button class="btn--remove" @click="removeFile()">X</button>
				</div>
			</span>
		</div>
		<button class="btn btn--clear btn--info" @click="sendMessage">Send</button>
	</div>
</template>
<script>
import { getConnection } from '../../utils/websocket';
import { MESSAGE, TYPING, FILE } from '../../utils/evenTypes';
import EmojiPicker from 'vue-emoji-picker';
import axios from 'axios';
import { log } from 'util';

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
			if (this.file !== null) {
				let form = new FormData();
				form.append('file', this.file);
				axios
					.post('/v1/file', form)
					.then(res => {
						console.log(res);
					})
					.catch(err => console.log(err));
				this.file = null;
			} else {
				getConnection().emitEvent(MESSAGE, {
					content: this.message,
					roomId,
				});
				this.message = '';
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
	},
};
</script>
<style scoped lang="scss">
.input__chat {
	margin: 2rem 1rem 1px;
	padding: 10px 5px;
	border: 1px white solid;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 10px;
	width: 69%;
	right: 5px;
	left: 2px;

	input {
		width: 80%;
		background-color: transparent;
		border: transparent;
		color: white;
		padding-right: 10px;
		padding-left: 0.5rem;
		margin-right: 20px;
		font-size: 20px;
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
				margin-right: 92%;
			}
			.btn--action {
				.btn--remove {
					margin-left: 4px;
					border: 1px solid transparent;
					padding: 2px;
					background-color: #18191c;
					color: white;
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
		font-family: Montserrat;
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
