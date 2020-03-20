import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
// 设置数据的函数
const setListData = function(listName, data, dirId) {
	// 清空掉以前的数据
	state.courseContent[listName].list = [];
	switch(listName) {
		case "dirTableList": // 目录列表
			for(var i = 0; i < data.length; i++) {
				if(data[i]) { // 该条数据存在
					var obj = {
						// 该列头部的数据里面的type
						CDName: data[i].CDName, // 用户名
						CourseNumber: data[i].CourseNumber,
						ID: data[i].ID, //目录的ID
						// 控制按钮的属性
						edit: true, // 编辑按钮控制的属性
						delete: true, // 删除按钮 控制的属性
						isClick: false, // 是否 d点击
						click: true
					}
					// 把设置好的数据 添加到  表格内容的数据里面
					state.courseContent[listName].list.push(obj)
				} else { // 该条数据不存在
					state.courseContent[listName].list.push(obj)
				}
			}
			break;
		case "videoTableList": // 视频列表
			for(var i = 0; i < data.length; i++) {
				if(data[i]) {
					var obj = {
						Vname: data[i].Vname,
						Vtime: data[i].Vtime,
						ID: data[i].ID, // 视频的ID
						Did: dirId, // 目录的id

						// 控制按钮的属性
						delete: true,
					}
					// 把设置好的数据 添加到  表格内容的数据里面
					state.courseContent[listName].list.push(obj)
				} else { // 该条数据不存在
					state.courseContent[listName].list.push({})
				}
			}
			break;
	}
}

//  获取课程信息的函数
const getCourseInfoData = function(ID) {

	// 清除目录与视频表格中数据
	state.courseContent.videoTableList.list = [];
	state.courseContent.dirTableList.list = [];

	axios({
		url: "/VueHandler/CourseHandler?action=getcourse",
		method: "get",
		params: {
			ID: ID // 课程的ID
		}
	}).then((res) => {
		if(res.data.success) {
			//  课程的基本信息
			let courselist = res.data.data.courselist;
			//  课程目录的信息
			let dirlist = res.data.data.dirlist;
			//  赋值课程到的具体信息
			state.courseInfo.ID = courselist.ID;
			state.courseInfo.Cname = courselist.Cname;
			state.courseInfo.Cdescribe = courselist.Cdescribe;
			state.courseInfo.Cprice = courselist.Cprice;
			state.courseInfo.Cpic = courselist.Cpic;
			state.courseInfo.Cdetails = courselist.Cdetails;
			// 保存课程的分类
			state.courseInfo.category.one = courselist.CategoryOne || "";
			state.courseInfo.category.two = courselist.CategoryTwo || "";
			state.courseInfo.category.three = courselist.CategoryThree || "";
			// 设置目录信息
			setListData('dirTableList', dirlist);
		} else {
			alert(res.data.err)
		}
	}).catch((err) => {
		alert(err)
	})
}
const state = {
	// 添加课程的按钮 和遮罩层的控制
	addCourseSwitch: true,

	// 弹窗数据
	// 目录弹窗
	dirAlertData: {
		CDName: "",
		ID: "",
		CDid: ""
	},
	selectVideAlertData: {
		ID: "" // 目录的ID
	},

	//  页面上按钮
	btnList: {
		addCoutse: function() {
			axios({
				url: "/VueHandler/CourseHandler?action=add",
				method: "post",
				data: {
					Cname: state.courseInfo.Cname, // 课程名称
					Cdescribe: state.courseInfo.Cdescribe, // 课程描述
					Cprice: state.courseInfo.Cprice, // 价格
					CategoryOne: state.courseInfo.newCategory.one, // 一级分类
					CategoryTwo: state.courseInfo.newCategory.two, // 二级分类
					CategoryThree: state.courseInfo.newCategory.three, // 三级分类
					Cpic: state.courseInfo.Cpic, // 封面地址
				}
			}).then((res) => {
				if(res.data.success) {
					console.log(res)
					window.location.hash = "/courseEdit/" + res.data.ID
					Vue.prototype.$courseEditStore.commit('changeAddCourseSwitch', false);
					getCourseInfoData(res.data.ID);
				} else {
					alert(res.data.err)
				}
			}).catch((err) => {
				alert(err)
			})
		},
		saveCoutse: function() { // 课程的整体保存
			axios({
				url: "/VueHandler/CourseHandler?action=update",
				method: "post",
				data: {
					Cname: state.courseInfo.Cname, // 课程名称
					Cdescribe: state.courseInfo.Cdescribe, // 课程描述
					Cprice: state.courseInfo.Cprice, // 价格
					CategoryOne: state.courseInfo.newCategory.one, // 一级分类
					CategoryTwo: state.courseInfo.newCategory.two, // 二级分类
					CategoryThree: state.courseInfo.newCategory.three, // 三级分类
					Cpic: state.courseInfo.Cpic, // 封面地址
					ID: state.courseInfo.ID, //  课程id
					Cdetails: state.courseInfo.Cdetails, //	课程详情
				}
			}).then((res) => {
				if(res.data.success) {
					window.location.hash = "/course"
				} else {
					alert(res.data.err)
				}
			}).catch((err) => {
				alert(err)
			})
		}
	},
	//  控制弹窗的开关
	alertSwitch: {
		addDir: false,
		selectVideo: false,
		uploadImg: false
	},
	// 课程信息
	courseInfo: {
		ID: "", // 课程的id
		getCourseInfoData: getCourseInfoData,
		Cname: "", //课程名称
		Cprice: "", // 价格
		Cdescribe: "", // 描述
		Cpic: "", // 封面地址
		category: { // 类型
			one: "",
			two: "",
			three: ""
		},
		newCategory: { // 新类型
			one: "",
			two: "",
			three: ""
		},
		Cdetails: "" // 课程详情
	},
	// 课程内容
	courseContent: {
		setListData: setListData, // 设置表格内容的函数
		dirTableList: { // 目录表格
			th_list: [{
					value: "目录",
					type: 'CDName',
					width: "20%"
				},
				{
					value: "课件数",
					tyoe: 'CourseNumber',
					width: "50%"
				},
				{
					value: "操作",
					width: "30%"
				},
			],
			list: [],
			btn_list: { // 表格的方法
				delete: function(data) { // 删除目录
					axios({
						url: "/VueHandler/CourseHandler?action=deleteDirectory",
						method: "get",
						params: {
							ID: data.ID // 课程的ID
						}
					}).then((res) => {
						if(res.data.success) {
							alert('删除成功');
							//  设置目录的方法
							setListData('dirTableList', res.data.data);
							state.courseContent.videoTableList.list = [];
						} else {
							alert(res.data.err)
						}
					}).catch((err) => {
						alert(err)
					})
				},
				update: function(dirData) { // 更新目录
					Vue.prototype.$courseEditStore.commit('changeAlertSwitch', {
						type: "addDir",
						switch: true
					});
					Vue.prototype.$courseEditStore.commit('setDirAlertData', dirData);
				},
				getVideoList: function(data) { // 获取 视频
					// state.courseContent.videoTableList.list = [];
					state.selectVideAlertData.ID = data.ID; // 目录的ID
					axios({
						url: "/VueHandler/VideoHandler?action=showdir",
						method: "get",
						params: {
							ID: data.ID // 目录ID
						}
					}).then((res) => {
						if(res.data.success) {
							//  设置视频数据的方法
							setListData('videoTableList', res.data.data, data.ID);

						} else {
							alert(res.data.err)
						}
					}).catch((err) => {
						alert(err)
					})
				}
			},
			hideFoot: true, //控制分页器是否显示的属性
			isClick: false // 判断是否点击
		},
		videoTableList: { // 视频列表
			th_list: [{
					value: "视频名称",
					type: 'Vname',
					width: "20%"
				},
				{
					value: "时长",
					type: 'Vtime',
					width: "60%"
				},
				{
					value: "操作",
					width: "20%"
				}
			],
			list: [],
			btn_list: { // 表格的方法
				delete: function(data) { // 删除目录中的视频
					axios({
						url: "/VueHandler/CourseHandler?action=delvideo",
						method: "get",
						params: {
							Did: data.Did, // 目录ID
							ID: data.ID // 课件id（视频id）
						}
					}).then((res) => {
						if(res.data.success) {
							alert("删除视频成功");
							setListData('videoTableList', res.data.data.list, data.Did);
						} else {
							alert(res.data.err)
						}
					}).catch((err) => {
						alert(err)
					})
				}
			},
			hideFoot: true, //控制分页器是否显示的属性
		}
	}
}

