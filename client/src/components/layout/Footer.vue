<template functional>
    <footer class="footer section__footer">
        <div class="footer__content">
            <div class="footer__left">
                <span>Copyright &copy; 2019 by Vu Hai Dang</span>
            </div>
            <div class="footer__right">
                <span>Created under the MIT License</span>
                <a
                        href="https://github.com/tjjone98/webchat"
                        target="_blank"
                        class="nav__link"
                >
                    <img style="height: 25px;width: 25px;color: white" class="footer__icon" src="https://img.icons8.com/clouds/100/000000/github.png">
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
	export default {
		name: 'Footer'
	};
</script>

<style lang="scss">
    @import '../../assets/scss/components/footer.scss';
</style>
