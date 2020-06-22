<template>
  <!-- 待确认过-->
  <div class="tobeconfirmed">
    <van-overlay :show="showoverlay">
      <van-loading class="loading" vertical color="#ff6f10" type="spinner">
        <div style="color:#ff6f10">加载中</div>
      </van-loading>
    </van-overlay>
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
          <van-image :src="item" v-for="(item, index) in imglist" @click="showimg" :key="index" />
        </div>
      </div>
      <div class="unit" style="margin-top: .5rem;padding-bottom: .5rem">
        <p class="title">认领人</p>
        <div class="somestyle">
          <div class="renstyle" v-for="(item, index) in resdata" :key="index">
            <img src="../../../img/home/icoman.png" alt srcset style="width:1.1rem;height:1.1rem" />
            <div class="lisir">{{item.name}} {{item.tel}}</div>
          </div>
          <!-- <div class="renstyle">
            <img src="../../../img/home/icoman.png" alt srcset style="width:1.1rem;height:1.1rem" />
            <div class="lisir">李先生 15232402414</div>
          </div>-->
        </div>
      </div>
    </div>

    <div class="foot" v-if="identity==0">
      <div class="styleflex">
        <div @click="showpicker=true">选择认领人</div>
        <div @click="serveunit">撤销</div>
      </div>
    </div>
    <div class="foot" v-if="identity==2">
      <p @click="provideserve">提供服务</p>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="content" @click.stop>
          <van-icon name="cross" class="close" @click="show=false" />
          <p class="p1">撤销</p>
          <p class="p2">撤销后此记录将被删除</p>
          <div class="btnstyle">
            <div class="btnleft" @click="apply(0)">取消</div>
            <div class="btnright" @click="apply(1)">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>

    <van-popup v-model="showpicker" position="bottom">
      <van-picker
        title="选择认领"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <van-overlay :show="showway" @click="showway = false">
      <div class="wrapper">
        <div class="content" @click.stop>
          <van-icon name="cross" class="close" @click="showway=false" />
          <p class="p1">提供此服务</p>
          <van-field v-model="namename" placeholder="请输入用户名" />
          <van-field v-model="teltel" placeholder="请输入手机号" />
          <div class="btnstyle" style="margin-top:1rem">
            <div class="btnleft" @click="way(0)">取消</div>
            <div class="btnright" @click="way(1)">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import {
  getDemandResourcesById,
  getDemandResourcesUsers,
  checkmanupdate,
  undo,
  demandResourcesUser
} from "../../../api/http";
export default {
  data() {
    return {
      showoverlay: true,
      category: "",
      titlename: {},
      namename: "",
      teltel: "",
      identity: "", //0发布者  1接受者   2游客
      showbtn: "",
      userinfo: "",
      id: "",
      showpicker: false,
      columns: [
        { text: "李先生  13215641245231", id: 0 },
        { text: "李先生  13215641245231", id: 1 },
        { text: "李先生  13215641245231", id: 2 }
      ],
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
      imglist: [],
      resdata: [],
      showway: false
    };
  },
  methods: {
    showimg() {
      ImagePreview(
        {images:this.imglist,closeOnPopstate:true}
      );
      
    },
    async onConfirm(val) {
      // console.log(val.id);
      let res = await checkmanupdate(val.id);
      if (res.code == 200) {
        this.$toast.success({ message: "选择认领人成功", duration: 1000 });
        setTimeout(() => {
          this.$router.push({
            path: "/needserve",
            query: { category: this.category }
          });
        }, 1000);
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
      //  console.log("确定");
    },
    onCancel() {
      console.log("取消");
    },
    async apply(start) {
      if (start == 0) {
        this.show = false;
      } else {
        let res = await undo(this.id);
        if (res.code == 200) {
          this.$router.push({
            path: "/needserve",
            query: { category: this.category }
          });
        }
        this.show = false;
      }
    },
    serveunit() {
      this.show = true;
    },
    //提供服务
    provideserve() {
      this.showway = true;
    },
    async way(num) {
      if (num == 0) {
        this.showway = false;
      } else {
        let res = await demandResourcesUser({
          drId: this.id,
          name: this.namename,
          tel: this.teltel,
          publishEntranceId: this.entranceId,
          receiveEntranceId: this.userinfo.id
        });
        console.log(res + "--------------");

        if (res.code == 200) {
          this.$toast.success({ message: "提交成功" });
          this.$router.push({
            // path: "/tobeconfirmed",
            // query: { id: this.id, status: 2 }

            path: "/needserve",
            query: { category: this.category }
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
      this.columns = JSON.parse(
        JSON.stringify(res.details.data).replace(/name/g, "text")
      );
    }
  },
  mounted() {
    this.showoverlay = true;
    this.category = this.$route.query.category;
    if (this.category == 1) {
      //入口
      this.titlename = {
        name: "需求名称"
      };
    } else {
      //资源入口
      this.titlename = {
        name: "资源名称"
      };
    }
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    this.id = this.$route.query.id;
    this.getDemandResourcesByIdvue();
    this.getDemandResourcesUsersvue();
    setTimeout(() => {
      console.log(this.userinfo.id);
      console.log(this.entranceId);
      console.log(this.resdata);
      if (this.userinfo.id == this.entranceId) {
        //发布者
        console.log(1);

        this.identity = 0;
      } else {
        //接受者或者是游客
        //判断返回users里面的receiveEntranceId是否userinfo的id相等
        // users数组中有一个相等的话就是接受者
        this.resdata.forEach(item => {
          if (item.receiveEntranceId == this.userinfo.id) {
            console.log(2);
            this.identity = 1;
          } else {
            this.identity = 2;
            console.log(3);
          }
        });

        //游客状态receiveEntranceId和userinfo的id完全不等
      }
      console.log(this.identity + "身份");
      this.showoverlay = false;
    }, 1000);
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
.tobeconfirmed {
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
  padding-left: 0.8rem;
  //   background: #f6f6f6;
  box-sizing: border-box;
  padding: 0 0 0 0.6rem;
  margin-bottom: 0.4rem;
  box-sizing: border-box;
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
  height: 2.2rem;
  background: #ffffff;
  display: flex;

  .styleflex {
    display: flex;
    width: 100%;
    div {
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 2.2rem;
    }
    div:nth-child(1) {
      background-color: #fff4ec;
      color: #ff6f10;
    }
    div:nth-child(2) {
      background-color: #ff6f10;
      color: #ffffff;
    }
  }
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
  padding-top: 12%;
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
.renstyle {
  width: 100%;
  height: 2.7rem;
  box-sizing: border-box;
  padding-left: 0.8rem;
  display: flex;

  border-bottom: 1px solid #e5e5ea;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;

  .lisir {
    box-sizing: border-box;
    margin-left: 0.4rem;
    line-height: 2.7rem;
  }
}
.somestyle {
  margin-top: 0.6rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  border-radius: 2rem;
  overflow: hidden;
}
</style>
<style lang="less">
.tobeconfirmed {
  .loading {
    top: 50%;
  }
  .van-picker__confirm {
    color: #ff6f10;
  }
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