const mutations = {
	clearCourseInfo: function(state) {
		state.courseInfo = {
			ID: "", // 课程的id
			getCourseInfoData: getCourseInfoData,
			Cname: "", //课程名称
			Cprice: "", // 价格
			Cdescribe: "", // 描述
			Cpic: "", // 封面地址
			category: { // 类型
				one: "",
				two: "",
				three: ""
			},
			newCategory: { // 新类型
				one: "",
				two: "",
				three: ""
			},
			Cdetails: "" // 课程详情
		}
	},

	changeAddCourseSwitch: function(state, data) {
		state.addCourseSwitch = data;
	},
	changeAlertSwitch: function(state, data) {
		// 调用的传递的参数 {type:"改变弹窗控制的类型",switch:"改变后的开关"}
		if(data.type == "selectVideo") {
			var list = state.courseContent.dirTableList.list;
			for(var i = 0, len = list.length; i < len; i++) {
				if(list[i].isClick == true) {
					state.alertSwitch[data.type] = data.switch;
					return false;
				}
			}
			alert('请选择添加视频的目录')
		} else {
			state.alertSwitch[data.type] = data.switch;
		}
	},
	setCategory: function(state, data) { // 设置权限数据
		state.courseInfo.newCategory = { // 类型
			one: data.categoryOne,
			two: data.categoryTwo,
			three: data.categoryThree
		}
	},
	setDirAlertData: function(state, dirData) {
		state.dirAlertData.Cid = state.courseInfo.ID; // 课程ID
		if(dirData) {
			state.dirAlertData.CDName = dirData.CDName;
			state.dirAlertData.ID = dirData.ID;
		} else {
			state.dirAlertData.CDName = "";
			state.dirAlertData.ID = "";
		}
	}
}
export default new Vuex.Store({
	state,
	mutations
})