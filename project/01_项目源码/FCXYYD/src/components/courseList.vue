<!-- 显示课程的组件 -->
<template>
	<div class="course-list">
		<div  v-for="item in courseData" class="course-item" @click="goStudy(item.ID)">
			<div  class="item-img">
				<!-- 绑定图片-->
				<img :src="item.Cpic" alt="...">
			</div>
			<div class="item-text">
				<h2>{{item.Cname}}</h2>
				<p>{{item.Cdescribe}}</p>	
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:["courseData"], // 接收数据的名称
		methods:{
			goStudy(id){
				this.$router.push("/study/"+id)
			}
		}
	}
</script>

<style scoped="scoped">
	.course-list {
		margin-top: 10px;
		padding: 5px;
	}
	
	.course-item {
		display: flex;
		padding-left: 20px;
		border: 1px solid #DDDDDD;
		border-top: none;
	}
	
	.course-item:first-child {
		border: 1px solid #DDDDDD;
	}
	
	.course-item .item-img {
		height: 2.6rem;
		margin: 10px 0;
	}
	
	.course-item .item-img img {
		height: 100%;
	}
	
	.course-item h2 {
		font-weight: normal;
		font-size: 0.6rem;
		margin: 0.4rem 0 0.4rem;
		padding-left: 8px;
	}
	
	.course-item p {
		font-size: 0.5rem;
		padding-left: 12px;
	}
</style>