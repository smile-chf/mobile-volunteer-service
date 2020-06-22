<template>
  <!-- 未认领 -->
  <div class="detailpage">
    <div class="banner">
      <img src="@/img/home/eg1.png" alt />
    </div>
    <div class="needs_box">
      <div class="unit">
        <p class="title">{{titlename.name}}</p>
        <van-field disabled v-model="need_name" type="textarea" rows="1" />
      </div>
      <div class="unit">
        <van-field disabled label="服务地址" v-model="site" error input-align="right" readonly />
      </div>

      <div class="unit">
        <p class="title">服务时间</p>
        <van-field disabled v-model="times" readonly />
      </div>
      <div class="unit">
        <van-field disabled label="联系方式" v-model="contactWay" error input-align="right" readonly />
      </div>
      <div class="unit">
        <van-field disabled label="获得积分" v-model="jf" error input-align="right" readonly />
      </div>
      <div class="unit" style="margin-top: .5rem;padding-bottom: .5rem">
        <p class="title">活动内容</p>
        <van-field disabled v-model="content" type="textarea" rows="3" />

        <div class="imgbox">
          <van-image :src="item" v-for="(item, index) in imglist" :key="index" @click="showimg" />
        </div>
      </div>
      <div class="unit" style="margin-top: .5rem;padding-bottom: .5rem">
        <p class="title">认领人</p>
        <div class="people_list"></div>
      </div>
    </div>
    <div class="foot" v-if="identity!=0">
      <p @click="serveunit" v-if="category==1">提供服务</p>
      <p @click="serveunit" v-else>申请资源</p>
    </div>

    <div class="foot" v-if="updosome">
      <p style="background: red" @click="undosome">撤销服务</p>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="content" @click.stop>
          <van-icon name="cross" class="close" @click="show=false" />
          <p class="p1">提供此服务</p>
          <van-field v-model="namename" placeholder="请输入用户名" />
          <van-field v-model="teltel" type="number" placeholder="请输入手机号" />
          <!-- <p class="p2">结束时间：2020/03/15 16:00</p> -->
          <!-- <p class="p3" @click="apply">确定认领</p> -->
          <div class="btnstyle" style="margin-top:1rem">
            <div class="btnleft" @click="apply(0)">取消</div>
            <div class="btnright" @click="apply(1)">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
