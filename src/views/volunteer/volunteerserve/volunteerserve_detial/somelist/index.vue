<template>
  <div>
    <div class="unit" v-for="(item, index) in datalist" :key="index">
      <div class="left">
        <img :src="item.headimg" alt />

        <p>{{item.username}}</p>
      </div>
       <!-- 签到时间 -->
      <p v-if="status==1" class="right">{{ $d(item.signInDate).format('YYYY/MM/DD HH:mm:ss')  }}</p>
      <!-- 其他状态时间 -->
      <p  v-else class="right">{{$d(item.createDate).format('YYYY/MM/DD HH:mm:ss')}}</p>
     
    </div>
  </div>
</template>
<script>
import { getActivityMemberDetails } from "@/api/http";
export default {
  data() {
    return {
      id: "",
      status: "",
      name: "张晓",
      datalist: []
    };
  },

  methods: {},
  async mounted() {
    this.id = this.$route.query.id;
    this.status = this.$route.query.status;
    let res = await getActivityMemberDetails(this.id, this.status);
    this.datalist = res.details.data;
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
  margin-right: 0.5rem;
}
.unit .right {
  color: #8e8e93;
}
</style>
