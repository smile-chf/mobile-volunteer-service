<template>
  <!-- 已认领 /已完成-->
  <div :class="{'accepted':true,'activebtm':showupdataimg}">
    <van-overlay :show="showoverlay">
      <van-loading class="loading" vertical color="#ff6f10" type="spinner">上传中...</van-loading>
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
        <p class="title">认领人</p>
        <div class="renstyle" v-for="(item, index) in resdata" :key="index">
          <img src="../../../img/home/icoman.png" alt srcset style="width:1.1rem;height:1.1rem" />
          <div class="lisir">{{item.name}} {{item.tel}}</div>
        </div>
      </div>
      <div class="unit" style="margin-top: .5rem;padding-bottom: .5rem">
        <p class="title" style="margin-bottom: .5rem;">帮助者</p>
        <van-uploader
          style="padding-left:0.8rem"
          v-model="fabuimg"
          multiple
          :max-count="3"
          :disabled="showhelper"
          :deletable="!showhelper"
        />
      </div>
      <div class="unit" style="margin-top: .5rem;padding-bottom: .5rem">
        <p class="title" style="margin-bottom: .5rem;">需求者</p>
        <van-uploader
          style="padding-left:0.8rem"
          v-model="xuqiuimg"
          multiple
          :max-count="3"
          :disabled="!showhelper"
          :deletable="showhelper"
        />
      </div>
    </div>

    <div class="foot" v-if="showupdataimg">
      <p @click="serveunit">上传图片</p>
    </div>
  </div>
