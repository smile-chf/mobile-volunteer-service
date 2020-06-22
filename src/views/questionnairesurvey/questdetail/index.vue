<template>
  <div class="questdetail">
    <div class="request">
      <div class="title">居民朋友：您好</div>
      <div class="retract">
        我们是海恒社区居委会的工作人员，正在开展一
        项关于居民对社区志愿服务需求的调查，问卷以随机
        抽样形式发放，不涉及您的个人详细信息，请您放心
        希望您能抽出一点时间帮助我们完成这份意见征集表
      </div>

      <van-field v-model="name" input-align="right" placeholder="请输入" label="填卷人" />
      <van-field v-model="site" input-align="right" placeholder="请输入" label="小区名称" />
      <van-field
        label="日期"
        disabled
        v-model="time"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker4 = true"
      />
      <van-popup v-model="showPicker4" position="bottom">
        <van-datetime-picker
          v-model="currentDate2"
          type="datetime"
          @confirm="onConfirm4"
          @cancel="showPicker4 = false"
        />
      </van-popup>
    </div>
    <div class="liststyle">
      <div class="itemti" v-for="(item, index) in list.radioList" :key="index">
        <div class="itemtitle">
          <div>{{index+1}}、</div>
          <div class="redbox">单选</div>
          <div>{{item.content}}</div>
        </div>
        <van-radio-group v-model="somelist[index]">
          <div class="itemcontent">
            <van-radio
              checked-color="#FF6F10"
              :name="otheritem.value"
              v-for="(otheritem, index) in item.optionList"
              :key="index"
            >{{otheritem.title}}</van-radio>
          </div>
        </van-radio-group>
      </div>
      <div class="itemti" v-for="(item, index) in list.radioList" :key="index">
        <div class="itemtitle">
          <div>{{index+1}}、</div>
          <div class="redbox">单选</div>
          <div>{{item.content}}</div>
        </div>
        <van-checkbox-group v-model="somelists[index]">
          <div class="itemcontent">
            <van-checkbox
              checked-color="#FF6F10"
              :name="otheritem.value"
              v-for="(otheritem, index) in item.optionList"
              :key="index"
            >{{otheritem.title}}</van-checkbox>
          </div>
        </van-checkbox-group>
      </div>
    </div>
    <div @click="dosome">
        hahah 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      site: "",
      time: "",
      showPicker4: false,
      currentDate2: new Date(),
      list: {
        answer: null,
        endDate: "2020-04-24 13:59:36",
        joinCount: 0,
        multipleList: [],
        askList: [],
        id: 3,
        title: "你瞅啥呢？",
        radioList: [
          {
            optionList: [
              { title: "张三", value: "张三_12" },
              { title: "李四", value: "李四_12" }
            ],
            id: 12,
            type: "2",
            content: "你好"
          }
        ]
      },
      somelist: [],
      somelists: [],
    };
  },
  methods: {
    onConfirm4(val) {
      this.time = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker4 = false;
    },
     dosome(){
      console.log(this.somelists);
      console.log(this.somelist);
      
  }
  },
 
};
</script>

<style lang="less" scoped>
.questdetail {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
}
.request {
  background-color: #fff;
  padding: 0.8rem 0.8rem 0 0.8rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}
.retract {
  text-indent: 1rem;
  line-height: 1rem;
  font-size: 0.75rem;
}
.title {
  line-height: 1rem;
  font-size: 0.75rem;
}
.liststyle {
  width: 100%;
  padding: 0 0.8rem;
  background: #fff;
  box-sizing: border-box;
}
.itemtitle {
  height: 3.05rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  .redbox {
    width: 1.6rem;
    height: 1rem;
    background-color: #FF6F10;
    color: #fff;
    text-align: center;

    margin: 0 8px;
    font-size: 0.6rem;
    line-height: 1rem;
  }
}
.itemcontent {
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
</style>
<style lang="less">
.questdetail {
  .van-cell {
    padding: 10px 0;
    border-bottom: 1px solid #f6f6f6;
  }

  .van-checkbox__icon--checked .van-icon {
    color: #fff;
    background-color: #FF6F10;
  }
  .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
  }
  .van-checkbox__label--disabled {
    color: #333;
  }
  .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
    color: #fff;
  }
  .van-radio__icon--checked .van-icon {
    background-color: #FF6F10;
  }
  .van-radio__label--disabled {
    color: #333;
  }
  .van-radio {
  height: 3.05rem;
}
  .van-checkbox {
  height: 3.05rem;
}
}
</style>