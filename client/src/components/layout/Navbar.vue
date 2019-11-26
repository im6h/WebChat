<template>
    <header>
        <nav class="nav gin-nav" v-if="!isAuthorized">
            <div class="navbar__brand">
                <router-link to="/" class="navbar__textbrand">Astro Chat</router-link>
            </div>
            <ul class="navbar__nav">
                <li class="nav__item">
                    <router-link to="/" class="nav__link">Home</router-link>
                </li>
                <li class="nav__item">
                    <router-link to="/about" class="nav__link">About</router-link>
                </li>
            </ul>
            <ul class="navbar__nav navbar__nav--right">
                <li class="nav__item">
                    <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
                </li>
                <li class="nav__item">
                    <router-link to="/register" class="nav__link nav__link--rounded">Sign Up</router-link>
                </li>
            </ul>
        </nav>
        <nav class="nav" v-else>
            <div class="navbar__brand">
                <router-link to="/" class="navbar__textbrand">Astro Chat</router-link>
            </div>
            <ul class="navbar__nav">
                <li class="nav__item">
                    <router-link to="/chat" class="nav__link">Chat</router-link>
                </li>
            </ul>
            <ul class="navbar__nav navbar__nav--right">
                <li class="nav__item">
                    <router-link :to="{name:'UserProfile',params:{handle:getUserData.username}}"
                                 class="nav__link nav__link--rounded">{{getUserData.username}}
                    </router-link>
                </li>
                <li class="nav__item">
                    <button @click.prevent="logout" class="nav__link nav__link--rounded nav__link--btn">Logout</button>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import axios from 'axios';

    export default {
        name: 'Navbar',
        data: function () {
            return {
                navToggleState: false,
            };
        },
        computed: {
            ...mapGetters(['getUserData', 'isAuthorized']),
            getCurrentUser: function () {
                if (!this.isAuthorized) {
                    let config = {
                        method: 'get',
                        url: '/v1/user/current',
                    };
                    axios(config)
                        .then(res => {
                            if (res.status === 200) {
                                this.$store.dispatch('toggleAuthState', true);
                                this.$store.dispatch('saveUserData', res.data);
                            }
                        }).catch(err => {
						    if (err.response.status === 401){
                            }
                    });
                }
            },
        },
        methods: {
            ...mapActions(['toggleAuthState']),
            logout() {
                let config = {
                    method: 'get',
                    url: '/v1/user/logout',
                };
                axios(config)
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.clear();
                            this.$store.dispatch('toggleAuthState', false);
                            this.$router.push({
                                name: 'Login',
                            });
                        }
                    }).catch(err => err);
            },
        },
        created() {
            this.getCurrentUser;
        },
    };
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/components/navbar";
</style>
