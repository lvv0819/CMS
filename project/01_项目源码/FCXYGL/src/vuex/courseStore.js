import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
Vue.use(Vuex);

//  获取课程分类数据
(function() {
	axios({
			method: "get",
			url: "/VueHandler/CourseHandler?action=getcategory"
		})
		.then(res => {
			if(res.data.success) {
				state.catalogList = res.data.data;
			} else {
				alert(res.data.err);
			}
		})
		.catch(err => {
			alert(err);
		});
})();

// 获取所属分类
var getCategory = function(sysId) {
	for(let i = 0, len = state.catalogList.length; i < len; i++) {
		if(state.catalogList[i].sysId === parseInt(sysId)) {
			return state.catalogList[i].title;
		}
	}
	return '暂无分类';
}

// 调取数据的方法
var getCourseData = function(num) {
	if(num) {
		state.pageStart = num;
		state.tableList.pageStart = state.pageStart;
	}
	axios({
		method: "post",
		url: "/VueHandler/CourseHandler?action=show",
		data: {
			searchText: state.searchText, // 查询字段（模糊用户名 & 邮箱 & 手机号）
			CategoryOne: state.categoryData.one, // 第一级分类的id
			CategoryTwo: state.categoryData.two, // 第二级分类的id
			CategoryThree: state.categoryData.three, // 第三级分类的id
			pageStart: state.pageStart // 请求第几页

		}
	}).then(function(res) {
		state.tableList.list = [];
		// 判断数据请求成功没有
		if(res.data.err) { // 请求数据失败
			alert(res.data.err)
		} else { // 请求数据成功
			state.maxCourseCount = Math.ceil(res.data.data.count / state.pageSize);
			// 清空掉以前的数据

			for(var i = 0; i < res.data.data.pageSize; i++) {
				if(res.data.data.list[i]) { // 该条数据存在
					var obj = {
						// 该列头部的数据里面的type
						Cname: res.data.data.list[i].Cname, // 用户名
						Cnumber: res.data.data.list[i].Cnumber,
						onlineUser: res.data.data.list[i].onlineUser,
						category: getCategory(res.data.data.list[i].CategoryThree),

						CategoryOne: res.data.data.list[i].CategoryOne,
						CategoryTwo: res.data.data.list[i].CategoryTwo,
						CategoryThree: res.data.data.list[i].CategoryThree,

						createAt: res.data.data.list[i].createAt,
						isState: res.data.data.list[i].isState === 1 ? "<span >草稿</span>" : res.data.data.list[i].isState === 2 ? "<span >在架</span>" : "<span style='color:red;'>已下架</span>",
						stateNum: res.data.data.list[i].isState,
						// stickText:!response.data.data.list[i].isTop?"置顶":"取消置顶",
						ID: res.data.data.list[i].ID, // ID
						isTop: res.data.data.list[i].isTop,
						// 控制按钮的属性
						frame: true, // 控制上架和下架
						stick: true, // 控制 置顶
						edit: true, // 编辑按钮控制的属性
						delete: true, // 控制删除按钮
					}
					state.tableList.list.push(obj)
				} else {
					state.tableList.list.push({})
				}
			}
		}
	}).catch(function(err) {
		alert(err)
	})
}

var state = { // 数据

	catalogList: [], //分类数据
	// 与分页和查询有管的数据
	// 查询
	searchText: "",
	categoryData: {
		one: "",
		two: "",
		three: ""
	},
	pageStart: 1, // 页数查询的条件
	// 分页
	maxCourseCount: 0, // 最大的页数
	minCourseCount: 1, // 最小的页数
	pageSize: 3, // 每一页的条数

	tableList: { // 表格数据
		pageStart: 1, // 分页器上的页码
		getCourseData: getCourseData, // 调取管理数据的方法
		th_list: [ // 表头
			{
				value: "课程名称",
				type: 'Cname',
				width: "12%"
			},
			{
				value: "课程代号",
				type: 'Cnumber',
				width: "12%"
			},
			{
				value: "在学人数",
				type: 'onlineUser',
				width: "12%"
			},
			{
				value: "所属分类",
				type: 'category',
				width: "12%"
			},
			{
				value: "编辑日期",
				type: 'createAt',
				width: "20%"
			},
			{
				value: "状态",
				type: 'isState',
				width: "12%"
			},
			{
				value: "操作",
				width: "20%"
			}
		],
		list: [], // 表格内容
		btn_list: { // 表格功能按钮

			setFrame: function(data) { // 设置上下架
				axios({
					url: "/VueHandler/CourseHandler?action=state",
					method: "post",
					data: {
						ID: data.ID
					}
				}).then((res) => {
					if(res.data.success) {
						getCourseData();
					} else {
						alert(res.data.err)
					}
				}).catch((err) => {
					alert(err)
				})
			},

			top: function(data) { // 置顶
				axios({
					url: "/VueHandler/CourseHandler?action=top",
					method: "post",
					data: {
						ID: data.ID
					}
				}).then((res) => {
					if(res.data.success) {
						getCourseData();
					} else {
						alert(res.data.err)
					}
				}).catch((err) => {
					alert(err)
				})
			},

			// 编辑的方法
			update: function(data) { //
				window.location.hash = "/courseEdit/" + data.ID
			},
			// 删除的方法
			delete: function(data) { //
				axios({
					url: "/VueHandler/CourseHandler?action=delete",
					method: "post",
					data: {
						ID: data.ID // 用户的id ==> tokenId
					}
				}).then(function(res) {
					if(res.data.success) { // 删除成功
						alert('删除成功');
						getCourseData();
					} else {
						alert(res.data.err)
					}
				}).catch(function(err) {
					alert(err)
				})
			},
			// 分页的方法
			firstClick: function() { // 第一页
				getCourseData(Vue.prototype.$courseStore.state.minCourseCount)
			},
			lastClick: function() { // 最后一页
				getCourseData(Vue.prototype.$courseStore.state.maxCourseCount);
			},
			nextClick: function() { // 下一页  当前页数 ++
				Vue.prototype.$courseStore.commit('addPageStart')
				getCourseData();
			},
			prevClick: function() {
				Vue.prototype.$courseStore.commit('subPageStart');
				getCourseData();
			}

		}
	}
};
var mutations = {
	addPageStart: function(state) { // 页数++

		console.log(state.pageStart)
		if(state.pageStart < state.maxCourseCount) {
			state.pageStart++;

			state.tableList.pageStart = state.pageStart;
		} else {
			alert('已是最大页数')
		}
	},
	subPageStart: function(state) { // 页数--
		if(state.pageStart > state.minCourseCount) {
			state.pageStart--;
			state.tableList.pageStart = state.pageStart;
		} else {
			alert('已是最小页数')
		}
	},
	setCategory: function(state, data) { // 设置权限数据
		state.categoryData = { // 类型
			one: data.categoryOne,
			two: data.categoryTwo,
			three: data.categoryThree
		}
	}
};
export default new Vuex.Store({
	state,
	mutations
})