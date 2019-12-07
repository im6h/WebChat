<template>
    <div class="page login">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">Sign In</span>
            </div>
            <div class="section__content">
                <Error :errorMessage="errorMessage"/>
                <p class="section__lead">Welcome Back!</p>
                <div class="social"></div>
                <form @submit.prevent="handleSubmit" class="form">
                    <div class="form__input-group">
                        <input
                                type="text"
                                name="username"
                                class="form__control"
                                placeholder="Enter username"
                                required
                                v-model="user.username"
                        />
                        <label for="username" class="form__label">Username</label>
                    </div>
                    <div class="form__input-group">
                        <input
                                type="password"
                                name="password"
                                class="form__control"
                                placeholder="Enter Password"
                                pattern=".{5,15}"
                                title="Password must be between 5 and 15 characters"
                                required
                                v-model="user.password"
                        />
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__info-group">
                        <span>Don't have an account?</span>
                        <router-link to="/register" class="form__link btn btn--rounded">Register</router-link>
                    </div>
                    <Error :errors="errors"/>
                    <button type="submit" class="form__submit">Login</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';
	import Error from '../error/Error.vue';
	import { mapActions } from 'vuex';
	import { registerToken } from '../../fcm';

	export default {
		name: 'login',
		props: ['message'],
		components: {
			Error,
		},
		data: function() {
			return {
				user: {
					username: '',
					password: '',
				},
				errorMessage: this.message,
				errors: [],
			};
		},
		methods: {
			...mapActions(['saveUserData']),
			handleSubmit() {
				this.error = [];
				let config = {
					method: 'post',
					url: '/v1/user/login',
					data: this.user,
				};
				if (this.user.username && this.user.password) {
					axios(config)
						.then(res => {
							if (res.status === 200) {
								this.$store.dispatch('toggleAuthState', true);
								this.$store.dispatch('saveUserData', res.data);
								this.$router.push({
									name: 'Chat',
								});
								registerToken();
							}
						})
						.catch(err => {
							if (err.response.status === 403) {
								alert('Username or password is invalid');
							}
						});
				}
			},
		},
	};
</script>

<style scoped lang="scss">
    @import '../../assets/scss/components/form.scss';
</style>
