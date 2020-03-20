<template>
	<div class="content">
		<bg-canvas></bg-canvas>
		<!-- 键盘回车键按下触发   登录的方法-->
		<div class="login_wrap" @keydown.enter='login'>
			<img src="../assets/back_logo.png" class="logo" alt="">
			<form>
				<!--图标和输入框-->
				<div class="oneinput_box">
					<span class="icon">
						<i class="fa fa-user"></i>
					</span>
					<input ref='input_user' type="text" placeholder="用户名">
				</div>
				<div class="oneinput_box">
					<span class="icon">
						<i class="fa fa-lock"></i>
					</span>
					<input ref='input_pw' type="password" placeholder="密码">
				</div>
				<div class="oneinput_box">
					<span class="icon">
						<i class="fa fa-lock"></i>
					</span>
					<input ref='input_veri' style="width: 310px;" type="text" placeholder="请输入验证码">
					<!-- 验证码  -->
					<!-- 换成验证码的组件  -->
					<!--<span style="width:80px;height:14px;background:red"></span>-->
					<veri ref="veri"></veri>
				</div>
			</form>
			<button class="btn btn-info" type="button">忘记密码</button>
			<button type="button" class="btn btn-success" @click="login">登录</button>
		</div>
	</div>
</template>
<script>
	import bgCanvas from '@/components/bgCanvas.vue';
	import veri from '@/components/verification.vue';

	export default {
		components: {
			bgCanvas,
			veri
		},
		mounted: function() { // 挂载之后在自动获取焦点
			this.$refs.input_user.focus();
		},
		methods: {
			login: function() {
				var userName = this.$refs.input_user.value;
				var password = this.$refs.input_pw.value;
				var veri = this.$refs.input_veri.value;

				var _this = this; // 保存this指向  vue组件
				this.$axios({
					method: "get",
					url: "/VueHandler/AdminLoginAndRegHandler?action=checkVerification",
					params: {
						veri: veri // 发送验证码
					}
				}).then(function(res) { // ajax 成功 200
					console.log(res.data)
					// 判断 验证码  配置是否成功
					if(res.data.success) { // 验证成功
						console.log('验证码验证成功')

						_this.$axios({
							method: "post",
							url: "/VueHandler/AdminLoginAndRegHandler?action=login",
							data: {
								userName: userName, // 用户名
								password: password // 密码
							}
						}).then(function(res) {
							// 是否登录成功
							if(res.data.success) {
								console.log('登录成功');
								_this.$router.push("/index")

							} else {
								alert(res.data.err)
								_this.$refs.veri.changeVeri();
							}
						}).catch(function(err) {
							alert(err)
						})
					} else { // 验证失败
						alert(res.data.err);

						_this.$refs.veri.changeVeri();

					}
				}).catch(function(err) { // ajax 失败 404 500 ...
					alert(err);
				})
			}
		}

	}
</script>

<style scoped="">
	* {
		margin: 0px;
		padding: 0px;
	}

	.content img {
		border: none;
	}

	.login_wrap {
		width: 560px;
		height: 320px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -180px;
		margin-left: -280px;
		z-index: 3;
		color: #fff;
	}

	.login_wrap .logo {
		margin-left: 180px;
		margin-bottom: 29px;
	}

	.login_wrap form {
		margin-left: 50px;
	}

	.login_wrap input {
		background: #0d1953;
		width: 413px;
		height: 34px;
		line-height: 34px;
		border: 1px solid #3c498a;
		margin-left: 0px;
		padding-left: 5px;
		color: #fff;
	}

	input:focus {
		outline: none;
	}

	.oneinput_box {
		position: relative;
		margin-bottom: 25px;
		overflow: hidden;
		width: 457px;
		padding-left: 10px;
	}

	.oneinput_box * {
		float: left;
	}

	.oneinput_box span {
		background: #0d1953;
		border: 1px solid #3c498a;
		padding: 11px 9px;
		border-right: none 0;
		height: 12px;
		width: 10px;
		padding-left: 10px;
		overflow: hidden;
	}

	.oneinput_box .icon {
		top: 0;
		left: 10px;
		font-size: 10px;
		width: 9px;
		height: 12px;
	}

	.oneinput_box .fa-lock {
		top: 0;
		left: 10px;
		font-size: 10px;
		width: 9px;
		height: 12px;
		z-index: 1000000000;
	}

	.erwei_code {
		width: 91px;
		height: 34px;
		float: right;
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
	}

	.btn-info {
		background: #3cadcf;
		float: left;
	}

	.btn-info:hover {
		background: #1f8fb0;
	}

	.btn-success {
		background: #5cb85c;
		float: right;
	}

	.btn-success:hover {
		background: #449d44;
	}
</style>