<template>
  <div class="button" :class="{'button-active':isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked: {
        type: Boolean,
        default: false
      },
      index:Number
    },
    methods:{
 
    }
  }
</script>

<style scoped>
  .button {
    position: relative;
    margin: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .button img {
    width: 100%;
    height: 100%;
  }
  .button-active {
    background-color: #ff3c5f;
    border-color: #ff3c5f;
  }
</style>
