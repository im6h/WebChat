<template>
	<div class="page login">
		<section class="section section__landing">
			<div class="section__heading">
				<span class="section__title">Register Here</span>
			</div>
			<div class="section__content">
				<p class="section__lead">We hope you will enjoy our application!</p>
				<div class="social"></div>
				<form @submit.prevent="handleSubmit" class="form">
					<div class="form__input-group">
						<input
							type="text"
							name="username"
							class="form__control"
							placeholder="Enter Username"
							required
							v-model="user.username"
						/>
						<label for="username" class="form__label">Username</label>
					</div>
					<div class="form__input-group">
						<input
							type="text"
							name="fullName"
							class="form__control"
							placeholder="Enter FullName"
							required
							v-model="user.fullName"
						/>
						<label for="fullName" class="form__label">FullName</label>
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
						<span>Already have an account?</span>
						<router-link to="/login" class="form__link btn btn--rounded">Login</router-link>
					</div>
					<Error :errors="errors" />
					<button type="submit" class="form__submit">Register</button>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import Error from '../error/Error.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
	name: 'register',
	components: {
		Error,
	},
	props: ['message'],
	data: function() {
		return {
			user: {
				username: '',
				fullName: '',
				password: '',
			},
			errorMessage: this.message,
			errors: [],
		};
	},
	methods: {
		...mapActions(['saveUserData', 'toggleAuthState']),
		handleSubmit() {
			this.errors = [];
			let config = {
				method: 'post',
				url: '/v1/user/logon',
				data: this.user,
			};
			if (this.user.username && this.user.fullName && this.user.password) {
				axios(config)
					.then(res => {
						if (res.status === 200) {
							this.$router.push({
								name: 'Login',
							});
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