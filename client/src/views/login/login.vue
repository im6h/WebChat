<template>
    <div class="login-container">
        <div class="login-form">
            <form>
                <div class="title">
                    <h3>Đăng nhập</h3>
                    <img id="logo" src="../../assets/logoNavbar.png" alt="">
                </div>
                <div class="wrap-input">
                    <input type="text" value placeholder="Tài khoản người dùng" v-model="user.username">
                    <br>
                    <input type="password" value placeholder="Mật khẩu" v-model="user.password">
                </div>
                <div id="save-pass">
                    <div id="btn" v-on:click="login">
                        <img id="btn-login" src="../../assets/right-arrow.png">
                    </div>
                </div>
            </form>
        </div>
        <div class="link">
            <a href="/register">Bạn chưa có tài khoản ? Đăng kí tại đây. </a>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
               user:{
                   username: '',
                   password: ''
               }
            }

        },
        methods: {
          ...mapActions(['PERFORM_LOGIN']),
            login(e){
              e.preventDefault();
              this.PERFORM_LOGIN(this.user)
                  .then(()=>{
                      this.$router.replace("/chat");
                  })
                  .catch((err)=>{
                      alert(err);
                  })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'login.scss';
</style>