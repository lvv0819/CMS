<!-- 遮罩 -->
<template>
	<div class="shade" v-show="isShow">
		<router-link to="/login">请登录</router-link>
	</div>
</template>

<script>
	export default {
		props:["isShow"]
	}
</script>

<style scoped="scoped">
	.shade{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,0.4);
		z-index: 1;
		text-align: center;
		padding-top: 60%;
		font-size: 20px;
	}
	.shade a{
		color: #FFFFFF;
	}
</style>