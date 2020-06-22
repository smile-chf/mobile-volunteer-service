<template>
  <div class="intdetail">
    <div class="item" v-for="(item, index) in datalist" :key="index">
      <div class="itemleft">
        <div class="texttop">{{item.name}}</div>
        <div class="textbottom">{{$d(item.complete_time).format("YYYY/MM/DD   hh:mm:ss")}}</div>
      </div>
      <div class="itemright">{{item.integral}}积分</div>
    </div>
    <!-- <div class="item">
      <div class="itemleft">
        <div class="texttop">完成XXX需求</div>
        <div class="textbottom">2020/04/12  11:15</div>
      </div>
      <div class="itemright">20积分</div>
    </div> -->
    <!-- <div class="item">
      <div class="itemleft">
        <div class="texttop">完成XXX需求</div>
        <div class="textbottom">2020/04/12  11:15</div>
      </div>
      <div class="itemright">20积分</div>
    </div> -->
    <!-- <div class="item">
      <div class="itemleft">
        <div class="texttop">完成XXX需求</div>
        <div class="textbottom">2020/04/12  11:15</div>
      </div>
      <div class="itemright">20积分</div>
    </div> -->
  </div>
</template>

<script>
import {integralDetail} from '../../../api/http'
export default {
  data() {
    return {
      id: "",
      datalist:[]
    };
  },
 async mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    let res = await integralDetail (this.id )
    this.datalist=res.details.data
  }
};
</script>

<style lang="less" scoped>
.intdetail{
    padding:  0 0.8rem;
    box-sizing: border-box;
}
 .item{
     display: flex;
     width: 100%;
     height: 3.7rem;
     border-bottom: 1px solid #f6f6f6;
     .itemleft{
     width: 50%;
     height: 100%;
    .texttop{
        height: 50%;
        line-height: 3rem;
        font-size: 0.75rem;
        font-weight:400;
    }
    .textbottom{
        height: 50%;
        color: #8E8E93;
        font-size: 0.65rem;
        line-height: 1.4rem;
    }
     }
     .itemright{
    width: 50%;
    height: 100%;
    line-height: 3.7rem;
    text-align: right;
    font-size: 0.85rem;
    color: #FF6F10;
     }
 }
</style>