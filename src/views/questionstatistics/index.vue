<template>
  <div class="questionstatistics">
    <van-search v-model="searchdata" shape="round" @search="dosearch"  input-align="center" placeholder="请输入搜索关键词" />
    <van-tabs v-model="active" color="#F54133" title-active-color="#F54133">
      <van-tab title="全部">
        <div class="body">
          <div class="item" @click="gonextpage(1)">
            <div class="itemtop">海恒社区居民需求意见征集问卷</div>
            <div class="itembottom">
              <div>2020-03-02 10:00~11:00</div>
              <div>未开始</div>
            </div>
          </div>
          <div class="item">
            <div class="itemtop">海恒社区居民需求意见征集问卷</div>
            <div class="itembottom">
              <div>2020-03-02 10:00~11:00</div>
              <div>未开始</div>
            </div>
          </div>
          <div class="item">
            <div class="itemtop">海恒社区居民需求意见征集问卷</div>
            <div class="itembottom">
              <div>2020-03-02 10:00~11:00</div>
              <div>未开始</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="进行中">内容 3</van-tab>
      <van-tab title="已结束">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
        identifying:"",
      active: "",
      searchdata:""
    };
  },
  methods: {
    gonextpage(id) {
      this.$router.push({ path: "/statisticsdetail", query: { id } });
    },
    dosearch(val){
         console.log(val);
         
    }
  },
  created() {
      //identifying为0是问卷统计 为1是志愿统计
     this.identifying= this.$route.query.identifying
  },
};
</script>

<style lang="less" scoped>
.body {
  padding: 0 0.8rem;
  box-sizing: border-box;
}
.item {
  height: 4.1rem;
  border-bottom: 1px solid #f6f6f6;
  .itemtop {
    height: 2.4rem;
    line-height: 2.4rem;
    font-size: 0.75rem;
    font-weight: 400;
  }
  .itembottom {
    display: flex;
    align-items: center;
    width: 100%;
    div:nth-child(1) {
      width: 60%;
      color: #8e8e93;
      font-size: 0.65rem;
    }
    div:nth-child(2) {
      width: 40%;
      color: #ff6f10;
      font-size: 0.7rem;
      text-align: right;
    }
  }
}
</style>