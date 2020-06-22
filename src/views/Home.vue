<template>
  <div class="home">
    <div class="banner">
      <img src="@/img/home/titletop.png" alt />
    </div>
    <div class="module">
      <div class="title">
        <p class="text">基础服务</p>
      </div>
      <div class="module_main">
        <router-link tag="div" :to="{path:'/needserve',query:{category:1}}" class="unit">
          <img src="@/img/home/ico.png" alt />
          <p class="textcolor">需求服务</p>
        </router-link>
        <router-link tag="div" :to="{path:'/needserve',query:{category:2}}" class="unit">
          <img src="@/img/home/ico2.png" alt />
          <p class="textcolor">资源服务</p>
        </router-link>
        <router-link tag="div" to="/volunteerserve" class="unit">
          <img src="../img/home/active.png" alt />
          <p class="textcolor">志愿活动</p>
        </router-link>
        <router-link tag="div" to="/signin" class="unit">
          <img src="../img/home/qiandao.png" alt />
          <p class="textcolor">快捷签到</p>
        </router-link>
       
      </div>

      <div style="height:0.5rem ;background-color:#f6f6f6"></div>
      <div class="title">
        <p class="text">积分服务</p>
      </div>
      <div class="module_main">
        <!-- <router-link tag="div" to="/questionnairesurvey" class="unit">
          <img src="@/img/home/ico1.png" alt />
          <p class="textcolor">问卷征集</p>
        </router-link>
        <router-link tag="div" :to="{path:'/questionstatistics',query:{identifying:0}}" class="unit">
          <img src="@/img/home/query.png" alt />
          <p class="textcolor">问卷统计</p>
        </router-link>
        <router-link tag="div"  :to="{path:'/questionstatistics',query:{identifying:1}}" class="unit">
          <img src="@/img/home/zhiyuan.png" alt />
          <p class="textcolor">志愿统计</p>
        </router-link> -->
         <router-link tag="div" to="/integrallist" class="unit">
          <img src="@/img/home/ico3.png" alt />
          <p class="textcolor">积分排行</p>
        </router-link>
        <!-- <router-link tag="div" to="/shopping" class="unit">
          <img src="@/img/home/shopping.png" alt />
          <p class="textcolor">积分兑换</p>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { testLogin ,getUserInSession} from "../api/http";
export default {
  data() {
    return {
      info:""
    }
  },
  methods: {
      goBack(){
    // this.$router.replace({path: "/"});
    //replace替换原路由，作用是避免回退死循环
  },
    gopage() {
      // this.$router.push({ path: "/threemeeting" });
     window.location.href=this.$url
    },
    goparty() {
      this.$router.push({ path: "/party" });
    }
  },

  async created() {
    // let res = await testLogin();
    let abc = await getUserInSession()
     window.localStorage.setItem('userinfo', JSON.stringify(abc.details.data))
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
    destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
};
</script>

<style lang="less" scoped>
.textcolor {
  color: #8e8e93 !important;
}

.home {
  background: #f6f6f6;
  width: 100%;
  height: 100vh;
}

.banner {
  width: 100%;
  height: 8.2rem;
}

.banner img {
  width: 100%;
  height: 100%;
}

.cut {
  margin-top: 0.5rem;
}

.module {
  width: 100%;
  background: #ffffff;
}

.title {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0.8rem 0 0.6rem 0.8rem;
  box-sizing: border-box;
}

.title .line {
  width: 0.1rem;
  height: 0.7rem;
  background: #f54133;
  margin-left: 0.8rem;
  margin-right: 0.6rem;
}

.title .text {
  font-size: 0.75rem;
  color: #333333;
}

.module_main {
  display: flex;
  flex-wrap: wrap;
}

.module_main .unit {
  width: 25%;
  height: 4.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.module_main .unit img {
  width: 2.2rem;
  height: 2.2rem;
}

.module_main .unit p {
  width: 100%;
  text-align: center;
  font-size: 0.6rem;
  color: #333333;
 
}
</style>