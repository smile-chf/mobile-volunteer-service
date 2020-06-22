<template>
  <div>
    <div class="itemstyle">已签到人员 ({{yd}})</div>
    <div class="unit" v-for="(item, index) in data.punchList">
      <div class="left">
        <img :src="item.headimg" alt />
        <p>{{item.username}}</p>
      </div>

    </div>
    <div class="itemstyle">未签到人员 ({{wd}})</div>
    <div class="unit" v-for="(item, index) in data.notPunchList ">
      <div class="left">
          <img :src="item.headimg" alt />
        <p>{{item.username}}</p>
      </div>
      
    </div>
    <div class="itemstyle">请假人员 ({{qj}})</div>
    <div class="unit" v-for="(item, index) in data.leaveList">
      <div class="left">
          <img :src="item.headimg" alt />
        <p>{{item.username}}</p>
      </div>
   
    </div>
  </div>
</template>
<script>
 import {getPunchInDetails} from "../../../api/http.js"
export default {
  data() {
    return {
      id: "",
      name: "张晓",
      data: {},
      yd: "",
      wd: "",
      qj: ""
    };
  },

  methods: {},
  async mounted() {
    this.id = this.$route.query.id;
      let res  = await  getPunchInDetails(this.id)
    
    this.data = res.details.data;
    this.qj = this.data.leaveList.length;
    this.wd = this.data.notPunchList.length;
    this.yd = this.data.punchList.length;
  }
};
</script>
<style scoped>
.unit {
  width: 100%;
  height: 3.2rem;
  box-sizing: border-box;
  padding: 0.6rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
  font-size: 0.65rem;
}
.unit .left {
  display: flex;
  align-items: center;
}
.unit .left img {
  width: 2rem;
  height: 2rem;
  color: #333333;
  margin:0  1rem;
}
.unit .right {
  color: #8e8e93;
}
</style>
<style lang="less" scoped>
.itemstyle {
  width: 100%;
  height: 2rem;
  background-color: #f6f6f6;
  line-height: 2rem;
  padding: 0 1rem;
  box-sizing: border-box;
}
</style>
