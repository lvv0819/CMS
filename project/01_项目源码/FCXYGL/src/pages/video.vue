<template>
	<div>
		<div>
			<fchead></fchead>
			<!--使用头部-->
		</div>
		<!--搜索框  + 按钮-->
		<div class="adminListContent ">
			<!-- 全包裹 -->
			<span style="color:#2880E4">首页/</span> <span>课程管理/</span> <span>视频管理</span>
			<!-- 导航  ===》 面包屑导航  -->
			<div class="fc_section_wrap">
				<!-- 搜索 还有 添加的按钮 -->
				<ul>
					<li class="admin_top_input">
						<input type="text" v-model="searchText" placeholder="模糊查询：视频名称" />
					</li>
					<li>
						<button class="btn_class" style="background: #5cb85c;" @click="search()">查询</button>
					</li>
					<li class="admin_top_add">
						<button @click="alertShow" class="btn_class" style="background:#4F66B3;">+ 添加</button>
					</li>
				</ul>
			</div>

			<!-- 表格 -->
			<div class="box">
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">视频列表</div>
				</div>
				<div class="box_bottom">
					<table-list v-bind:tableListData="tableListData"></table-list>
				</div>
			</div>

		</div>
		<!--弹窗-->
		<div v-show="isSwitch">
			<!--绑定了弹窗是否  样式-->
			<video-alert></video-alert>
		</div>
	</div>
</template>
<script>
	/*加载公共头部  fchead*/
	import fchead from "@/components/fchead.vue";
	/*加载  弹窗*/
	import videoAlert from "@/components/videoAlert.vue";
	// 表格组件
	import tableList from "@/components/tableList.vue";
	// 视频管理员
	import videoStore from "@/vuex/videoStore.js";

	export default {
		components: {
			fchead,
			videoAlert,
			tableList
		},
		data: function() {
			return {
				tableListData: videoStore.state.tableList, // 绑定表格的数据
				searchText: ""
			};
		},
		computed: {
			isSwitch: function() {
				return videoStore.state.isSwitch;
			}
		},

		methods: {
			search: function() {
				videoStore.state.searchText = this.searchText;
				videoStore.state.tableList.getVideoData();
				videoStore.state.searchText = "";
				this.searchText = "";
			},
			alertShow: function() {
				// 显示弹窗的函数
				videoStore.commit("changSwitch", true); // 显示数据
				videoStore.commit("setInfor"); // 显示数据
			}
		},
		mounted: function() {
			// 挂载之后加载数据
			videoStore.state.tableList.getVideoData();
		}
	};
</script>
<style scoped="">
	.adminListContent {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		background: #f5f5f5;
		min-width: 1100px;
		height: 100%;
	}
	
	.admin_top_input input {
		width: 250px;
		height: 25px;
		padding-left: 5px;
	}
	
	.fc_section_wrap {
		height: 35px;
		padding: 10px;
		border: 1px solid #c0c0c0;
		background: #ffffff;
		margin-top: 15px;
		margin-bottom: 15px;
		min-width: 1100px;
	}
	
	.fc_section_wrap ul {
		margin: 0;
		padding: 0;
	}
	
	.fc_section_wrap ul li {
		display: inline-block;
		margin: 0;
		margin-right: 5px;
		padding: 0;
	}
	
	.admin_top_add {
		float: right;
	}
	
	.btn_class {
		width: 80px;
		height: 32px;
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
		color: #fff;
		margin-right: 10px;
	}
	
	.box {
		width: 100%;
		line-height: 34px;
		background: #fff;
		text-align: left;
		margin-top: 15px;
		border: 1px solid #c0c0c0;
	}
	
	.box_top {
		height: 34px;
		position: relative;
		border-bottom: 1px solid #c0c0c0;
	}
	
	.box_left {
		position: absolute;
		width: 34px;
		height: 34px;
		border-right: 1px solid #c0c0c0;
		background: url(../assets/box.png) no-repeat center;
	}
	
	.box_right {
		padding-left: 40px;
	}
	
	.box_bottom {
		overflow: hidden;
	}
</style>