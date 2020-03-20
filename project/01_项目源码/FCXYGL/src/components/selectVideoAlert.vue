<template>
	<div class="alert-shade">
		<!--遮罩-->
		<div class="alert-box">
			<!-- 具体的容器-->
			<div class="alert-head">
				<span class="head-title">添加课件</span>
				<img @click="close()" src="../assets/images/x.png">
			</div>
			<ul class="alert-body">
				<li>
					<input type="text" placeholder="模糊查询：视频名称" /> <button class="btn btn-serach">查询</button>
					<button class="btn btn-info" @click="close()">关闭弹窗</button>
				</li>
			</ul>
			<div style="margin:0 15px; border: 1px solid #c0c0c0;">

				<table-list :tableListData='tableListData' :appendDir='appendDir'></table-list>
			</div>
			<!-- <div style="padding-top:15px;">
        <button class="btn btn-success" @click="enter()">确定</button>
        <button class="btn btn-info" @click="close()">取消</button>
      </div> -->
		</div>
	</div>
</template>

<script>
	import courseEditStore from "../vuex/courseEditStore.js";

	import tableList from "./tableList.vue";

	import videoStore from "../vuex/videoStore";
	export default {
		components: {
			tableList
		},
		mounted: function() {
			// 挂载之后加载数据
			videoStore.state.tableList.getVideoData();
		},
		data() {
			return {
				tableListData: videoStore.state.tableList, // 绑定表格的数据
			};
		},
		computed: {
			ID: function() {
				//选中目录的ID
				return courseEditStore.state.selectVideAlertData.ID;
			}
		},
		methods: {
			appendDir: function(videoId) {
				// 添加
				this.$axios({
						url: "/VueHandler/CourseHandler?action=addvideo",
						method: "get",
						params: {
							Did: this.ID, // 目录的ID
							ID: videoId // 视频的ID
						}
					})
					.then(res => {
						if(res.data.success) {
							alert("添加成功");
							// 设置目录中内容
							courseEditStore.state.courseContent.setListData(
								"videoTableList",
								res.data.data.list,
								this.ID
							);
						} else {
							alert(res.data.err);
						}
					})
					.catch(err => {
						alert(err);
					});
			},
			close: function() {
				// 关闭函数
				courseEditStore.commit("changeAlertSwitch", {
					type: "selectVideo",
					switch: false
				});
			}
			// enter: function() {
			//    courseEditStore.commit("changeAlertSwitch", {
			//     type: "selectVideo",
			//     switch: false
			//   });
			// }
		}
	};
</script>
<style scoped="">
	.alert-shade {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10002;
		/* background: black; */
		/* opacity: 0.8; */
		background: rgba(000, 000, 000, 0.5);
		margin: auto;
	}
	
	.alert-box {
		opacity: 1;
		width: 1100px;
		height: 440px;
		background: #fff;
		border: 5px solid #4f66bb;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10003;
		margin: auto;
	}
	
	.alert-head {
		height: 30px;
		background: #4f66b3;
		margin-bottom: 10px;
	}
	
	.head-title {
		color: white;
		line-height: 30px;
		font-size: 14px;
		display: inline-block;
		float: left;
	}
	
	.alert-head img {
		display: inline-block;
		float: right;
		margin-top: 5px;
		margin-right: 5px;
		cursor: pointer;
	}
	
	ul.alert-body li {
		display: block;
		margin-bottom: 10px;
	}
	
	ul.alert-body li span {
		display: inline-block;
		width: 80px;
		text-align: right;
	}
	
	ul.alert-body li input {
		padding-left: 10px;
		height: 24px;
		width: 170px;
	}
	
	ul.alert-body li select {
		width: 204px;
		height: 24px;
	}
	
	.btn {
		width: 80px;
		height: 30px;
		line-height: 20px;
		border: none;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
	
	.btn-info {
		background: #4f66bd;
		float: right;
		margin-right: 160px;
	}
	
	.btn-info:hover {
		background: #4f66a4;
	}
	
	.btn-success {
		background: #5cb85c;
		float: left;
		margin-left: 160px;
	}
	
	.btn-serach {
		background: #5cb85c;
		margin-left: 20px;
	}
	
	.btn-success:hover,
	.btn-serach:hover {
		background: #449d44;
	}
	
	.btn-upload {
		background: rgb(79, 102, 179);
		height: 24px;
	}
</style>