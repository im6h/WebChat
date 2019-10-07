<template>
    <div class="page home">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">Think different</span>
                <p class="heading-lg center">Chat with your friend every times</p>
            </div>
            <div class="section__content">
                <div class="section__graphic">
                    <img src="../assets/img/undraw_group_chat_v059.svg" alt/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

	export default {
		name: 'home',
		components: {
		},
	};
</script>

<style scoped lang="scss">
    @import '../assets/scss/components/feature.scss';
</style>