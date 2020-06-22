<template>
  <div class="integrallist">
    <div class="topbgc">
      <div class="icoman">
        <div style="width:2.4rem; height:2.4rem">
          <img src="../../img/home/userico.png" style="width:100%" alt />
        </div>
      </div>
      <div class="userstyle">{{userinfo.username}}</div>
      <div class="bgbottom">
        <div class="bgl">
          <div v-if="bs==0">{{my+1}}</div>
          <div v-if="bs!=0">无</div>
          <div>我的排名</div>
        </div>
        <div class="bgr">
          <div v-if="bs==0">{{titledata.integral}}</div>
          <div v-if="bs!=0">无</div>
          <div>我的积分</div>
        </div>
      </div>
    </div>

    <div class="body">
      <van-tabs @click="onClick" color="#F54133" title-active-color="#F54133">
        <van-tab title="个人排行">
          <div class="over">
            <div class="itembody" @click="gonextpage(datalist[0].entrance_id)" v-if="datalist.length>=1">
              <div>
                <img src="../../img/home/one.png" alt style="width:2rem;height:2rem" />
              </div>
              <div>
                <img
                  :src="datalist[0].headimg"
                  alt
                  style="width:2.2rem;height:2.2rem;border-radius: 2rem;"
                />
              </div>
              <div>{{datalist[0].username}}</div>
              <div>{{datalist[0].integral}}</div>
            </div>
            <div class="itembody" @click="gonextpage(datalist[1].entrance_id)" v-if="datalist.length>=2">
              <div>
                <img src="../../img/home/two.png" alt style="width:2rem;height:2rem" />
              </div>
              <div>
                <img
                  :src="datalist[1].headimg"
                  alt
                  style="width:2.2rem;height:2.2rem;border-radius: 2rem;"
                />
              </div>
              <div>{{datalist[1].username}}</div>
              <div>{{datalist[1].integral}}</div>
            </div>
            <div class="itembody" @click="gonextpage(datalist[2].entrance_id)" v-if="datalist.length>=3">
              <div>
                <img src="../../img/home/three.png" alt style="width:2rem;height:2rem" />
              </div>
              <div>
                <img
                  :src="datalist[2].headimg"
                  alt
                  style="width:2.2rem;height:2.2rem;border-radius: 2rem;"
                />
              </div>
              <div>{{datalist[2].username}}</div>
              <div>{{datalist[2].integral}}</div>
            </div>
            <div v-if="datalist.length>=4">
              <div class="itembody" @click="gonextpage(item.entrance_id)" v-for="(item, index) in lastlist" :key="index">
                <div class="pm">{{index+4}}</div>
                <div>
                  <img
                    :src="item.headimg"
                    alt
                    style="width:2.2rem;height:2.2rem;border-radius: 2rem;"
                  />
                </div>
                <div>{{item.username}}</div>
                <div>{{item.integral}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="机构排行">
           <div class="over">
            <div class="itembodys"  v-if="datalist.length>=1">
              <div>
                <img src="../../img/home/one.png" alt style="width:2rem;height:2rem" />
              </div>
            
              <div>{{datalist[0].depart}}</div>
              <div>{{datalist[0].integralCount}}</div>
            </div>
            <div class="itembodys" v-if="datalist.length>=2">
              <div>
                <img src="../../img/home/two.png" alt style="width:2rem;height:2rem" />
              </div>
         
              <div>{{datalist[1].depart}}</div>
              <div>{{datalist[1].integralCount}}</div>
            </div>
            <div class="itembodys" v-if="datalist.length>=3">
              <div>
                <img src="../../img/home/three.png" alt style="width:2rem;height:2rem" />
              </div>
          
              <div>{{datalist[2].depart}}</div>
              <div>{{datalist[2].integralCount}}</div>
            </div>
            <div v-if="datalist.length>=4">
              <div class="itembodys" v-for="(item, index) in lastlist" :key="index">
                <div class="pm">{{index+4}}</div>
              
                <div>{{item.depart}}</div>
                <div>{{item.integralCount}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { leaderboard,orgLeaderboard, login } from "../../api/http";
export default {
  data() {
    return {
      datalist: [],

      three: [],
      lastlist: [],
      userinfo: {},
      titledata: {},
      my: "",
      bs: ""
    };
  },
  methods: {
    onClick(val) {
      console.log(val);
    if (val==0) {
      this.getleaderboard();
    } else {
        this.getorgLeaderboard()
    }
    },
    gonextpage(id) {
     
      
      this.$router.push({ name: "intdetail", query: { id } });
    },
    async getleaderboard() {
      let res = await leaderboard();
      this.datalist = res.details.data;

      if (this.datalist.length >= 3) {
        this.three = this.datalist.slice(0, 3);
        this.lastlist = [...this.datalist];
        this.lastlist.splice(0, 3);
      }
      this.datalist.forEach((item, index) => {
        if (this.userinfo.id == item.entrance_id) {
          this.my = index;
          item.bs = 0;
          this.titledata = item;
          //  console.log(this.titledata);
        }
      });
    },
   async getorgLeaderboard(){
      let res = await orgLeaderboard()
          this.datalist = res.details.data;

      if (this.datalist.length >= 3) {
        this.three = this.datalist.slice(0, 3);
        this.lastlist = [...this.datalist];
        this.lastlist.splice(0, 3);
      }
      this.datalist.forEach((item, index) => {
        if (this.userinfo.id == item.entrance_id) {
          this.my = index;
          item.bs = 0;
          this.titledata = item;
          //  console.log(this.titledata);
        }
      });
      console.log(this.datalist);
      
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    this.getleaderboard();
  
  }
};
</script>

<style lang="less" scoped>
.over {
  overflow: auto;
  height: 18.7rem;
}
.topbgc {
  width: 100%;
  height: 9.5rem;
  background: url("../../img/home/listbgi.png") center no-repeat;
  background-size: 100%;
}
.icoman {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userstyle {
  width: 100%;
  color: #ffffff;
  font-size: 0.75rem;
  text-align: center;
}
.bgbottom {
  width: 100%;
  height: 4rem;
  display: flex;
  margin-top: 0.5rem;
  .bgl {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    div {
      width: 100%;
      text-align: center;
      color: #fff;
    }
    div:nth-child(1) {
      font-size: 0.85rem;
      height: 40%;
      line-height: 1.6rem;
    }
    div:nth-child(2) {
      font-size: 0.65rem;
      height: 60%;
      line-height: 2.4rem;
    }
  }
  .bgr {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    div {
      width: 100%;
      text-align: center;
      color: #fff;
    }
    div:nth-child(1) {
      font-size: 0.85rem;
      height: 40%;
      line-height: 1.6rem;
    }
    div:nth-child(2) {
      font-size: 0.65rem;
      height: 60%;
      line-height: 2.4rem;
    }
  }
}
.body {
  box-sizing: border-box;
  padding: 0 1rem 0 0.6rem;
  height: 200px;
}
.itembody {
  width: 100%;
  height: 3.8rem;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  padding: 0.8rem 0;
  display: flex;
  div {
    line-height: 2rem;
  }
  div:nth-child(1) {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  div:nth-child(2) {
    flex: 1;
  }
  div:nth-child(3) {
    flex: 3;
  }
  div:nth-child(4) {
    flex: 1;
  }
}
.itembodys {
  width: 100%;
  height: 3.8rem;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  padding: 0.8rem 0;
  display: flex;
  div {
    line-height: 2rem;
  }
  div:nth-child(1) {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  div:nth-child(2) {
    flex: 3;
     overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  div:nth-child(3) {
    flex: 1;
  }

}
.pm {
  text-align: center;
}
</style>