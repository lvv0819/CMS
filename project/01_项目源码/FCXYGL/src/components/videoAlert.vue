<template>
	<div class="alert-shade">
		<!--遮罩-->
		<div class="alert-box">
			<!-- 具体的容器-->
			<div class="alert-head">
				<span class="head-title">{{isDisabled()?"编辑":"添加"}}视频</span>
				<img @click="close()" src="../assets/images/x.png">
			</div>
			<ul class="alert-body">
				<li>
					<span>视频:</span>
					<input type="text" @click="selectVideo" v-model="videoInfor.Vurl" placeholder="请选择mp4格式的视频" readonly>
					<button class="btn btn-upload" @click="selectVideo">选择视频</button>
					<input type="file" style="display: none;" ref="fileInput" @change='upload'>
				</li>
				<li>
					<span>视频名称:</span>
					<input type="text" v-model="videoInfor.Vname" :disabled="isDisabled()"> {{videoInfor.ID}}
					<i>60字以内</i>
				</li>
				<li>
					<span>视频时长:</span>
					<input type="text" v-model="videoInfor.Vtime">
					<i>填分钟数</i>
				</li>

			</ul>
			<div style="padding-top:15px;">
				<button class="btn btn-success" @click="enter()">确定</button>
				<button class="btn btn-info" @click="close()">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
	import videoStore from "../vuex/videoStore.js";
	export default {
		computed: {
			videoInfor: function() {

				console.log(videoStore.state.videoInfor.ID)

				return videoStore.state.videoInfor;
			}
		},
		data() {
			// 数据
			return {};
		},
		methods: {
			isDisabled: function() {
				// 获取是是否使用disabled的属性的数据
				return this.videoInfor.ID ? true : false;
			},
			selectVideo() {
				this.$refs.fileInput.click();
			},
			upload: function() {
				let file = this.$refs.fileInput.files[0]
				if(file.type == "video/mp4") {
					let formdata = new FormData();
					formdata.append("data", file);
					this.$axios({
						url: "/VueHandler/UpLoadVideoHandler",
						method: "post",
						data: formdata
					}).then(res => {
						if(res.data.success) {
							console.log(res);
							this.videoInfor.Vurl = res.data.cacheName;
							this.$refs.fileInput.value = "";
						} else {
							alert(res.data.err);
						}
					});
				} else {
					alert("视频格式不正确，请选择mp4格式的视频！！")
				}

			},

			close: function() {
				// 关闭函数
				videoStore.commit("changSwitch", false); // 关闭弹窗
			},
			enter: function() {
				var url = "";
				var data = {
					Vurl: this.videoInfor.Vurl,
					Vname: this.videoInfor.Vname,
					Vtime: this.videoInfor.Vtime
				};
				if(this.videoInfor.ID != "") {
					data.ID = this.videoInfor.ID;
					url = "/VueHandler/VideoHandler?action=update";
				} else {
					url = "/VueHandler/VideoHandler?action=add";
				}
				//				console.log(data);
				var _this = this;
				this.$axios({
					url: url,
					method: "post",
					data: data
				}).then(function(res) {
					console.log(res);
					if(res.data.success) {
						alert("操作成功");
						_this.close(); //关闭
						videoStore.state.tableList.getVideoData();
					} else {
						alert(res.data.err);
					}
				});
			}
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
		width: 430px;
		height: 230px;
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
		height: 18px;
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
		margin-right: 60px;
	}
	
	.btn-info:hover {
		background: #4f66a4;
	}
	
	.btn-success {
		background: #5cb85c;
		float: left;
		margin-left: 60px;
	}
	
	.btn-success:hover {
		background: #449d44;
	}
	
	.btn-upload {
		background: rgb(79, 102, 179);
		height: 24px;
	}
</style>