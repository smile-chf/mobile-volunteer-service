<template>
  <div class="muststyle">
    <van-popup v-model="tcleft" position="top">
      <div
        class="tcitemlast"
        v-for="(item, index) in listliebiao"
        :key="index"
        @click="dosearch(item.id)"
      >{{item.name}}</div>
    </van-popup>
    <van-search v-model="search" placeholder="请输入搜索关键词" input-align="center" @search="onSearch">
      <template #left>
        <div class="icostyle" @click="tcleft=true">
          <van-icon name="descending" />
        </div>
      </template>
    </van-search>
    <van-tabs v-model="active" color="#F54133" @click="dochange" title-active-color="#F54133">
      <van-tab title="未认领" name="not_receive" class="box">
        <div
          class="wrap"
          @click="godetailpage(item.status,item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.name}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <p>{{item.startTime}}</p>
              </div>
              <p class="p2" v-if="item.status==-1" style="color:#FF2D10">未认领</p>
              <p class="p2" v-if="item.status==0" style="color:#FFAD10">待确认</p>
              <p class="p2" v-if="item.status==1" style="color:#FF6F10">已认领</p>
              <p class="p2" v-if="item.status==2" style="color:#8E8E93">已完成</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已认领" name="is_receive" class="box">
        <div
          class="wrap"
          @click="godetailpage(item.status,item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.name}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <p>{{item.startTime}}</p>
              </div>
              <p class="p2" v-if="item.status==-1" style="color:#FF2D10">未认领</p>
              <p class="p2" v-if="item.status==0" style="color:#FFAD10">待确认</p>
              <p class="p2" v-if="item.status==1" style="color:#FF6F10">已认领</p>
              <p class="p2" v-if="item.status==2" style="color:#8E8E93">已完成</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我认领的" name="self_receive" class="box">
        <div
          class="wrap"
          @click="godetailpage(item.status,item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.name}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <p>{{item.startTime}}</p>
              </div>
              <p class="p2" v-if="item.status==-1" style="color:#FF2D10">未认领</p>
              <p class="p2" v-if="item.status==0" style="color:#FFAD10">待确认</p>
              <p class="p2" v-if="item.status==1" style="color:#FF6F10">已认领</p>
              <p class="p2" v-if="item.status==2" style="color:#8E8E93">已完成</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我发布的" name="self_publish" class="box">
        <div
          class="wrap"
          @click="godetailpage(item.status,item.id)"
          v-for="(item, index) in datalist"
          :key="index"
        >
          <div class="wrap_left">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">{{item.name}}</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <p>{{item.startTime}}</p>
              </div>
              <p class="p2" v-if="item.status==-1" style="color:#FF2D10">未认领</p>
              <p class="p2" v-if="item.status==0" style="color:#FFAD10">待确认</p>
              <p class="p2" v-if="item.status==1" style="color:#FF6F10">已认领</p>
              <p class="p2" v-if="item.status==2" style="color:#8E8E93">已完成</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="floating" @click="publish">
      <img src="@/img/home/add.png" alt @click="gonextpage" />
    </div>

    <van-popup v-model="show">
      <div class="showstyle">
        <div class="ico" @click="show=false">
          <img src="../../img/home/icoxx.png" alt srcset />
        </div>
        <div class="showtop">系统推荐</div>
        <div class="showbody">
          <div class="showitem" v-for="(item, index) in showdata" :key="index">
            <div class="showitemtop">{{item.name}}</div>
            <div class="showitembody">
              <div style="width:2.4rem;height:2.4rem">
                <img :src="item.imgpathurl" alt srcset style="width:100%;height:100%" />
              </div>
              <div class="sometextstyle">
                <div class="sometextstylet">
                  <div>服务时间：</div>
                  <div>{{item.showtime}}</div>
                </div>
                <div class="sometextstyleb">
                  <div>获得积分：</div>
                  <div style="color:#FF6F10">{{item.integral}}分</div>
                </div>
                <div class="yellowbtn" @click="godetailpage(item.status,item.id)">立即查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getDemandResources,
  getDemandResourcesType,
  queryByCategory
} from "../../api/http";
export default {
  data() {
    return {
      showdata: [],
      show: false,
      category: "",
      search: "",
      active: 0,
      datalist: [],
      listliebiao: [],
      tcleft: false,
      typeId: "",
      sort: "not_receive",
      othertypeId: ""
    };
  },

  methods: {
     goBack(){
    this.$router.replace({path: '/Home'});
    //replace替换原路由，作用是避免回退死循环
  },
    dochange(val) {
      console.log(val);
      
      this.sort = val;
      this.getDemandResourcesvue({
        typeId: this.typeId,
        sort: this.sort,
        search: this.search,
        category: this.category
      });
    },
    onSearch(val) {
      // console.log(this.search);
      // this.search=val
      this.getDemandResourcesvue({
        typeId: this.typeId,
        sort: this.sort,
        search: this.search,
        category: this.category
      });
    },
    publish() {},
    gonextpage() {
      this.$router.push({
        path: "/addemand",
        query: { category: this.category }
      });
    },
    godetailpage(status, id) {
      console.log(status, id);

      if (status == -1) {
        //未认领页面
        this.$router.push({
          path: "/detailpage",
          query: { id, status, category: this.category }
        });
      }
      // 待确认
      if (status == 0) {
        this.$router.push({
          path: "/tobeconfirmed",
          query: { id, status, category: this.category }
        });
      }
      //已认领
      if (status == 1) {
        this.$router.push({
          path: "/accepted",
          query: { id, status, category: this.category }
        });
      }
      //已完成
      if (status == 2) {
        this.$router.push({
          path: "/accepted",
          query: { id, status, category: this.category }
        });
      }
    },
    async getDemandResourcesvue(data) {
      let res = await getDemandResources(data);
      this.datalist = res.details.data;
      this.datalist.forEach(item => {
        item.imgUrl = JSON.parse(item.imgUrl)[0];
      });
    },
    //分类接口
    async getDemandResourcesTypevue() {
      let res = await getDemandResourcesType();
      this.listliebiao = res.details.data;
    },
    dosearch(id) {
      console.log(id);
      this.typeId = id;
      this.getDemandResourcesvue({
        typeId: this.typeId,
        sort: this.sort,
        search: this.search,
        category: this.category
      });
      this.tcleft = false;
    },
    async getqueryByCategory(category, typeId) {
      let res = await queryByCategory(category, typeId);
      this.showdata = res.details.data;
      if ( this.showdata.length==0) {
         this.show = false;
      }else{
          this.showdata.forEach(item => {
        item.showtime =
          this.$d(item.start_time).format("YYYY-MM-DD HH:mm") +
          "-" +
          this.$d(item.end_time).format("HH:mm");
        item.imgpathurl = JSON.parse(item.img_url)[0];
      });
        this.show = true;
      }
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }

    this.category = this.$route.query.category;
    console.log(this.category);
    this.othertypeId = this.$route.query.typeId;
    if (this.othertypeId == undefined) {
      this.show = false;
    } else {
      this.getqueryByCategory(this.category, this.othertypeId);
      
    }
    this.getDemandResourcesvue({
      typeId: this.typeId,
      sort: this.sort,
      search: this.search,
      category: this.category
    });
    this.getDemandResourcesTypevue();
  },
  destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
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
  /* overflow: hidden; */
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
.tcitemlast {
  width: 100%;
  height: 2rem;
  font-size: 0.7rem;
  text-align: center;
  line-height: 2rem;
  border-bottom: 1px solid #f6f6f6;
}
.icostyle {
  width: 1rem;
  margin-right: 0.4rem;
  font-size: 1rem;
}
</style>


<style lang="less" scoped>
.showstyle {
  width: 15rem;
  height: 26.5rem;
  border-radius: 6px;
  background-image: url("../../img/home/mustbg.png");
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
