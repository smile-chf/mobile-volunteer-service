<template>
  <div class="shopping">
    <van-search
      v-model="searchdata"
      shape="round"
      input-align="center"
      @search="onSearch"
      placeholder="请输入搜索关键词"
    />
    <van-tabs v-model="active" color="#F54133" title-active-color="#F54133">
      <van-tab title="全部">
        <div class="tabbody">
          <div class="item" @click="godetialpage(1)">
            <img src="../../img/home/cdb.png" alt srcset />
            <p>
              小米移动电源小米
              移动电源
            </p>
            <div class="inventorystyle">库存10件</div>
            <div class="lastinf">
               <div>300</div>
               <div>积分</div>
               <div>已兑换50人</div>
            </div>
          </div>
          <div class="item">
            <img src="../../img/home/cdb.png" alt srcset />
            <p>
              小米移动电源小米
              移动电源
            </p>
            <div class="inventorystyle">库存10件</div>
            <div class="lastinf">
               <div>300</div>
               <div>积分</div>
               <div>已兑换50人</div>
            </div>
          </div>
          <div class="item">
            <img src="../../img/home/cdb.png" alt srcset />
            <p>
              小米移动电源小米
              移动电源
            </p>
            <div class="inventorystyle">库存10件</div>
            <div class="lastinf">
               <div>300</div>
               <div>积分</div>
               <div>已兑换50人</div>
            </div>
          </div>
          <div class="item">
            <img src="../../img/home/cdb.png" alt srcset />
            <p>
              小米移动电源小米
              移动电源
            </p>
            <div class="inventorystyle">库存10件</div>
            <div class="lastinf">
               <div>300</div>
               <div>积分</div>
               <div>已兑换50人</div>
            </div>
          </div>
        
        </div>
      </van-tab>
      <van-tab title="销量">内容 2</van-tab>
      <van-tab title="积分">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchdata: "",
      active: 0
    };
  },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    godetialpage(id){
      this.$router.push({path:"/shoppingdetial",query:{id}})
    }
  }
};
</script>

<style lang="less" scoped>
.tabbody {
  padding: 0 0.8rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 5.6rem;
    height: 9rem;
    // background-color: red;
    margin: 0.8rem 0 0.4rem 0;
    img {
      width: 100%;
      height: 5.3rem;
    }
    p{font-weight:500;
        font-size: 0.65rem;
        line-height: 0.65rem;
        color: #333333;
        font-weight:500;
       margin-bottom: 0.15rem;
        overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }
  }
  .inventorystyle{
      width: 3rem;
      height: 0.75rem;
      border: 1px solid #C7C7CC;
      background-color:#f5f5f5;
      color:  #929297;
      line-height: 0.75rem;
      font-size: 10px;
      margin-bottom: 0.02rem;
      text-align: center;
  }
  .lastinf{
      width: 100%;
      height: 1rem;
      display: flex;
      overflow: hidden;
   div:nth-child(1){
       line-height: 1rem;
       font-size:17px;
       color: #FF6F10;
       flex: 1;
   }
   div:nth-child(2){
       font-size: 10px;
       line-height: 1rem;
       color: #FF6F10;
       flex:1;
       text-align: center;
   }
   div:nth-child(3){
       font-size: 10px;
        line-height: 1rem;
        color: #C7C7CC;
        flex: 2;
        text-align: right;
   }
  }
}
</style>
