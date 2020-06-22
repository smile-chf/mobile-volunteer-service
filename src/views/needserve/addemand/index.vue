<template>
  <!-- 创建页面 -->
  <div class="addemand">
   <van-overlay :show="showoverlay">
      <van-loading class="loading" vertical color="#ff6f10" type="spinner">上传中...</van-loading>
    </van-overlay>


    <div class="unit">
      <p class="title">{{titlename.name}}</p>
      <van-field v-model="updata.name" type="textarea" rows="3" placeholder="请输入" />
    </div>
    <div class="unit">
      <van-field
        disabled
        :label="titlename.need_type"
        v-model="need_type"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" class="_openstyle" position="bottom">
        <van-picker
          show-toolbar
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
          :columns="needType"
        />
      </van-popup>
    </div>
    <div class="unit">
      <van-field label="服务地址" v-model="updata.address" input-align="right" placeholder="请输入 " />
    </div>
    <div class="unit">
      <van-field label="联系方式" v-model="updata.tel" input-align="right" type="number" placeholder="请输入" />
    </div>
    <div class="unit">
      <van-field label="联系人" v-model="updata.username" input-align="right" placeholder="请输入" />
    </div>

    <div class="unit">
      <van-field
        label="服务开始时间"
        disabled
        v-model="updata.startTime"
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
    <div class="unit">
      <van-field
        label="服务结束时间"
        disabled
        v-model="updata.endTime"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker5 = true"
      />
      <van-popup v-model="showPicker5" position="bottom">
        <van-datetime-picker
          v-model="currentDate3"
          type="datetime"
          @confirm="onConfirm5"
          @cancel="showPicker5 = false"
        />
      </van-popup>
    </div>

    <div class="interval">
      <p class="title">{{titlename.content}}</p>
      <van-field v-model="updata.content" type="textarea" rows="2" placeholder="请输入" />
    </div>

    <div class="unit_upload">
      <van-uploader v-model="fileList" multiple :after-read="afterRead" :max-count="3" />
    </div>

    <div class="submit">
      <van-button @click="up">发布</van-button>
    </div>
  </div>
</template>

<script>
import {
  getDemandResourcesType,
  commonsFileUpload,
  add
} from "../../../api/http";
export default {
  data() {
    return {
      showoverlay:false,
      titlename: {},
      title: "",
      need_type: "",
      showPicker1: false,
      needType: [
        { text: "类型1", id: "0" },
        { text: "类型2", id: "2" },
        { text: "类型3", id: "3" }
      ],
      site: "",
      tel: "",
      cut_time: "",
      start_time: "",
      endTime: "",
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      currentDate1: new Date(),
      currentDate2: new Date(),
      currentDate3: new Date(),
      content: "",
      fileList: [],
      updata: {
        imgUrl: []
      },
      imgUrl: []
    };
  },
  methods: {

    //上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      console.log(this.fileList);
    },

    onConfirm1(val) {
      console.log(val.id);
      this.updata.typeId = val.id;
      this.need_type = val.text;
      this.showPicker1 = false;
    },
    onConfirm3(val) {
      this.cut_time = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker3 = false;
    },
    onConfirm4(val) {
      this.updata.startTime = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker4 = false;
    },
    onConfirm5(val) {
      this.updata.endTime = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker5 = false;
    },
    async up() {
      console.log(this.updata.address);
      //  this.$router.push({ path: "/needserve", query:{category:this.updata.category,typeId:this.updata.typeId}});
    if (this.updata.address==""||this.updata.address==undefined) {
        this.$toast.fail({ message: "请输入服务地址", duration: 1000 })
        return
    }
    if (this.updata.content==""||this.updata.content==undefined) {
        this.$toast.fail({ message: "请输入需求内容", duration: 1000 })
        return
    }
    if (this.updata.endTime==""||this.updata.endTime==undefined) {
        this.$toast.fail({ message: "请输入结束时间", duration: 1000 })
        return
    }
    if (this.updata.name==""||this.updata.name==undefined) {
        this.$toast.fail({ message: "请输入需求名称", duration: 1000 })
        return
    }
    if (this.updata.startTime==""||this.updata.startTime==undefined) {
        this.$toast.fail({ message: "请输入开始时间", duration: 1000 })
        return
    }
    if (this.updata.tel==""||this.updata.tel==undefined) {
        this.$toast.fail({ message: "请输入联系方式", duration: 1000 })
        return
    }
    if (this.updata.typeId==""||this.updata.typeId==undefined) {
        this.$toast.fail({ message: "请输入需求类型", duration: 1000 })
        return
    }
    if (this.updata.username==""||this.updata.username==undefined) {
        this.$toast.fail({ message: "请输入联系人", duration: 1000 })
        return
    }

   this.showoverlay=true

      this.imgUrl = [];
      let count = 0;
      this.fileList.forEach(async item => {
        let res = await commonsFileUpload(item.file);
        this.imgUrl.push(res.details.path);
        count++;
      });

      let i = setInterval(async () => {
        if (count == this.fileList.length) {
          this.updata.imgUrl = JSON.stringify(this.imgUrl);
          if (this.updata.imgUrl == "[]") {
            this.$toast.fail({ message: "请上传图片", duration: 1000 });
            this.showoverlay=false
          } else {
            console.log(this.updata);
            
                   let abc = await add(this.updata);
            if (abc.code == 200) {
              this.$toast.success({ message: "创建成功", duration: 1000 });
              setTimeout(() => {
              if(this.updata.category==1){
                  this.$router.push({ path: "/needserve", query:{category:2,typeId:this.updata.typeId}});
              }else{
                 this.$router.push({ path: "/needserve", query:{category:1,typeId:this.updata.typeId}});
              }
                
              }, 1000);
            }
            if (abc.code == 500) {
              this.$notify("服务器错误");
            }
            if (abc.code == 302) {
              this.$notify("登录失效，请重新登录");
            }
          }

          count = 0;
          clearInterval(i);
        }
        // this.showoverlay=false
      }, 1000);
    }
  },
  async created() {
    let res = await getDemandResourcesType();
    this.needType = JSON.parse(
      JSON.stringify(res.details.data).replace(/name/g, "text")
    );
    this.updata.category = this.$route.query.category;
    console.log(this.updata.category);

    if (this.updata.category == 1) {
      //需求入口
      this.titlename = {
        name: "需求名称",
        need_type: "需求类型",
        content: "需求内容"
      };
    } else {
      //资源入口
      this.titlename = {
        name: "资源名称",
        need_type: "资源类型",
        content: "资源内容"
      };
    }
  }
};
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 46%;
  z-index: 10000;
  span {
    color: #ff6f10;
  }
}
.addemand {
  background: #f6f6f6;
  width: 100%;
  height: 100%;
  .unit_upload {
    background-color: #fff;
    padding-left: 0.8rem;
  }
}
.title {
  font-size: 0.75rem;
  color: #333333;
  padding-left: 0.8rem;
  padding-top: 0.6rem;
  background-color: #fff;
}
.unit {
  border-bottom: 1px solid #f6f6f6;
}
.interval {
  border-top: 0.5rem solid #f6f6f6;
}
.submit {
  height: 4.4rem;
  width: 100%;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit button {
  height: 50%;
  width: 91.47%;
  background: #ff6f10;
  color: #ffffff;
  font-size: 0.85rem;
  border-radius: 0.3rem;
  border: none;
}
</style>

<style lang="less">
._openstyle {
  .van-picker__cancel {
    color: #ff6f10;
  }
  .van-picker__confirm {
    color: #ff6f10;
  }
}
</style>