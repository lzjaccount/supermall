export default {
    addCart(context, good) {
        return new Promise((resolve, reject) => {
            const oldgood = context.state.goods.find(item => item.iid == good.iid)
            if (oldgood) {
                context.commit('addCount', oldgood)
                resolve('商品数量加1')
            } else {
                good.count = 1
                good.checked = true
                context.commit('addToCart', good)
                resolve('商品以加入购物车')
            }
        })
    }
}