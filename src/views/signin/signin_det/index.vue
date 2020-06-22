<template>
  <div class="signin_det">
    <div class="centerbox">
      <div class="top">{{datalist.activityTitle}}</div>
      <div class="centerbg">
        <div>{{datatime}}</div>
        <div>{{week}}</div>
        <div>{{datalist.beginTime}}~{{datalist.endTime}}</div>
      </div>
      <div class="ewm">
        <div id="qrcode"></div>
      </div>
    </div>

    <div class="btn" v-if="status==0">
      <div class="tj">
        <img src="../../../img/xmimg/tj.png" alt srcset />
        <div @click="golistman">签到统计</div>
      </div>
      <div class="qiandao" @click="marstqd">立即签到</div>
    </div>

    <div class="btn" v-if="status==1">
      <div class="tj" style="width:100%">
        <img src="../../../img/xmimg/tj.png" alt srcset />
        <div @click="golistman">签到统计</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
// import {signInDetail,updateSignIn} from "../../../api/http";
import { qdgetActivityDetail, punch } from "@/api/http";
export default {
  data() {
    return {
      status: "",
      codeurl: "",
      id: "",
      datalist: {},
      week: "",
      datatime: ""
    };
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 170,
        height: 170,
        text: this.codeurl
      });
    },
    async signInDetailvue() {
      // let res = {
      //   code: 200,
      //   message: "",
      //   details: {
      //     data: {
      //       qrCode:
      //         "http://www.ahshequ.cn/intelligentCommunity/mobile/user/skip?id=73&timeStamp=1590395528138&type=conferencePunch",
      //       conferenceDate: "2020-05-25 星期一",
      //       subject: "会议1",
      //       end_time: "18:00:00",
      //       id: 73,
      //       beginTime: "17:00:00",
      //       status: "0"
      //     }
      //   }
      // };

      // let res = await signInDetail(this.id)
      let res = await qdgetActivityDetail(this.id);

      this.datalist = res.details.data;
      this.codeurl = res.details.data.qrCode;
      this.week = this.datalist.activityDate.split(" ")[1];
      this.datatime = this.datalist.activityDate.split(" ")[0];

      if (res.details.data != null && res.details.data != {}) {
        this.qrcode();
      }
    },
    marstqd() {},
    async marstqd() {
      let res = await punch(this.id);
      if (res.code == 200) {
        if (res.message == "success") {
          this.$toast.success({ message: "签到成功", duration: 1000 });
          setTimeout(() => {
            this.status=1
          }, 1000);
        } else {
           this.$toast.fail({ message: res.details.detail, duration: 1000 });
        }
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    },
    golistman() {
      this.$router.push({ path: "/signin_list", query: { id: this.id } });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.status = this.$route.query.status;

    this.signInDetailvue();

    setTimeout(() => {}, 500);
  }
};
</script>

<style lang="less" scoped>
.signin_det {
  width: 100%;
  height: 100%;
  background-image: url("../../../img/xmimg/bgimg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 2.8rem 0 0 0;
  box-sizing: border-box;
}
.centerbox {
  width: 17.15rem;
  height: 20.95rem;
  background-color: #ffffff;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 0.3rem;
}
.top {
  height: 2.65rem;
  width: 100%;
  line-height: 2.65rem;
  text-align: center;
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.centerbg {
  color: #ff6f10;
  height: 1.7rem;
  width: 100%;
  background-color: #fff6f1;
  display: flex;
  box-sizing: border-box;
  padding: 0 1.5rem;
  div {
    height: 100%;
    line-height: 1.7rem;
    flex: 1;
    text-align: center;
  }
  margin-bottom: 3.2rem;
}

.ewm {
  width: 8.5rem;
  height: 8.5rem;
  //   background-color: red;
  margin: 0 auto;
}

.btn {
  position: fixed;
  height: 2.2rem;
  width: 100%;
  bottom: 0;
  display: flex;
  // background-color: red;
  .tj {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f6f6f6;
    div:nth-child(2) {
      color: #ff6f10;
      font-size: 0.75rem;
      line-height: 2.2rem;
    }
    img {
      width: 1rem;
      height: 1rem;
    }
  }
  .qiandao {
    width: 50%;
    height: 100%;
    background-color: #ff6f10;
    color: #fff;
    font-size: 0.75rem;
    line-height: 2.2rem;
    text-align: center;
  }
}
</style>