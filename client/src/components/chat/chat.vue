<template>
    <div class="chat-container">
        <div class="header">
            <img id="avatar-you" src="../../assets/img/logo.png" alt="">
            <p>Dang vu</p>
        </div>
        <div id="line-1"></div>
        <div class="content">
            <div class="chat">
                <div class="chat-list">
                    <div class="" v-for="(msg,index) in messages" v-bind:key="index">
                        <p class="chat-item">{{msg.msg}}</p>
                    </div>
                </div>
                <div id="line-2"></div>
                <div class="chat-input">
                    <img src="../../assets/img/baseline_insert_drive_file_black_36dp.png" alt="">
                    <input type="text" placeholder="Enter message">
                    <img src="../../assets/img/baseline_emoji_emotions_black_36dp.png" alt="">
                    <button id="btn-send">Send</button>
                </div>
            </div>
            <div class="option">
                <div class="avatar-user">
                    <img src="../../assets/img/logo.png" alt="">
                    <p>Dang vu</p>
                </div>
                <div class="info-user">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Chat",
        data() {
            return {
                messages: [
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    },
                    {
                        msg: 'Hello world'
                    },
                    {
                        msg: 'Your right'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "chat.scss";
</style>