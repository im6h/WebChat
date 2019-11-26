<template>
    <div class="page profile">
        <section class="section section--profile mt-6 profile__content">
            <div class="section__heading mt-6 mb-3">
                <span class="section__title">Dashboard</span>
            </div>
            <div class="section__content">
                <div class="infobox__container" v-if="user">
                    <span class="lead">Your current profile</span>
                    <div class="infobox__item">
                        <img :src="user.image" alt class="profile__image">
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Username</span>
                        <span class="infobox__item--right">{{ user.username }}</span>
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Fullname</span>
                        <span class="infobox__item--right">{{ user.fullName }}</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';
	import { mapActions, mapGetters } from 'vuex';
	import NotFound from '../error/NotFound';

	export default {
		name: 'UserProfile',
		data: function() {
			return {
				user: null,
			};
		},
		computed: {
			...mapGetters([
				'getUserData',
				'isAuthorized',
			]),

		},
		methods: {
			...mapActions([
				'saveUserData',
				'toggleAuthState',
			]),
		},
		created() {
			let config = {
				method: 'get',
				url: '/v1/user/current',
			};
			axios(config)
				.then(res => {
						this.$store.dispatch('toggleAuthState', true);
						this.$store.dispatch('saveUserData', res.data);
						this.user = res.data;
					},
				);
		},
	};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/components/infobox.scss";
    @import "../../assets/scss/views/profile.scss";
</style>