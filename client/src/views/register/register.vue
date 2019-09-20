<template>
    <div class="register-container">
        <div class="register-form">
            <form>
                <div class="title">
                    <h3>Đăng ký</h3>
                    <img id="logo" src="../../assets/logoNavbar.png" alt="">
                </div>
                <div class="wrap-input">
                    <input type="text" value placeholder="Tên đầy đủ" v-model="user.fullName">
                    <br>
                    <input type="text" value placeholder="Tài khoản người dùng" v-model="user.username">
                    <br>
                    <input type="password" value placeholder="Mật khẩu" v-model="user.password">
                </div>
                <div id="btn" v-on:click="register">
                    <img id="btn-register" src="../../assets/right-arrow.png" alt="">
                </div>
            </form>
        </div>
        <div class="link">
            <a href="/">Bạn đã có tài khoản, hãy đăng nhập để bắt đầu.</a>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "register",
        data() {
            return {
                user: {
                    username: '',
                    fullName: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions(['PERFORM_LOGON']),
            register(e) {
                e.preventDefault();
                this.PERFORM_LOGON(this.user)
                    .then(()=>{
                        alert(`You just created account with ${this.user.username}`);
                        this.$router.push("/login");
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "register.scss";
</style>