import {
  getDemandResourcesById,
  getDemandResourcesUsers,
  demandResourcesUser,
  undo
} from "../../../api/http";
export default {
  data() {
    return {
      status: "",
      updosome: "",
      condition: "",
      titlename: {},
      category: "",
      namename: "",
      teltel: "",
      identity: "",
      entranceId: "",
      userinfo: {},
      resdata: {},
      id: "",
      typelist: [],
      jf: "",
      need_name: "党支部第一次大会",
      site: "合肥市经开区繁华大道",
      unit: "党组织名称",
      times: "2020/03/15  15:00 ~ 2020/03/15  16:00",
      contactWay: "李先生   151448865489",
      content:
        "有须儿接铁标头山口学专才治正和通确做有须儿接铁标头山口学专才治正和通确做有须儿接铁标头山口学专才治正和通确做",
      uploaderimgurl: "https://img.yzcdn.cn/vant/cat.jpeg",
      show: false,
      imglist: []
    };
  },
  methods: {
    showimg(){
      // console.log(this.imglist);
      
      ImagePreview({images:this.imglist,closeOnPopstate:true});
    },
    async apply(start) {
      if (start == 0) {
        this.show = false;
      } else {
        if (this.namename.trim() == "" || this.teltel.trim() == "") {
          this.$toast.fail({ message: "用户信息不能为空", duration: 1000 });
        } else {
          let res = await demandResourcesUser({
            drId: this.id,
            name: this.namename,
            tel: this.teltel,
            publishEntranceId: this.entranceId,
            receiveEntranceId: this.userinfo.id
          });
          console.log(res.code);
          
          if ((res.code == 200)) {
              this.$toast.success({ message: "提交成功" });
            this.$router.push({
              path: "/needserve",
              query: {category:this.category }
            });
          } else if (res.code == -1) {
           this.$toast.fail({ message: res.message });
          this.$router.push({
            path: "/needserve",
            query: { category: this.category }
          });
            
          } else {
            this.$toast.fail({ message: "网络错误" });
          }
        }
      }
    },
    serveunit() {
      this.show = true;
    },

    checkzcr(val) {
      // console.log(val);
      console.log(val);
    },
    async getDemandResourcesByIdvue() {
      let res = await getDemandResourcesById(this.id);
      this.entranceId = res.details.data.entranceId;
      this.jf = res.details.integral;
      this.need_name = res.details.data.name;
      this.site = res.details.data.address;
      this.times =
        res.details.data.startTime + "   -   " + res.details.data.endTime;
      this.contactWay =
        res.details.data.username + "     " + res.details.data.tel;
      this.content = res.details.data.content;
      this.imglist = JSON.parse(res.details.data.imgUrl);
    },
    async getDemandResourcesUsersvue() {
      let res = await getDemandResourcesUsers(this.id);
      this.resdata = res.details.data;
    },
    async undosome() {
      let res = await undo(this.id);
      if (res.code == 200) {
        this.$toast.success({ message: "撤销成功", duration: 1000 });
        setTimeout(() => {
          this.$router.push({ path: "/needserve", query: { category: this.category } });
        }, 1000);
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    }
  },
  mounted() {
    this.category = this.$route.query.category;
    this.id = this.$route.query.id;
    this.getDemandResourcesByIdvue();
    this.getDemandResourcesUsersvue();
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    setTimeout(() => {
      console.log(this.userinfo.id);
      console.log(this.entranceId);
      //  console.log( this.resdata);
      if (this.userinfo.id == this.entranceId) {
        //发布者
        this.identity = 0;
      } else {
        this.identity = 10;
        console.log(this.identity);
      }

      console.log(this.identity + "922222222222");

      if (this.status == -1 && this.identity == 0) {
        this.updosome = true;
      } else {
        this.updosome = false;
      }
    }, 300);
    this.category = this.$route.query.category;
    if (this.category == 1) {
      //需求入口
      this.titlename = {
        name: "需求名称"
      };
    } else {
      //资源入口
      this.titlename = {
        name: "资源名称"
      };
    }

    this.status = this.$route.query.status;

    // console.log(this.$route.query.status+"--------");
  }
};
</script>


<style lang="less" scoped>
.btnstyle {
  width: 100%;
  display: flex;
  align-items: center;
  height: 1.5rem;
  .btnleft {
    width: 50%;
    height: 100%;
    color: #f54133;
  }
  .btnright {
    width: 50%;
    height: 100%;
  }
}
.detailpage {
  background: #f6f6f6;
  padding-bottom: 3rem;
}

.banner {
  width: 100%;
  height: 22.5vh;
}

.banner img {
  width: 100%;
  height: 100%;
}

.unit {
  border-bottom: 1px solid #f6f6f6;
  background: #fff;
}

.title {
  //   font-size: 0.75rem;
  padding-left: 0.8rem;
  padding-top: 0.6rem;
  color: #333;
}

.imgbox {
  box-sizing: border-box;
  /*padding: 0 5%;*/
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
}

.imgbox .van-image {
  padding-left: 5%;
  width: 25%;
}

.people_list {
  margin-top: 0.3rem;
  width: 91%;
  border-radius: 0.3rem;
  margin-left: 0.8rem;
  //   background: #f6f6f6;
  box-sizing: border-box;
  padding: 0 0 0 0.6rem;
  margin-bottom: 0.4rem;
}

.people_list .list_unit {
  padding: 0.5rem 0;
}

.people_list .list_unit:not(:first-child) {
  border-top: 1px solid #e5e5ea;
}

.people_list .list_unit .p1 {
  font-size: 0.75rem;
  color: #333333;
}

.people_list .list_unit .p2 {
  font-size: 0.65rem;
  color: #8e8e93;
  margin-top: 0.1rem;
}

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.foot p {
  width: 91.5%;
  height: 2.2rem;
  background: #ff6f10;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 2.2rem;
  color: #ffffff;
  font-size: 0.85rem;
}

.van-field__body textarea,
input {
  color: #333333 !important;
  font-size: 0.75rem !important;
}

.van-field__label {
  color: #8e8e93;
  font-size: 0.75rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content {
  width: 75%;
  // height: 31%;
  height: 200px;
  background-color: #fff;
  border-radius: 0.7rem;
  text-align: center;
  font-size: 0.75rem;
  position: relative;
}

.content .p1 {
  font-size: 0.85rem;
  color: #333333;
  font-weight: 700;
  margin-top: 10%;
  margin-bottom: 2.2%;
}

.content .p2 {
  display: block;
  width: 100%;
  height: 50%;
  margin-top: 1%;
  box-sizing: border-box;
  padding-top: 2%;
}

.content .p3 {
  margin-top: 12%;
  width: 74%;
  height: 2rem;
  background: #f54133;
  color: #ffffff;
  line-height: 2rem;
  text-align: center;
  border-radius: 0.3rem;
  margin-left: 13%;
}

.content .close {
  position: absolute;
  top: 5%;
  right: 8%;
}
.bigxdthtk {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.xdthtk {
  display: flex;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  font-size: 16px;
  .quxiao {
    flex: 1;
    font-size: 14px;
    text-align: left;
  }
  .hytitle {
    flex: 1;
  }
  .hybc {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    .btnbcright {
      font-size: 14px;
      width: 44px;
      height: 30px;
      background-color: #f54133;
      line-height: 30px;
      color: #ffffff;
      text-align: center;
      margin-left: auto;
    }
  }
}
.bigbtnbc {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  // .btnbc {
  //   width: 60%;
  //   background-color: #f54133;
  //   color: #ffffff;
  //   height: 30px;
  //   border-radius: 30px;
  //   text-align: center;
  //   line-height: 30px;
  // }
  div {
    width: 50%;
  }
  .testtwo {
    line-height: 40px;
    text-align: right;
    color: #8e8e93;
  }
}
.setdisplay {
  display: flex;
  align-items: center;
  justify-content: center;
  //   margin-bottom: 10px;
  .setimg {
    width: 40px;
    height: 40px;
    // background-color: red;
    margin: 0 20px;
  }
}
</style>
<style lang="less">
.detailpage {
  .van-field--min-height .van-field__control {
    min-height: 0px;
  }

  .van-checkbox-group {
    .van-checkbox {
      margin-bottom: 10px;
    }
  }
  .van-field--error .van-field__control,
  .van-field--error .van-field__control::placeholder {
    color: #969799;
    -webkit-text-fill-color: currentColor;
  }
}
</style>