<template>
	<div>
		<div class="ListContentWrap">
			<div class="box">
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">课程信息</div>
				</div>
				<div class="box_bottom">
					<div style=" overflow: hidden;">
						<div class="from_block">
							<ul>
								<li>
									<span>课程名称：</span>
									<input type="text" v-model="courseInfo.Cname">
									<i>60字以内</i>
								</li>
								<li>
									<span>课程描述：</span>
									<input type="text" v-model="courseInfo.Cdescribe">
									<i>100字以内</i>
								</li>
								<li>
									<span>课程价格：</span>
									<input type="text" v-model="courseInfo.Cprice">
									<i> 课程价格以元为单位，免费课程设置为0</i>
								</li>
								<li>
									<select-category :categoryData='categoryData' @categoryData='setCategory' />
								</li>
							</ul>
						</div>

						<div style="float:left;margin:2px 0 0 210px">
							<span style='font-size:20px;'>课程封面：</span>
							<img class="img_block" :src="courseInfo.Cpic" @click="addImg" title="点击上传封面" />
							<!-- <a class="a_btn">清除</a> -->
							<!-- <a class="a_btn" style='margin-left:120px;'>上传</a> -->
						</div>
					</div>
					<div>
						<button class="btn" v-show='addCourseSwitch' @click="addCourse">保存</button>
					</div>
				</div>
			</div>
		</div>

		<div class="ListContentWrap">

			<!-- 表格 -->
			<div class="box">
				<!-- 遮罩层 -->
				<div :class='{"shade":addCourseSwitch}'></div>
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">课程内容</div>
				</div>
				<div class="box_bottom">

					<div class="table_block">
						<button @click="addDir" class="btn" style="margin-left:5px">添加目录</button>
						<!--  目录的表格 -->
						<div class="table_wrap">
							<table-list :tableListData='dirTableList'></table-list>
						</div>
					</div>
					<div class="table_block ">
						<button @click="selectVideo" class="btn" style="margin-left:5px">添加视频</button>
						<!--  视频的表格 -->
						<div class="table_wrap">
							<table-list :tableListData='videoTableList'></table-list>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div class="ListContentWrap">
			<div class="box">
				<!-- 遮罩层 -->
				<div :class='{"shade":addCourseSwitch}'></div>
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">课程详情</div>
				</div>
				<div class="box_bottom">
					<!-- 富文本编辑器 -->
					<div ref="ee"></div>

					<button class="btn" @click="saveCourse">整体保存</button>
				</div>
			</div>

		</div>
		<!--  弹窗 -->

		<div v-show="alertSwitch.addDir">
			<add-dir-alert></add-dir-alert>
		</div>
		<div v-show="alertSwitch.selectVideo">
			<select-video-alert></select-video-alert>
		</div>
		<div v-show="alertSwitch.uploadImg">
			<upload-img-alert @setImgUrl='setImgUrl'></upload-img-alert>
		</div>

	</div>
</template>

