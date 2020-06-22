<template>
  <div class="sitepage">
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      show-delete
      save-button-text="确认兑换"
      delete-button-text="删除地址"
    />
  </div>
</template>

<script>
import areaList from "../../../../static/area";
export default {
  data() {
    return {
      areaList
    };
  },
  methods: {
    onSave(val) {
      console.log(val);
    },
    onDelete() {
     this.$router.go(-1)
      
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.sitepage{
  .van-button--danger {
    color: #fff;
    background-color: #ff6f10;
    border: 1px solid #ff6f10;
}
}

</style>