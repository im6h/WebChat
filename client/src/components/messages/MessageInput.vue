<template>
    <div class="input__chat">
        <input type="text" v-model="message">
        <img src="../../assets/img/baseline_insert_emoticon_white_18dp.png" alt="">
        <img src="../../assets/img/baseline_file_copy_white_18dp.png" alt="" @click="sendFile()">
<!--        <input type="file" id="file" ref="file" @change="handleFileUpload()">-->
        <button class="btn btn--clear btn--info" @click="sendMessage">Send</button>
    </div>
</template>
<script>
    import {getConnection} from '../../utils/websocket';
    import {MESSAGE,TYPING,FILE} from '../../utils/evenTypes';
    import axios from 'axios';
	export default {
		name: 'Chat',
		components: {},
		data:function(){
		    return {
                message: '',
                file:''
            }
        },
		methods: {
			handleFileUpload(){
				this.file = this.$refs.file.file[0];
            },
			sendMessage() {
				console.log(this.message);
                getConnection().emitEvent(MESSAGE,{
                	content:this.message,
                    roomId: this.$route.params.handle,
                });
                this.message = ' ';
			},
            sendFile(){
				document.getElementById("file").click();
				let formData = new FormData();
				formData.append('file',this.file);
				let config = {
					method: 'post',
					url: '/v1/file',
					body: formData
				};
				axios(config).then(res=>{
					console.log(res.data)
                }).catch(err=> console.log(err))
            }
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
        width: 97%;
        right: 5px;
        left: 2px;
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