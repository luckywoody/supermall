<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { PullUpLoad } from 'better-scroll'

export default {
  name: 'Scroll',
  props:{
    probeType:{
      type : Number,
      default :0
    },
    pullUpLoad: {
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动位置
      if(this.probeType ===2 || this.probeType ===3 ){
        this.scroll.on('scroll', (position) =>{
       this.$emit('scroll',position)
       })
     }

    
    //3监听滚到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }

    
     
    //3 监听上拉事件
  }, 
  methods: {
    scrollTo(x,y,time=300){
     this.scroll && this.scroll.scrollTo(x,y,time )
    },
    finishPullUp() {
       this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      console.log('加载次数');
     this.scroll && this.scroll.refresh()
     
    }
  },
 
}
</script>

<style>

</style>