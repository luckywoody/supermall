<template>
  <div class="list-item">
    <div class="button-check" >
      <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
  </div>
  <div class="photo">
      <img :src="product.image" alt="">
  </div>
  <div class="right">
      <div class="title">{{product.title}}</div>
      <div class="desc-text">商品描述:{{product.desc}}</div>
  <div class="bottom">
        <div class="price">¥{{product.price}}</div>
        <div>×{{product.count}}</div>
        <div class="delete">删除</div>
    </div>
  </div>
</div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name:'CartListItem', 
  components:{
    CheckButton
  },
  props:{
    product:{
      type:Object,
      default() {
        return {}
      } 
    }
  },
  methods:{
    checkClick() {
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<style scoped>
   .list-item{
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .button-check{
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photo{
    padding: 5px;
  }
  .photo img{
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }
  .right {
    font-size: 17px;
    color: #333;
    padding: 8px 10px;
    position: relative;
    overflow: hidden;
  }
  .title, .desc-text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .right .desc-text {
    font-size: 14px;
    color: #666;
    margin-top: 12px;
  }
  .bottom {
    position: absolute;
    bottom: 5px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
  }

  .bottom .price {
    color: orangered;
  }
  .delete{
    background-color: darkgray;
    border-radius: 20%;
  }
</style>