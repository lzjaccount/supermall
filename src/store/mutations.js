export default {
    addCount(state, payload) {
        payload.count += 1
    },
    addToCart(state, payload) {
        state.goods.push(payload)
    },
    changeAllCheck(state, payload) {
        state.isAllCheck = payload
    },
    changeCheck(state, payload) {
        state.goods.forEach((item) => {
            item.checked = payload;
        });
    }
}