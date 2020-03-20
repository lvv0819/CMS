import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// 告诉 vue “使用” vuex
Vue.use(Vuex);
//获取视频列表数据
var getVideoData = function(num) {
	if(num) {
		state.pageStart = num;
		state.tableList.pageStart = num;
	}
	axios({
		method: 'post',

		url: "/VueHandler/VideoHandler?action=showlist",
		data: {
			pageStart: state.pageStart,
			searchText: state.searchText
		}
	}).then(function(res) {
		state.tableList.list = [];
		if(!res.data.err) {
			state.maxVedioCount = Math.ceil(res.data.data.count / state.pageSize);

			for(var i = 0; i < state.pageSize; i++) {
				// 该条有内容时
				if(res.data.data.list[i]) {
					var obj = {
						ID: res.data.data.list[i].ID,
						Vmosaic: res.data.data.list[i].Vmosaic,
						Vname: res.data.data.list[i].Vname,
						Vstate: res.data.data.list[i].Vstate,
						Vtime: res.data.data.list[i].Vtime,
						_id: res.data.data.list[i]._id,
						Vurl: res.data.data.list[i].Vurl,
						createAt: res.data.data.list[i].createAt,
						updateAt: res.data.data.list[i].updateAt,
						edit: true,
						add: true,
						delete: res.data.data.list[i].Vstate.length == 0 ? true : false
					}
					state.tableList.list.push(obj);
				} else { // 没该条的内容时
					state.tableList.list.push({});
				}
			}
		} else {
			alert(res.data.err);
		};
	});
};

const state = {
	isSwitch: false, //控制添加弹窗的显示
	pageStart: 1, //查询起始页
	pageSize: 3, //每页显示条数
	maxVedioCount: 0, //视频列表的最大页码
	minVedioCount: 1, //视频列表的最小页码
	videoInfor: { // 弹窗中视频数据
		Vname: '',
		Vtime: '',
		Vurl: '',
		ID: ''
	},

	tableList: {
		th_list: [{
				value: "视频名称",
				width: "10%",
				type: 'Vname'
			},
			{
				value: "绑定的课程",
				width: "30%",
				type: 'Vstate'
			},
			{
				value: "视频时长",
				width: "20%",
				type: 'Vtime'
			},
			{
				value: "上传日期",
				width: "20%",
				type: 'createAt'
			},
			{
				value: "操作",
				width: "20%"
			}
		],
		list: [],
		btn_list: {
			_this: this,
			nextClick: function() {
				console.log(this)
				Vue.prototype.$videoStore.commit('addPageStart');
				getVideoData(Vue.prototype.$videoStore.state.pageStart);
			},
			prevClick: function() {
				Vue.prototype.$videoStore.commit('subPrevClick');
				getVideoData(Vue.prototype.$videoStore.state.pageStart);
			},
			lastClick: function() {
				getVideoData(Vue.prototype.$videoStore.state.maxVedioCount);
			},
			firstClick: function() {
				getVideoData(Vue.prototype.$videoStore.state.minVedioCount);
			},
			delete: function(data) {
				axios({
					url: '/VueHandler/VideoHandler?action=delete',
					method: 'GET',
					params: {
						ID: data.ID
					}
				}).then(function(res) {
					console.log(res);
					if(res.data.success) {
						getVideoData()
					} else {
						alert('删除视频失败');
					}
				})
			},
			update: function(data) {
				console.log(data)
				console.log(Vue.prototype.$videoStore)
				Vue.prototype.$videoStore.commit('changSwitch', true);
				Vue.prototype.$videoStore.commit('setInfor', data);
			}
		},
		pageStart: 1,
		getVideoData: getVideoData
	}
};

const mutations = {
	setInfor:function(state, data) { //data 为了编辑准备的
		console.log(data)
		if(data) {
			state.videoInfor.Vname = data.Vname;
			state.videoInfor.Vtime = data.Vtime;
			state.videoInfor.Vurl = data.Vurl;
			state.videoInfor.ID = data.ID;
		} else { //清空
			state.videoInfor.Vname = '';
			state.videoInfor.Vtime = '';
			state.videoInfor.Vurl = '';
			state.videoInfor.ID = '';
		}
	},
	changSwitch: function(state, data) { // 改变弹窗的显示的开关
		state.isSwitch = data;
	},
	addPageStart: function(state) {
		if(state.pageStart < state.maxVedioCount) {
			state.pageStart++;
			state.tableList.pageStart = state.pageStart;
		} else {
			alert('已是最大页数')
		}

	},
	subPrevClick: function(state) {
		if(state.pageStart > 1) {
			state.pageStart--;
			state.tableList.pageStart = state.pageStart;
		} else {
			alert('已是最小页数')
		}
	}

}
// 至此，这个 store 就可以连接到我们的应用
export default new Vuex.Store({
	state,
	mutations
})