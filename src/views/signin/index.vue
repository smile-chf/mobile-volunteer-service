<template>
  <div class="opinioncollection">
    <div class="switch">
      <p :class="isswitch?'active ':''" @click="showisswitch(0)">待签到</p>
      <p :class="isswitch?'':'active'" @click="showisswitch(1)">已结束</p>
    </div>
    <!-- 未参与 -->
    <div class="main" v-if="isswitch">
      <div
        class="unit"
        @click="nextpageno(item.id,0,item.status)"
        v-for="(item, index) in nodatalist"
        :key="index"
      >
        <p class="p1">{{item.title}}</p>
        <div class="p2">
          <div>{{ $d(item.start_date).format('YYYY-MM-DD HH:mm:ss')}}</div>
          <div></div>
          <div></div>
          <div v-if="item.status=='0'">未签到</div>
          <div v-if="item.status=='1'" style="color:#8e8e93">已签到</div>
        </div>
      </div>
    </div>
    <!-- 已参与 -->
    <div class="main" v-if="!isswitch">
      <div
        class="unit"
        @click="nextpageno(item.id,1,item.status)"
        v-for="(item, index) in nodatalist"
        :key="index"
      >
        <p class="p1">{{item.title}}</p>
        <div class="p2">
          <div>{{ $d(item.start_date).format('YYYY-MM-DD HH:mm:ss')}} </div>
          <div></div>
          <div></div>
          <div v-if="item.status=='0'">未签到</div>
          <div v-if="item.status=='1'" style="color:#8e8e93">已签到</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMyPublishActivityList } from "../../api/http";
export default {
  data() {
    return {
      isswitch: true,
      showsome: false,
      message: "",
      state: 0,
      nodatalist: []
    };
  },
  methods: {
    showisswitch(state) {
      if (state == 0) {
        this.state = state;
        this.quickSignInvue(state);

        this.isswitch = true;
      }
      if (state == 1) {
        this.state = state;
        this.quickSignInvue(state);
        this.isswitch = false;
      }
    },

    cleardata() {
      this.message = "";
    },

    nextpageno(id, status,d) {
        console.log(status);
      if (status == 1) {
          this.$router.push({path:'/signin_list',query:{id,status:d}})
      } else {
         this.$router.push({path:'/signin_det',query:{id,status:d}})
      }
    },
    async quickSignInvue(state) {
   
        let res = await getMyPublishActivityList(state);

        this.nodatalist = res.details.data;
        console.log(this.nodatalist);
        
    }
  },
  mounted() {
    this.showisswitch(this.state);
  }
};
</script>




<style lang="less" scoped>
.switch {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
}

.switch p {
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 2rem;
  font-size: 0.75rem;
  //   color: #333333;
  position: relative;
}

.switch .active:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1rem;
  background: #f54133;
}

.main {
  padding-top: 2rem;
}

.main .unit {
  display: block;
  height: 3.9rem;
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  padding: 0.8rem 0;
}

.main .unit .p1 {
  width: 100%;
  box-sizing: border-box;
  padding-left: 0.8rem;
  padding-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  color: #333333;
}

.main .unit .p2 {
  padding: 0 0.8rem;
  margin-top: 0.3rem;
  font-size: 0.65rem;
  color: #8e8e93;
  display: flex;
  div {
    font-size: 0.65rem;
    color: #8e8e93;
  }

  div:nth-child(1) {
    width: 10rem;
  }
  div:nth-child(2) {
    // width: 1.2rem;
    text-align: center;
  }
  div:nth-child(3) {
    // width: 2.05rem;
  }
  div:nth-child(4) {
    flex: 1;
    color: #f54133;
    text-align: right;
  }
}

.add {
  width: 3.9rem;
  height: 3.9rem;
  position: fixed;
  bottom: 11%;
  right: 3%;
}

.add img {
  width: 100%;
  height: 100%;
}

.tctop {
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #f6f6f6;
  padding: 0.7rem 0.8rem;
  box-sizing: border-box;
  display: flex;

  .tcclear {
    font-size: 0.75rem;
    width: 1.8rem;
    height: 1.3rem;
    line-height: 1.3rem;
  }
  .tctitle {
    flex: 1;
    font-size: 0.85rem;
    font-weight: 400;
    height: 100%;
    text-align: center;
  }
  .tcsure {
    width: 2.5rem;
    height: 1.3rem;
    color: #ffffff;
    background-color: #f98d84;
    text-align: center;
    border-radius: 4px;
    line-height: 1.3rem;
  }
}

.btn {
  width: 100%;
  height: 2.2rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  margin: 1rem 0;
  div {
    width: 100%;
    height: 100%;
    background-color: #f54133;
    border-radius: 0.3rem;
    line-height: 2.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
  }
}

.active {
  color: #f54133;
}
</style>
