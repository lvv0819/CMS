<template>
	<div class="login-wrap">

		<div class="logo-wrap">
			<img src="../assets/login_logo.png" />
		</div>

		<div class="input-wrap">
			<div class="input-box">
				<input type="text" placeholder="用户名" v-model="userName"/>
			</div>
			<div class="input-box">
				<input type="password" placeholder="密码"  v-model="password"/>
			</div>
		</div>
		<button @click="login">登录</button>

		<div class="a-btn">
			<router-link to="/user/register">注册</router-link>
			<router-link to="/">忘了密码</router-link>
		</div>
	</div>
</template>

<script>
import utlis from "@/utils";// 加载工具函数
	export default {
		data: function() {
			return {
				userName:"",
				password:""
			}
		},
		methods: {
			login(){
				//1. 获取用户名和密码
				//2. 简单的验证
				//3. 发送请求 
				if(this.userName!=""&&this.password!=""){
					// 发送请求
					this.$axios({
						method:"post",
						url:"/Handler/UserHandler?action=login",
						data:{
							userName:this.userName,
							password:this.password
						}
					}).then((res)=>{ // 成功的回调
						// 判断下 
						if(res.data.success){ // 登录成功
							this.$router.push("/userInfo");
							// 登录用户的信息
							// sessionStorage
							// res.data==》 后台返回的数据
							// res.data.data ==》 返回数据里面的 data数据
							utlis.storage.setUserInfo({
								userName:res.data.data.userName,
								phone:res.data.data.phone,
								email:res.data.data.email
							})
						}else{
							alert(res.data.err)
						}
					}).catch((err)=>{// 失败的回调
						alert(err)
					})
					
				}else{
					alert("请填写完成后再提交！！！！")
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.login-wrap {
		background: url("../assets/login_bg.png")no-repeat;
		background-size: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.login-wrap .logo-wrap {
		width: 100%;
		margin-top: 2rem;
		text-align: center;
		height: 2.8rem;
	}

	.login-wrap .logo-wrap img {
		height: 100%;
	}

	.login-wrap .input-wrap {
		width: 75%;
		margin: 1.5rem auto;
		background: #FFFFFF;
	}

	.login-wrap .input-wrap .input-box {
		padding: 0 10px;
		border: 1px solid #DDDDDD;
	}

	.login-wrap .input-wrap input {
		height: 1.2rem;
		width: 100%;
		border: none;
	}

	.login-wrap .input-wrap input:last-child {
		border-top: none;
	}

	.login-wrap button {
		display: block;
		width: 75%;
		margin: 1rem auto;
		background-color: #387ef5;
		color: #fff;
		font-size: 16px;
		line-height: 42px;
		cursor: pointer;
		border-radius: 4px;
		border: 1px solid transparent;
		cursor: pointer;
	}

	.login-wrap button:hover {
		border-color: transparent;
		background-color: #387ef5;
	}

	.login-wrap button:active {
		border-color: #a2a2a2;
		background: #0c60ee;
	}

	.login-wrap .a-btn {
		display: flex;
		justify-content: space-between;
		padding: 0 1.5rem;
	}
</style>