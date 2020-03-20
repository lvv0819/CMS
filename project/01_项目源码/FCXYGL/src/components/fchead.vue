<template>
	<div class="bg ">
		<div class="header_wrap">
			<div class="logo_wrap">
				<a @click="goIndex"><img src="../assets/back_logo.png" alt=""></a>
			</div>
			<ul class="header_nav">
				<li>
					<a><i class="fa fa-globe"></i>卓新思创</a>
				</li>
				<li>
					<a><i class="fa fa-comment"></i>在新客服</a>
				</li>
				<li>
					<a><i class="fa fa-book"></i>常见问题</a>
				</li>
				<li>
					<a @click="show"><i class="fa fa-lock"></i>安全中心</a>
				</li>
				<li>
					<a @click="quit"><i class="fa fa-signout"></i>退出</a>
				</li>
				<li><img style="float: right" src="../assets/touxiang.jpg" alt=""><span class="name">{{turename}}</span></li>
			</ul>
		</div>

		<!-- 蓝条 + 白条 -->
		<div>
			<div class="nav" id="nav">
				<ul>
					<li>
						<!--包裹 用户管理  和管理员下面的内容-->
						<div class="navName" style="margin-left:100px;">
							<i class="icon icon-user"></i>
							<span>用户管理</span>
						</div>

						<div class="navItem navItem1">

							<div @click="goAdmin" class="Item Item3">
								<i class="icon icon-user"></i>
								<span>系统人员</span>
							</div>

							<div @click="goStudent" class="Item Item3">
								<i class="icon-group">
                </i><span>学员管理</span>
							</div>
						</div>
					</li>

					<li>

						<div class="navName">
							<i class="icon icon-user"></i><span>课程管理</span>
						</div>
						<div class="navItem navItem1">
							<div @click="goVideo" class="Item Item3">
								<i class="icon icon-user"></i>
								<span>视频管理</span>
							</div>
							<div @click="goAddCourse" class="Item Item3">
								<i class="icon-group"></i>
              					<span>课程添加</span>
							</div>
							<div @click="goCourse" class="Item Item3">
								<i class="icon-legal"></i>
								<span>课程管理</span>
							</div>
							<div style="clear: both">
							</div>
						</div>

					</li>
				</ul>
			</div>
		</div>
		<div v-show='isSwitch'>
			<pw-alert v-on:close="close"></pw-alert>

		</div>
	</div>
</template>
<script>
	import pwAlert from "./pwAlert.vue";

	export default {
		components: {
			pwAlert
		},
		data: function() {
			// 数据
			return {
				turename: "未登录",
				isSwitch: false // 控制弹窗的开关
			};
		},
		methods: {
			// 方法
			goCourse: function() {
				this.$router.push("/course")

			},
			goAddCourse: function() {
				this.$router.push("/addCourse")
			},
			goVideo: function() {
				this.$router.push("/video")
			},
			goStudent: function() {
				this.$router.push("/student")
			},
			goIndex: function() {
				this.$router.push("/index")
			},
			goAdmin: function() {
				this.$router.push("/admin")
			},
			show: function() {
				// 弹窗显示   ==> 在安全中心 那使用

				this.isSwitch = true;
			},
			close: function() {
				// 弹窗关闭 ==》 在弹窗的 关闭按钮 那使用
				this.isSwitch = false;
			},
			quit: function() {
				this.$axios({
						method: "get",
						url: "/VueHandler/AdminHandler?action=quit"
					})
					.then((res) => {
						// 判断是否成功 success
						if(res.data.success) {
							this.$router.push("/login")

						} else {
							alert(res.data.err);
						}
					})
					.catch((err) => {
						alert(err);
					});
			}
		},
		mounted: function() {
			// 挂载之后
			this.$axios({
					method: "post",
					url: "/VueHandler/AdminLoginAndRegHandler?action=returnuserinfo"
				})
				.then(res => {
					if(res.data.success) {
						console.log(res.data.data.turename);
						this.turename = res.data.data.turename;
					} else {
						alert(res.data.err);
						// this.$router.push("/login")
					}
				})
				.catch(function(err) {
					alert(err);
				});
		}
	};
</script>
<style scoped>
	.bg {
		background: url(../assets/images/index_body_bg.jpg);
		height: 100px;
		/*关于首页的高度*/
		min-width: 1100px;
	}
	
	ul {
		margin: 0;
		padding: 0;
	}
	
	.header_wrap {
		height: 50px;
		background: #222222;
		font-size: 12px;
	}
	
	.logo_wrap {
		margin: 4px 0 0 18px;
		float: left;
	}
	
	.header_nav {
		float: right;
		color: #9d9d9d;
	}
	
	.header_nav li {
		float: left;
		line-height: 50px;
		padding: 0 15px;
	}
	
	.header_nav li a:hover {
		color: #fff;
		cursor: pointer;
	}
	
	.header_nav li a {
		color: #9d9d9d;
		position: relative;
	}
	
	.header_nav li a .icon {
		top: 0;
		border: none;
		left: -20px;
	}
	
	.header_nav i,
	.header_nav .name {
		margin-right: 6px;
	}
	
	.nav {
		width: 100%;
		height: 50px;
		background: url(../assets/images/white_opacity_bg.png);
		position: relative;
	}
	
	.nav ul {
		/*padding-left: 500px;*/
		overflow: hidden;
		margin: 0 auto;
		width: 100%;
	}
	
	.nav ul li .navName {
		font-size: 16px;
		float: left;
		padding: 0 30px;
		color: whitesmoke;
		text-align: center;
		line-height: 50px;
		cursor: pointer;
		position: relative;
	}
	
	.nav ul li .navName i {
		margin-right: 10px;
	}
	/*  上下白   设置基本属性  用css 伪类 设置*/
	
	.nav ul li .navName::before,
	.nav ul li .navName::after {
		content: "";
		width: 8px;
		height: 8px;
		position: absolute;
		transition: 0.3s ease;
		opacity: 0;
	}
	/* 设置位置 颜色 */
	
	.nav ul li .navName::before {
		top: 20px;
		left: 66px;
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
	}
	
	.nav ul li .navName::after {
		bottom: 20px;
		right: 66px;
		border-bottom: 2px solid #ffffff;
		border-right: 2px solid #ffffff;
	}
	/*白色的那个条*/
	
	.nav .navItem {
		position: absolute;
		z-index: 200;
		/*left: -80px;*/
		top: 50px;
		width: 100%;
		height: 144px;
		background-color: white;
		border: 1px solid #ececec;
		display: none;
	}
	/* 白条中内容 */
	
	.nav .navItem .Item {
		float: left;
		margin: 52px 40px;
		width: 249px;
		height: 40px;
		border: 1px solid #ececec;
		font-size: 15px;
		line-height: 42px;
		text-align: center;
		cursor: pointer;
		transition: 0.2s ease;
	}
	
	.nav .navItem .Item:hover {
		background: #4c5c9c;
		color: white;
		font-size: 16px;
	}
	
	.nav .navItem .Item i {
		margin-right: 13px;
	}
	/*控制显示的移入*/
	
	.nav ul li:hover>.navItem {
		display: block;
	}
	/* 鼠标移入时 显示的 上下白 */
	
	.nav ul li:hover>.navName::before {
		top: 2px;
		left: 2px;
		opacity: 1;
		/*transition: .3s ease;*/
	}
	
	.nav ul li:hover>.navName::after {
		bottom: 2px;
		right: 2px;
		opacity: 1;
		/*transition: .3s ease;*/
	}
</style>