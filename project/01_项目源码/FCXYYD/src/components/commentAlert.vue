<template>
	<div class="comment-warp" v-show="isShow">
		<header class="page-title">
			<h1 class="title">写评论</h1>
			<span @click="closeAlert">关闭</span>
		</header>
		<div class="text-warp">
			<textarea placeholder="吐槽、表扬、鼓励……想说啥就说啥！" 
				rows="11" cols="50" maxlength="300" v-model="commentData">
			</textarea>
		</div>
		<p style="text-align:right; margin-right: 20px; color:#ccc">300</p>
		<button @click="enter">提交   </button>
	</div>
</template>
<script>
	export default {
		props:["isShow"], // 接收显示的条件
		data: function() {
			return {
				commentData:""// 评价内容
			}
		},
		methods:{
			closeAlert(){ // 关闭
				this.$emit("closeAlert")
			},
			enter(){ // 提交 
				// 子传父   怎么  传递数据
				// this.$emit("自定事件",传递的数据)
				this.$emit("closeAlert",this.commentData)
				this.commentData="";// 清空内容
			}
		}
	}
</script>

<style scoped="scoped">
	.comment-warp {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 2;
		background: #FFFFFF;
	}
	
	.page-title {
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 0.6rem;
		text-align: center;
		border: 1px solid #0c60ee;
		position: relative;
		z-index: 2;
		position: relative;
		background-color: #387ef5;
		color: #FFFFFF;
		position: relative;
	}
	
	.page-title span {
		font-size: 20px;
		position: absolute;
		top: 1px;
		right: 10px;
		bottom: 5px;
	}
	
	.text-warp {
		height: 6rem;
		overflow: hidden;
		border: 1px solid #ccc;
		margin: 10% 4% 5%;
		padding: 10px;
	}
	
	.text-warp textarea {
		width: 100%;
		height: 100%;
		border: 0;
		font-size: 14px;
	}
	
	button {
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
	
	button:hover {
		border-color: transparent;
		background-color: #387ef5;
	}
	
	button:active {
		border-color: #a2a2a2;
		background: #0c60ee;
	}
</style>