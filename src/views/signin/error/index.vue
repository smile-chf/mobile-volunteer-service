<template>
  <div>
    <div class="box">{{errorinfo}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorinfo: ""
    };
  },

  mounted() {
    let i = this.$route.query.errorCode;
    if (i == 1) {
      this.errorinfo = "您还未接收该活动";
    }
    if (i == 2) {
      this.errorinfo = "您已签到";
    }
    if (i == 3) {
      this.errorinfo = "您已请假";
    }
    if (i == 4) {
      this.errorinfo = "其他错误";
    }
  }
};
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    height: 100vh;
    text-align: center;
    line-height: 60vh;
    font-size: 1.2rem;
    font-weight:700;
}
</style>