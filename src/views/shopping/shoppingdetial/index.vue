<template>
  <div class="shoppingdetial">
    <div class="topimg">
      <img src="../../../img/home/cdb.png" alt srcset />
    </div>
    <div class="number">
      <div>300</div>
      <div>积分</div>
      <div>库存1件</div>
      <div>已兑换7人</div>
    </div>
    <div class="title">
      小米移动电源小米移动电源小米移动电源小米移动电小米移动电源小米移动电源小米移动电源小米移动电小米移动电源小米移动电源小米移动电源小米移动电小米移动电源小米移动电源小米移动电源小米移动电
      源小米移动电源
    </div>
    <div class="detail">
      <p>商品介绍</p>
      <div>
        （5000mAh）（银色） 聚合物电芯 金属外壳 轻薄便携
        （仅限锦绣社区辖区居民兑换）
      </div>
    </div>
    <div class="foot">
      <p @click="gositepage">立即兑换</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: ""
    };
  },
  methods: {
      gositepage(){
          this.$router.push({path:"/sitepage"})
      }
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
  }
};
</script>

<style lang="less" scoped>
.topimg {
  width: 100%;
  height: 11.3rem;
  margin-bottom: 0.4rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.number {
  padding: 0 0.8rem;
  height: 2.15rem;
  display: flex;
  align-items: center;
  div:nth-child(1) {
    font-size: 1.2rem;
    color: #ff6f10;
    line-height: 2.15rem;
    margin-right: 0.2rem;
  }
  div:nth-child(2) {
    font-size: 0.5rem;
    color: #ff6f10;
    line-height: 2.15rem;
    margin-right: 0.4rem;
  }
  div:nth-child(3) {
    height: 0.75rem;
    min-width: 2.5rem;
    box-sizing: border-box;
    padding: 0 0.2rem;
    line-height: 0.75rem;
    font-size: 0.5rem;
    background-color: #f5f5f5;
    border: 1px solid #c7c7cc;
    color: #8e8e93;
  }
  div:nth-child(4) {
    flex: 1;
    text-align: right;
    color: #c7c7cc;
    font-size: 0.5rem;
  }
}
.title {
  width: 100%;
  height: 1.9rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  font-size: 0.75rem;

  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0.8rem;
}
.detail{
 padding: 0 0.8rem;
 box-sizing: border-box;
 color: #8E8E93;
 font-size: 0.7rem;
 line-height: 20px;
 div{
     text-indent: 0.5rem;
 }
}
</style>