<template>
  <div class="volunteerserve">
    <!-- 志愿服务页面 -->
    <van-search v-model="search" placeholder="请输入搜索关键词" input-align="center" @search="onSearch" />
    <van-tabs v-model="active" @click="changestart">
      <van-tab title="全部" class="box">
        <div
          class="wrap"
          @click="godatpage(item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.picPath" style="width:100%;height:85%" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.title}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>{{item.joinEndDate}} 截止</p>
              </div>
              <p class="p2">{{item.flag}}</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="报名中" class="box">
        <div
          class="wrap"
          @click="godatpage(item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.picPath" style="width:100%;height:85%" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.title}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>{{item.joinEndDate}} 截止</p>
              </div>
              <p class="p2">{{item.flag}}</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我参加的" class="box">
        <div
          class="wrap"
          @click="godatpage(item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.picPath" style="width:100%;height:85%" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.title}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>{{item.joinEndDate}} 截止</p>
              </div>
              <p class="p2">{{item.flag}}</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我发布的" class="box">
        <div
          class="wrap"
          @click="godatpage(item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.picPath" style="width:100%;height:85%" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.title}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>{{item.joinEndDate}} 截止</p>
              </div>
              <p class="p2">{{item.flag}}</p>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- <van-tab title="报名中" class="box">
        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png" style="width:100%;height:85%"alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
              <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我参加的" class="box">
        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png"  style="width:100%;height:100%" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
              <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我发布的" class="box">
        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png" style="width:100%;height:100%" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
              <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>-->
    </van-tabs>
    <div class="floating" @click="publish">
      <img src="@/img/party_alliance/add.png" alt />
    </div>

    <van-popup v-model="show">
      <div class="showstyle">
        <div class="ico" @click="show=false">
          <img src="@/img/home/icoxx.png" alt srcset />
        </div>
        <div class="showtop">系统推荐</div>
        <div class="showbody">
          <div class="showitem" v-for="(item, index) in showdata" :key="index">
            <div class="showitemtop">{{item.title}}</div>
            <div class="showitembody">
              <div style="width:2.4rem;height:2.4rem">
                <img :src="item.pic_path" alt srcset style="width:100%;height:100%" />
              </div>
              <div class="sometextstyle">
                <div class="sometextstylet">
                  <div>活动时间：</div>
                  <div>{{item.showtime}}</div>
                </div>
                <div class="sometextstyleb">
                  <div>获得积分：</div>
                  <div style="color:#FF6F10">{{item.integral}}分</div>
                </div>
                <div class="yellowbtn" @click="godatpage(item.id)">立即查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getActivityList, activityqueryByCategory } from "../../../api/http";
export default {
  data() {
    return {
      show: false,
      datalist: [],
      search: "",
      active: 0,
      typeId: "",
      showdata: []
    };
  },

  methods: {
    changestart(val) {
      this.active = val;
      console.log(this.active);

      this.getActivityListvue(this.active, this.search);
    },
    godatpage(id) {
      this.$router.push({ path: "/volunteerserve_detial", query: { id } });
    },

    onSearch(val) {
      this.getActivityListvue(this.active, this.search);
    },
    publish() {
      this.$router.push("/openserve");
    },

    async getActivityListvue(type, title) {
      let res = await getActivityList(type, title);
      this.datalist = res.details.list;
    },
    async getactivityqueryByCategory(typeId) {
      let res = await activityqueryByCategory(typeId);
      this.showdata = res.details.data;
      this.showdata.forEach(item => {
        item.showtime =
          this.$d(item.start_date).format("YYYY-MM-DD HH:mm") +
          "-" +
          this.$d(item.end_date).format("HH:mm");
      });
    }
  },
  mounted() {
    this.typeId = this.$route.query.typeId;

    if (this.typeId == undefined) {
      this.show = false;
      console.log(this.show);
    } else {
      this.getactivityqueryByCategory(this.typeId);

      this.show = false;

      console.log(this.show);
    }

    this.getActivityListvue(0, this.search);
  }
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.8rem;
}
.wrap {
  width: 100%;
  height: 5rem;
  display: flex;
  margin: 0.8rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid #f6f6f6;
}
.wrap_left {
  width: 38%;
  height: 100%;
}
.wrap_left img {
  width: 100%;
  height: 78%;
}
.wrap_right {
  width: 60%;
  height: 78%;
  margin-left: 0.4rem;
  position: relative;
}
.wrap_right .right_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
}
.wrap_right .right_top .p1 {
  font-size: 0.75rem;
  color: #333333;
}
.wrap_right .right_top .p2 {
  font-size: 0.65rem;
  color: red;
}
.wrap_right .p3 {
  font-size: 0.7rem;
  color: #8e8e93;
  margin-top: 0.3rem;
}
.wrap_right .right_mid {
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  justify-content: space-between;
}
.wrap_right .right_mid .mid_wrap {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  color: #8e8e93;
}
.wrap_right .right_mid .mid_wrap {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  color: #8e8e93;
}
.wrap_right .right_mid img {
  width: 0.55rem;
  height: 0.55rem;
}
.wrap_right .right_mid p {
  font-size: 0.6rem;
  color: #8e8e93;
  margin-left: 0.2rem;
}

.wrap_right .right_mid .p2 {
  font-size: 0.7rem;
  color: #f54133;
}
.wrap_right .right_foot {
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}
.wrap_right .right_foot img {
  width: 0.55rem;
  height: 0.55rem;
}
.floating {
  position: fixed;
  right: 3.2%;
  bottom: 11.6%;
  width: 3.9rem;
  height: 3.9rem;
}
.floating img {
  width: 100%;
  height: 100%;
}
</style>


<style lang="less" scoped>
.showstyle {
  width: 15rem;
  height: 26.5rem;
  border-radius: 6px;
  background-image: url("../../../img/home/mustbg.png");
  // background-size: contain;
  background-size: cover;
}
.muststyle {
  .van-popup--center {
    border-radius: 10px;
    // background-color: #FDF7E9;
  }
}
.ico {
  position: absolute;
  right: 2%;
  top: 1%;
  width: 0.9rem;
  height: 0.9rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.showtop {
  width: 100%;
  height: 3.3rem;
  font-size: 0.85rem;
  color: #ff6f10;
  text-align: center;
  line-height: 3.3rem;
  font-weight: 500;
}
.showbody {
  box-sizing: border-box;
  padding: 0 0.6rem;
}

.showitem {
  width: 100%;
  height: 5.2rem;
  background-color: #ffffff;
  margin-bottom: 0.4rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  .showitemtop {
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.7rem;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .showitembody {
    display: flex;
  }
}

.sometextstyle {
  box-sizing: border-box;
  padding: 6px;
  position: relative;
  .sometextstylet {
    display: flex;
    margin-bottom: 6px;
    div {
      font-size: 11px;
      color: #8e8e93;
    }
  }
  .sometextstyleb {
    display: flex;
    div {
      font-size: 11px;
      color: #8e8e93;
    }
  }
}
.yellowbtn {
  position: absolute;
  width: 3rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: #ff6f10;
  color: #ffffff;
  text-align: center;
  line-height: 1rem;
  font-size: 11px;
  right: 0%;
  bottom: 0%;
}
</style>