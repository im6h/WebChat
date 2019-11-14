<template>
    <div id="app">
        <Navbar></Navbar>
        <transition
                :name="transitionName"
                :enter-active-class="enterActive"
                :leave-active-class="leaveActive"
                mode="out-in"
        >
            <router-view/>
        </transition>
    </div>
</template>
<script>
	import { mapActions } from 'vuex';
	import Navbar from './components/layout/Navbar.vue';

	const DEFAULT_TRANSITION = 'fade';
	const DEFAULT_ENTER_ACTIVE_CLASS = 'animated fadeIn';
	const DEFAULT_LEAVE_ACTIVE_CLASS = 'animated fadeOut';
	export default {
		name: 'App',
		components: {
            Navbar

		},
		data: function() {
			return {
				transitionName: DEFAULT_TRANSITION,
				leaveActive: DEFAULT_LEAVE_ACTIVE_CLASS,
				enterActive: DEFAULT_ENTER_ACTIVE_CLASS,
			};
		},
		methods: {
			resetTransition() {
				this.transitionName = DEFAULT_TRANSITION;
				this.enterActive = DEFAULT_ENTER_ACTIVE_CLASS;
				this.leaveActive = DEFAULT_LEAVE_ACTIVE_CLASS;
			},
		},
		created: function() {

		},
	};
</script>
<style lang="scss">
    @import "assets/scss/base/app.scss";
</style>
