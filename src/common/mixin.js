import BackTop from "components/content/backTop/BackTop";
export const backTop = {
    components: {
        BackTop
    },
    data() {
        return {
            isShow: ture,
        }
    },
    methods: {
        backclick() {
            //返回顶部
            this.$refs.scroll.scrollTo(0, 0);
        }
    }
}