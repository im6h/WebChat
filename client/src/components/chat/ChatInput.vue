<template>
    <div class="input__chat">
        <input type="text">
        <img src="../../assets/img/baseline_insert_emoticon_white_18dp.png" alt="">
        <img src="../../assets/img/baseline_file_copy_white_18dp.png" alt="">
        <button class="btn btn--clear btn--info">Send</button>
    </div>
</template>
<script>
	export default {
		name: 'Chat',
		components: {},
		data() {
			return {
				content: '',
			};
		},
		methods: {
			sendMessage() {

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

        input {
            width: 80%;
            background-color: transparent;
            border: transparent;
            color: white;
            padding-right: 10px;
            margin-right: 20px;

        }

        img {
            margin-top: 5px;
            width: 30px;
            height: 30px;
            margin-left: 2px;
            margin-right: 2px;

        }

    }
</style>