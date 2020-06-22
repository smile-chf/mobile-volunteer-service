import request from "../utils/request";

function login() {
  return request({
    url: "/volunteerService/user/login",
    method: "POST",
    data: {
      username: "kf123",
      password: "kf123456"
    }
  });
}
//模拟登陆
function testLogin() {
  return request({
    url: "/volunteerService/mobile/user/testLogin",
    method: "POST",
  });
}
//需求服务新增 需求类接口
function getUserInSession() {
  return request({
    url: "/volunteerService/mobile/user/getUserInSession",
    method: "GET",
  });
}
//需求服务新增 需求类接口
function getDemandResourcesType() {
  return request({
    url: "/volunteerService/mobile/demandResourceType/getDemandResourcesType",
    method: "GET",
  });
}

//上传图片
function commonsFileUpload(file) {
  let fd = new FormData()
  fd.append('file', file)
  //   
  return request({
    url: "/volunteerService/ftp/commonsFileUpload",
    method: "POST",
    data: fd
  });
}
//需求服务新增 
function add(data) {
  return request({
    url: "/volunteerService/mobile/demandResources/add",
    method: "POST",
    data: {
      ...data
    }
  });
}
//需求服务列表查询
function getDemandResources({
  typeId,
  search,
  sort,
  category
}) {
  // console.log(typeId);

  return request({
    url: `/volunteerService/mobile/demandResources/getDemandResources?search=${search}&sort=${sort}`,
    method: "POST",
    data: {
      category,
      typeId: typeId,
    }
  });
}
//需求服务按照id查询详情信息
function getDemandResourcesById(id) {
  return request({
    url: "/volunteerService/mobile/demandResources/getDemandResourcesById",
    method: "GET",
    params: {
      id
    }
  });
}
//需求服务按照id查询详情信息
function getDemandResourcesUsers(id, status) {
  return request({
    url: "/volunteerService/mobile/demandResourcesUser/getDemandResourcesUsers",
    method: "GET",
    params: {
      id,
      status
    }
  });
}
//需求服务已认领上传照片
function update({
  id,
  publishImgUrl,
  status,
  receiveImgUrl
}) {
console.log(  id,
  publishImgUrl,
  status,
  receiveImgUrl);

  if (publishImgUrl == undefined) {
    return request({
      url: "/volunteerService/mobile/demandResourcesUser/update",
      method: "POST",
      data: {
        id,
        receiveImgUrl,
        status
      }
    });
  }
  if (receiveImgUrl == undefined) {
    return request({
      url: "/volunteerService/mobile/demandResourcesUser/update",
      method: "POST",
      data: {
        id,
        publishImgUrl,
        status
      }
    });
  }




  // return request({
  //   url: "/volunteerService/mobile/demandResourcesUser/update",
  //   method: "POST",
  //   data:{
  //     id,
  //     publishImgUrl,
  //     status
  //   }
  // });
}

function checkmanupdate (id) {
return request({
  url: "/volunteerService/mobile/demandResourcesUser/update",
  method: "POST",
  data: {
    id,
    status:1
  }
});}

//需求服务撤销需求
function undo(id) {
  return request({
    url: "/volunteerService/mobile/demandResources/undo",
    method: "GET",
    params: {
      id,
    }
  });
}
//需求服务领取任务接口
function demandResourcesUser({drId,name,tel,publishEntranceId,receiveEntranceId}) {
  return request({
    url: "/volunteerService/mobile/demandResourcesUser/add",
    method: "POST",
    data: {
      drId,name,tel,publishEntranceId,receiveEntranceId,
      status:0
    }
  });
}

//积分排行查询
function leaderboard() {
  return request({
    url: "/volunteerService/mobile/demandResourcesUserIntegral/leaderboard",
    method: "GET",

  });
}
//组织排行查询
function orgLeaderboard() {
  return request({
    url: "/volunteerService/mobile/demandResourcesUserIntegral/orgLeaderboard",
    method: "GET",

  });
}
//积分排行查询详细信息
function integralDetail(entranceId) {
  return request({
    url: "/volunteerService/mobile/demandResourcesUserIntegral/integralDetail",
    method: "GET",
   params:{
    entranceId
   }
  });
}



//志愿服务首页列表展示
function getActivityList(type, title) {
  return request({
    url: `/volunteerService/mobile/activity/getActivityList?type=${type}&title=${title}`,
    method: "GET",
  });
}
//志愿服务活动类型接口
function getActivityTypeList() {
  return request({
    url: '/volunteerService/mobile/activity/getActivityTypeList',
    method: "GET",
  });
}

//志愿服务创建接口
function saveActivity(data) {
  return request({
    url: "/volunteerService/mobile/activity/saveActivity",
    method: "POST",
    data: {
     ...data
    }
  });
}

function getActivityDetail(id) {
  return request({
    url: `/volunteerService/mobile/activity/getActivityDetail/${id}`,
    method: "GET",
  });
}
function joinActivity(id) {
  return request({
    url: `/volunteerService/mobile/activity/joinActivity/${id}`,
    method: "GET",
  });
}

// 详情页面人员列表
function getJoinActivityPeopleList(id) {
  return request({
    url: `/volunteerService/mobile/activity/getJoinActivityPeopleList/${id}`,
    method: "GET",
  });
}
//志愿服务需求推荐弹出层
function queryByCategory(category,typeId) {
  return request({
    url: `/volunteerService/mobile/demandResources/queryByCategory/${category}/${typeId}`,
    method: "GET",
  });
}
//志愿活动推荐弹出层
function activityqueryByCategory(typeId) {
  return request({
    url: `/volunteerService/mobile/activity/queryByCategory/${typeId}`,
    method: "GET",
  });
}
//志愿活动推荐弹出层
function getActivityMemberDetails(id,status) {
  return request({
    url: '/volunteerService/mobile/activity/getActivityMemberDetails',
    method: "GET",
    params:{
      id,status
    }
  });
}
//志愿活动活动签到列表
function getMyPublishActivityList(status) {
  return request({
    url: '/volunteerService/mobile/activity/getMyPublishActivityList',
    method: "GET",
    params:{
      status
    }
  });
}
//志愿活动活动签到列表详情
function qdgetActivityDetail(id) {
  return request({
    url: '/volunteerService/mobile/activity/getActivityDetail',
    method: "GET",
    params:{
      id
    }
  });
}
//志愿活动活动签到列表详情立即签到
function punch(activityId) {
  return request({
    url: '/volunteerService/mobile/activity/punch',
    method: "GET",
    params:{
      activityId
    }
  });
}
//志愿活动活动签到列表详情立即签到详情列表
function getPunchInDetails(activityId) {
  return request({
    url: '/volunteerService/mobile/activity/getPunchInDetails',
    method: "GET",
    params:{
      activityId
    }
  });
}




export {
  login,
  testLogin,
  getDemandResourcesType,
  commonsFileUpload,
  add,
  getDemandResources,
  getDemandResourcesById,
  getDemandResourcesUsers,
  getUserInSession,
  update,
  checkmanupdate,undo,demandResourcesUser,leaderboard,orgLeaderboard,integralDetail,getActivityList,getActivityTypeList,saveActivity,getActivityDetail,
  joinActivity,getJoinActivityPeopleList,queryByCategory,activityqueryByCategory,getActivityMemberDetails,getMyPublishActivityList,
  qdgetActivityDetail,punch,getPunchInDetails
}