<!-- 修改密码的弹窗组件-->
<template>
	<div class="alert-shade"> <!-- 遮罩层-->
		<div class='alert-box'>  <!-- 弹窗的具体内容的盒子-->
			<!--弹窗的内容    <button  @click="close" >关闭弹窗</button>-->
			<div class="alert-head">
				<span class='head-title'> 修改密码</span>
				<img @click="close" src="../assets/images/x.png" />
			</div>
			<ul class="alert-body">
				<li>
					<span>当前密码：</span>
					<input type="password" v-model="pw.old_pw" />
				</li>
				<li>
					<span>新密码：</span>
					<input type="password" v-model="pw.new_pw"/>
				</li>
				<li>
					<span>确认密码：</span>
					<input type="password"  v-model="pw.enter_pw"/>
				</li>
			</ul>
			<div>
				<button class="btn btn-success"  @click="enter">确定</button>
				<button class="btn btn-info" @click="close"> 取消</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){ // 数据
			return {
				pw:{
					old_pw:"",// 旧密码
					new_pw:"",// 新密码
					enter_pw:""// 确认密码
				}
			}
		},
		methods:{ // 方法
			close:function(){
				// 触发自定义事件  ==》 close
				this.$emit("close")
			},
			enter:function(){ // 确定触发的方法
				// 验证的顺序  1. 登录  2. 修改密码   3.重新登录
				// v-model 绑定pw的数据

				// 获取 密码  （验证 都不为空 ， 判断新密码和确认密码 是否一致）
				// 发送到 后台
				//    err ==》 失败
				//    success==》 关闭弹窗 （清空密码）
				if(this.pw.old_pw!=""&&this.pw.new_pw!=""&&this.pw.enter_pw!=""){
					// 都不等于空 ==》 判断新密码和确认密码 是否一致
					if(this.pw.new_pw==this.pw.enter_pw){
						// 发送到后台
						this.$axios({
							url:"/VueHandler/AdminHandler?action=updatepass",
							method:"post",
							data:{
								userPwd:this.pw.old_pw,
								newPwd:this.pw.new_pw
							}
						}).then((res)=>{ // ajax成功  箭头函数
							if(res.data.success){
								alert('修改密码成功');
								// 清空数据
								this.pw={
									old_pw:"",// 旧密码
									new_pw:"",// 新密码
									enter_pw:""// 确认密码
								}
								// 关闭弹窗
								this.close();
							}else{
								alert('修改密码失败')
								alert(res.data.err)
							}
						}).catch(function(err){
							alert(err)
						})
					}else{
						alert("新密码和确认密码不一致，请重新输入")
					}
				}else{
					alert('请求填写完毕后，在提交！！！')
				}

			}
		}
	}
</script>
<style scoped>

	.alert-shade {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		z-index: 10002;
		/* background: black; */
		/* opacity: 0.8; */
		background: rgba(000, 000, 000, 0.5);

	}
	.alert-box {
		opacity: 1;
		width:410px;
		height:200px;
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
		background: #4F66B3;
		margin-bottom: 10px
	}

	.head-title {
		color: white;
		line-height: 30px;
		font-size: 14px;
		display: inline-block;
		float: left
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
		margin-bottom: 10px
	}

	ul.alert-body li span {
		display: inline-block;
		width: 80px;
		text-align: right;
	}

	ul.alert-body li input {
		height: 18px;
		width: 200px;
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
		background: #4F66BD;
		float: right;
		margin-right: 60px;
	}

	.btn-info:hover {
		background: #4F66A4;
	}

	.btn-success {
		background: #5cb85c;
		float: left;
		margin-left: 60px;
	}

	.btn-success:hover {
		background: #449d44;
	}
</style>