</template>
<script>
import {
  getDemandResourcesById,
  getDemandResourcesUsers,
  commonsFileUpload,
  update
} from "../../../api/http";
export default {
  data() {
    return {
      showoverlay: false,
      identity: "", //0发布者  1接受者   2游客
      category: "",
      showhelper: false,
      entranceId: "",
      userinfo: {},
      resdata: [],
      id: "",
      showupdataimg: true,
      jf: "",
      need_name: "党支部第一次大会",
      site: "合肥市经开区繁华大道",
      unit: "党组织名称",
      times: "2020/03/15  15:00 ~ 2020/03/15  16:00",
      contactWay: "李先生   151448865489",

      uploaderimgurl: "https://img.yzcdn.cn/vant/cat.jpeg",
      show: false,
      fabuimg: [],
      fabuimgeg: [],
      xuqiuimg: [],
      neederimgurl: [],
      otherimgurl: [],
      titlename: {}
    };
  },
  methods: {
 async   serveunit() {
      this.showoverlay = true;
      if (!this.showhelper) {
        if (
          this.resdata[0].receiveImgUrl != null &&
          this.resdata[0].receiveImgUrl != ""
        ) {
          // console.log(1111);

          this.resdata[0].status = 2;
        }

        if (
          this.resdata[0].receiveImgUrl == null ||
          this.resdata[0].receiveImgUrl.length == 0
        ) {
          this.otherimgurl = [];
        } else {
          JSON.parse(this.resdata[0].receiveImgUrl).forEach(item => {
            this.otherimgurl = [];
            this.otherimgurl.push(item);
          });
        }

        (this.otherimgurl = []),
          this.fabuimg.forEach(async item => {
            // console.log(item.url);
            if (item.url != undefined) {
              this.otherimgurl.push(item.url);
            } else {
              let res = await commonsFileUpload(item.file);
              this.otherimgurl.push(res.details.path);
            }
          });

        if (this.fabuimg.length == 0) {
          this.$toast.fail({ message: "请选择图片", duration: 1000 });
          this.showoverlay=false
        } else {
          let j = setInterval(async () => {
            if (this.otherimgurl.length == this.fabuimg.length) {
              clearInterval(j);
              let abc = await update({
                id: this.resdata[0].id,
                receiveImgUrl: JSON.stringify(this.otherimgurl),
                status: this.resdata[0].status
              });

              if (abc.code == 200) {
                this.$toast.success({ message: "上传成功", duration: 1000 });
                setTimeout(() => {
                  this.$router.push({ path: "/Home" });
                }, 1000);
              }
              if (abc.code == 500) {
                this.$notify("服务器错误");
              }
              if (abc.code == 302) {
                this.$notify("登录失效，请重新登录");
              }
            }
          }, 3000);
        }
      } else {
        if (
          this.resdata[0].publishImgUrl != null &&
          this.resdata[0].publishImgUrl != ""
        ) {
          this.resdata[0].status = 2;
        }

        if (this.resdata[0].publishImgUrl == null) {
          this.neederimgurl = [];
        } else {
          JSON.parse(this.resdata[0].publishImgUrl).forEach(item => {
            this.neederimgurl = [];
            this.neederimgurl.push(item);
          });
        }

        (this.neederimgurl = []),
          this.xuqiuimg.forEach(async item => {
            // console.log(item.url);

            if (item.url != undefined) {
              this.neederimgurl.push(item.url);
            } else {
              let res = await commonsFileUpload(item.file);
              this.neederimgurl.push(res.details.path);
            }
          });

         
         

        if (this.xuqiuimg.length == 0) {
          this.$toast.fail({ message: "请选择图片", duration: 1000 });
        } else {

         
         

        await  setTimeout(async () => {
             if (this.neederimgurl==undefined) {
                  this.$toast.fail({ message: "网络不佳", duration: 1000 });
             } else {
                  let abc = await update({
              id: this.resdata[0].id,
              publishImgUrl: JSON.stringify(this.neederimgurl),
              status: this.resdata[0].status
            });
            if (abc.code == 200) {
              this.$toast.success({ message: "上传成功", duration: 1000 });
              setTimeout(() => {
                this.$router.push({ path: "/Home" });
              }, 1000);
            }
            if (abc.code == 500) {
              this.$notify("服务器错误");
            }
            if (abc.code == 302) {
              this.$notify("登录失效，请重新登录");
            }
             }
          
          }, 3000);
        }
      }
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
    },

    async getDemandResourcesUsersvue() {
      let res = await getDemandResourcesUsers(this.id, this.status);
      this.resdata = res.details.data;
      // console.log(JSON.parse(this.resdata[0].publishImgUrl));
      //  this.fabuimg.push({url})
      if (this.resdata[0].publishImgUrl == null) {
      } else {
        JSON.parse(this.resdata[0].publishImgUrl).forEach(item => {
          this.xuqiuimg.push({ url: item });
        });
      }

      if (this.resdata[0].receiveImgUrl == null) {
      } else {
        JSON.parse(this.resdata[0].receiveImgUrl).forEach(item => {
          this.fabuimg.push({ url: item });
        });
      }

      //  this.fabuimg= this.resdata[0].publishImgUrl
      //  this.xuqiuimg= this.resdata[0].receiveImgUrl
    }
  },
  async mounted() {
    this.status = this.$route.query.status;
    if (this.$route.query.status == 1) {
      this.showupdataimg = true;
    } else {
      this.showupdataimg = true;
    }
    this.id = this.$route.query.id;
    // console.log(this.id);

    this.getDemandResourcesByIdvue();
    this.getDemandResourcesUsersvue();

    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

    // console.log(this.userinfo.id);

    // setTimeout(() => {
    //   // console.log(this.userinfo.id);
    //   // console.log(this.entranceId);
    //   //  console.log( this.entranceId);
    //   if (this.userinfo.id == this.entranceId) {
    //     // console.log(111);
    //     this.showhelper = true;

    //   } else {
    //     this.showhelper = false;

    //   }
    // }, 500);
    setTimeout(() => {
      // console.log(this.userinfo.id );
      // console.log(this.entranceId);
      //  console.log( this.resdata);
      if (this.userinfo.id == this.entranceId) {
        //发布者
        this.identity = 0;
      } else {
        //接受者或者是游客
        //判断返回users里面的receiveEntranceId是否userinfo的id相等
        // users数组中有一个相等的话就是接受者
        this.resdata.forEach(item => {
          if (item.receiveEntranceId == this.userinfo.id) {
            this.identity = 1;
          } else {
            this.identity = 2;
          }
        });

        //游客状态receiveEntranceId和userinfo的id完全不等
      }
      // console.log(this.identity + "身份");

      if (this.category == 1) {
        if (this.identity == 0) {
          this.showhelper = true;
          // console.log("发布者");
        }
        if (this.identity == 1) {
          this.showhelper = false;
          // console.log("接受者");
        }
      } else {
        if (this.identity == 0) {
          this.showhelper = false;
          // console.log("发布者");
        }
        if (this.identity == 1) {
          this.showhelper = true;
          // console.log("接受者");
        }
      }
    }, 400);

    // console.log(this.showhelper);

    this.category = this.$route.query.category;
    if (this.category == 1) {
      //需求入口
      this.titlename = {
        name: "需求名称"
      };

      // if (this.status == 1) {
      //   this.showhelper = false;
      // } else {
      //   this.showhelper = true;
      // }
      // console.log(this.identity + "sf");
    } else {
      //资源入口
      this.titlename = {
        name: "资源名称"
      };
      // this.showhelper = false;
      // if (this.status == 1) {
      //   this.showhelper = true;
      // } else {
      //   this.showhelper = false;
      // }
    }
  }
};
</script>


<style lang="less" scoped>
.activebtm {
  padding-bottom: 3rem;
}
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
.accepted {
  background: #f6f6f6;
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
  height: 31%;
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

.renstyle {
  width: 100%;
  height: 1.1rem;
  box-sizing: border-box;
  padding-left: 0.8rem;
  display: flex;
  margin-top: 0.6rem;
  .lisir {
    margin-left: 0.4rem;
    line-height: 1.1rem;
  }
}
.loading {
  position: absolute;
  top: 50%;
  left: 46%;
  z-index: 10000;
  span {
    color: #ff6f10;
  }
}
</style>
<style lang="less">
.accepted {
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