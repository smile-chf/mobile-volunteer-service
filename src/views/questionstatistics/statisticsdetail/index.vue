<template>
  <div class="statisticsdetail">
    <div class="top">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="ckecktype" />
      </van-dropdown-menu>
      <div class="number">调查人数：100人</div>
    </div>
    <!-- 性别 -->
    <div class="bottom">
      <div class="item">
        <div class="itemtitle">
          <div class="line"></div>
          <div class="itemtitletext">您的性别是</div>
        </div>
        <div class="itembody">
          <div class="itembodylist">
            <div>男</div>
            <div>20人</div>
          </div>
          <div class="itembodylist">
            <div>女</div>
            <div>20人</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 学历 -->
    <div class="bottom">
      <div class="item">
        <div class="itemtitle">
          <div class="line"></div>
          <div class="itemtitletext">您的学历是</div>
        </div>
        <div class="itembody">
          <div class="itembodylist">
            <div>初中</div>
            <div>20人</div>
          </div>
          <div class="itembodylist">
            <div>高中/中专</div>
            <div>20人</div>
          </div>
          <div class="itembodylist">
            <div>大专/本科</div>
            <div>20人</div>
          </div>
          <div class="itembodylist">
            <div>硕士及以上</div>
            <div>20人</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      option1: [
        { text: "测试1", value: 0 },
        { text: "测试2", value: 1 },
        { text: "测试3", value: 2 }
      ]
    };
  },
  methods: {
    ckecktype(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
top {
  position: relative;
}
.number {
  position: absolute;
  top: 0;
  right: 1rem;
  height: 2rem;
  line-height: 2rem;
  color: #909095;
  z-index: 100000;
  font-size: 0.75rem;
}
.bottom {
  width: 100%;
  // padding: 0 0.8rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.item {
  padding: 0 0.8rem;
  box-sizing: border-box;
}
.itemtitle {
  display: flex;
  width: 100%;
  height: 2.25rem;
  padding-top: 0.6rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  .itemtitletext {
    text-indent: 0.7rem;
    //  border-left: 2px solid #FF6F10;
    font-size: 0.75rem;
    color: #333333;
  }
}
.line {
  width: 2px;
  height: 44%;
  background-color: #ff6f10;
  margin-top: 0.18rem;
}
.itembodylist {
  width: 100%;
  height: 2.25rem;
  border-top: 1px solid #f6f6f6;
  display: flex;
  padding: 0 0.5rem;
  box-sizing: border-box;
  div {
    flex: 1;
    font-size: 0.75rem;
    line-height: 2.25rem;
  }
  div:nth-child(1) {
    color: #8e8e93;
    text-align: left;
  }
  div:nth-child(2) {
    text-align: right;
  }
}
</style>
<style lang="less">
.statisticsdetail {
  min-height: 100vh;
  background-color: #f6f6f6;
  .van-dropdown-menu__bar {
    width: 100%;
    box-shadow: none;
    height: 2rem;
    background-color: #f6f6f6;
  }
  .van-dropdown-menu__title--active {
    color: #ff6f10;
    padding: 0 0.8rem;
  }
  .van-dropdown-menu__title {
    padding: 0 0.8rem;
    color: #333333;
  }
  .van-dropdown-item__option--active {
    color: #ff6f10;
  }
  .van-dropdown-item__option--active .van-dropdown-item__icon {
    color: #ff6f10;
  }
  .van-dropdown-menu__item {
    justify-content: left;
  }

  .van-dropdown-menu__title::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent #333333 #333333;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #333333;
    border-left-color: #333333;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: 0.8;
    content: "";
  }
}
</style>