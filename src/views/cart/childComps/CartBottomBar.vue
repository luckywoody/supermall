<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
      :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click='calcClick'>
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'

export default {
  name:'CartBottomBar',
  components: { 
    CheckButton 
    },
  computed:{
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) =>{
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkedLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length ===0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick() {
       if(this.isSelectAll) { //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
       } else{//部分或者全部不选中
         this.$store.state.cartList.forEach(item => item.checked = true)
       }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width:60px
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right:5px
  }

  .price {
    margin-left: 20px;
    flex:1
  }

  .calculate {
    width: 90px;
    background-color: red;
    color:#fff;
    text-align: center;
  }
</style>