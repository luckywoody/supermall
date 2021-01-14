<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    getDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 500, 1200, 1500],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //1.获取顶部图片轮播图
      const data = res.result;
      // console.log(res);
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //4.创建商品展示图片
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      //  console.log(res);
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      // console.log('++++');
      this.newRefresh();

      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 150);
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;
      length = this.themeTopYs.length;
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          //hack做法 空间换时间
          console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        //普通做法
        /*  if(this.currentIndex !==i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this. themeTopYs[i+1]) 
       || (i === length - 1 && positionY>= this.themeTopYs[i]))){
         this.currentIndex = i;
         console.log(this.currentIndex);
         this.$refs.nav.currentIndex = this.currentIndex
       } */
      }

      //3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      //.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.desc = this.goods.desc;
      product.iid = this.iid;
      //2.将商品添加到购物车里
      // this.$store.commit('addCart', product)
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show();
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>