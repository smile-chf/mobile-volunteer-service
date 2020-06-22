<template>
  <div class="questionnairesurvey" >
    <van-tabs v-model="active" color="#F54133" title-active-color="#F54133">
  <van-tab title="全部">
      <div class="body">
        <div class="item" @click="gonextpage(1)">
           <div class="itemtop">海恒社区居民需求意见征集问卷</div>
           <div class="itembottom">
               <div>2020-03-02  10:00~11:00</div>
               <div>未开始</div>
           </div>
        </div>
        <div class="item">
           <div class="itemtop">海恒社区居民需求意见征集问卷</div>
           <div class="itembottom">
               <div>2020-03-02  10:00~11:00</div>
               <div>未开始</div>
           </div>
        </div>
        <div class="item">
           <div class="itemtop">海恒社区居民需求意见征集问卷</div>
           <div class="itembottom">
               <div>2020-03-02  10:00~11:00</div>
               <div>未开始</div>
           </div>
        </div>
      </div>
  </van-tab>
  <van-tab title="未开始">内容 2</van-tab>
  <van-tab title="进行中">内容 3</van-tab>
  <van-tab title="我参与的">内容 4</van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
 data() {
     return {
         active:""
     }
 },
 methods: {
     gonextpage(id){
      this.$router.push({path:"/questdetail",query:{id}})
     }
 },
}
</script>

<style lang="less" scoped>
.body{
    padding: 0 0.8rem;
    box-sizing: border-box;
}
.item{
    height: 4.1rem;
    border-bottom: 1px solid #f6f6f6;
    .itemtop{
        height: 2.4rem;
        line-height: 2.4rem;
        font-size: 0.75rem;
        font-weight:400;;
    }
    .itembottom{
        display: flex;
        align-items: center;
        width: 100%;
        div:nth-child(1){
            width: 60%;
            color: #8E8E93;
            font-size: 0.65rem;
            
        }
        div:nth-child(2){
            width: 40%;
            color: #FF6F10;
            font-size: 0.7rem;
            text-align: right;
        }
    }
}
</style>