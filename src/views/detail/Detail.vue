<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images ='topImages' />
    <detail-base-info :goods = "goods"/>
    <!-- <div v-for ="index in 10"> {{index}} </div> -->
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'

import {getDetail,Goods} from 'network/detail'


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    Goods,
    DetailBaseInfo
   
  },
  data() {
    return{
      iid: null,
      topImages:[],
      goods:{}
    }
  },
  created(){
    //保存传入的iid
    this.iid =this.$route.params.iid

    //2根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      //获取顶部图片轮播数据
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      //2获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    })
  }
}
</script>

<style>

</style>