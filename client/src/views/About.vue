<template>
    <div class="page home">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">About Astro Chat</span>
            </div>
            <div class="section__content">
                <p
                        class="section__lead"
                >Created to allow real time communication between users in groups via multiple rooms</p>
                <div class="section__graphic">
                    <img src="../assets/img/undraw_programmer_imem.svg" alt/>
                </div>
                <span class="heading-lg center">Features</span>
                <div class="features">
                    <div class="features__item">
                        <span>
                            <a href="https://expressjs.com/" class="btn btn--info">Express</a> as the web framework on the server
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            <a href="https://vuejs.org/" class="btn btn--success">Vue JS</a> is used as the frontend framework
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "../components/layout/Footer";
	export default {
		name: 'About',
		props: [],
        components: {
            Footer
        },
		mounted() {
		},
	};
</script>

<style lang="scss" scoped>
    @import '../assets/scss/components/feature.scss';
</style>
