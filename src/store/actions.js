

export default {
   //payload新添加的商品
      /* let oldProduct = null;
      for(let item of state.cartList){
        if(item.iid === oldProduct.iid) {
          oldProduct = item
        }
      } */
      //1.查找数组中是否有该商品
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(function(item){
        return item.iid ===payload.iid
     })
     //2.判断oldProduct
      if(oldProduct){
       // oldProduct.count += 1
      context.commit('addCounter', oldProduct)
      resolve('当前商品数量+1')
    } else {
     payload.count = 1
     // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
     }
    })
  }
}