<script>
	import tableList from "@/components/tableList.vue";
	import selectCategory from "@/components/selectCategory.vue";
	//  弹窗
	import uploadImgAlert from "@/components/uploadImgAlert.vue";
	import selectVideoAlert from "@/components/selectVideoAlert.vue";
	import addDirAlert from "@/components/addDirAlert.vue";
	// 富文本编辑器
	import E from "wangeditor";

	import courseEditStore from "@/vuex/courseEditStore.js";
	export default {
		components: {
			tableList,
			selectCategory,
			uploadImgAlert,
			selectVideoAlert,
			addDirAlert
		},
		data() {
			// 获取 数据-
			return {
				// 控制添加按钮的属性
				categoryData: courseEditStore.state.courseInfo.category, // 权限数据
				dirTableList: courseEditStore.state.courseContent.dirTableList, // 目录
				videoTableList: courseEditStore.state.courseContent.videoTableList, // 课件
				btnList: courseEditStore.state.btnList, // 按钮  添加课程  保存课程
				editor: null // 富文本编辑器
			};
		},
		computed: {
			alertSwitch: function() {
				return courseEditStore.state.alertSwitch; // 弹窗的开关
			},
			courseInfo: function() {
				// 课程信息
				return courseEditStore.state.courseInfo;
			},
			addCourseSwitch: function() {
				console.log(courseEditStore.state.addCourseSwitch)
				return courseEditStore.state.addCourseSwitch;
			}
		},
		watch: {
			// 监听数据的变化
			courseInfo: {
				handler: function(val, oldVal) {
					if(val.Cdetails) {
						//  在富文本编辑器中写入内容
						this.editor.txt.html(val.Cdetails);
					}
				},
				deep: true
			}
		},
		mounted: function() {
			if(this.$route.params.ID) {
				// 挂载之后 获取地址的课程ID值
				//  接受 传递过来的值   this.$route.params.ID
				this.courseInfo.getCourseInfoData(this.$route.params.ID);
				courseEditStore.commit('changeAddCourseSwitch', false);
			} else {
				courseEditStore.commit('changeAddCourseSwitch', true);

				courseEditStore.commit('clearCourseInfo');
			}
			// 生成富文本编辑框
			this.editor = new E(this.$refs.ee);
			this.editor.create();
		},

		methods: {
			setImgUrl: function(url) {
				this.courseInfo.Cpic = url;
			},
			setCategory(data) {
				//获取改变后的权限数据
				courseEditStore.commit("setCategory", data);
			},
			addDir: function() {
				// 添加目录
				courseEditStore.commit("changeAlertSwitch", {
					type: "addDir",
					switch: true
				});
				courseEditStore.commit("setDirAlertData");
			},
			selectVideo: function() {
				// 添加视频课件
				courseEditStore.commit("changeAlertSwitch", {
					type: "selectVideo",
					switch: true
				});
			},
			addImg: function() {
				// 上传图片
				courseEditStore.commit("changeAlertSwitch", {
					type: "uploadImg",
					switch: true
				});
			},
			addCourse: function() {
				// 添加课程
				this.btnList.addCoutse();
			},
			saveCourse: function() {
				// 保存课程
				this.courseInfo.Cdetails = this.editor.txt.html();
				this.btnList.saveCoutse();
			}
		}
	};
</script>

<style scoped>
	.shade {
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10002;
		/* background: black; */
		/* opacity: 0.8; */
		background: rgba(255, 255, 255, 0.8);
		margin: auto;
	}
	
	.ListContentWrap {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		background: #f5f5f5;
		min-width: 1100px;
		height: 100%;
	}
	
	.fc_section_wrap {
		height: 35px;
		padding: 10px;
		border: 1px solid #c0c0c0;
		background: #ffffff;
		margin-top: 15px;
		margin-bottom: 15px;
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
		position: relative;
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
		/* overflow: hidden; */
		zoom: 1;
	}
	
	.box_bottom::after {
		content: "";
		display: block;
		clear: both;
	}
	/*  課程內容的  快 */
	
	.table_block {
		width: 48%;
		float: left;
		min-width: 500px;
		margin: 10px 0 0px 12px;
	}
	
	.table_wrap {
		padding-right: 1px;
		border: 1px solid #c0c0c0;
		margin-bottom: 15px;
		height: 280px;
		overflow: auto;
	}
	
	input {
		width: 199px;
		height: 24px;
		padding-left: 5px;
	}
	
	select {
		width: 208px;
		height: 30px;
	}
	
	.from_block {
		float: left;
	}
	
	.img_block {
		display: block;
		width: 190px;
		height: 110px;
		border: 1px solid #c0c0c0;
		cursor: pointer;
	}
	
	.btn {
		width: 113px;
		height: 34px;
		line-height: 34px;
		border: none;
		color: #fff;
		text-align: center;
		cursor: pointer;
		background: #5cb85c;
		margin: 10px 0 15px 40px;
	}
	
	.btn:hover {
		background: #449d44;
	}
	
	.a_btn {
		font-size: 12px;
		color: blue;
		cursor: pointer;
		margin-left: 10px;
	}
</style>