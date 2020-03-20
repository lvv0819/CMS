<template>
	<div>
		<!-- 标题-->
		<page-head :title="title"></page-head>
		<!-- 搜索框-->
		<div class="search-input">
			<i class="fa fa-search"  @click="getCourseName"></i>
			<input type="text" placeholder="搜索课程" v-model="courseName" @keydown.enter="getCourseName" />
		</div>
		<!--课程列表-->
		<ul class="class-list">
			<!-- 分类数据 -->
			<li v-for="category in categoryList" @click="getSysIdCourse(category.sysId)">
				{{category.title}}
			</li>
			<li @click="getSysIdCourse()">全部</li>
			
		</ul>
		<!-- 课程列表 -->
		<div>
			<course-list :courseData="courseData"></course-list>	
		</div>
	</div>
</template>

<script>
	import pageHead from "@/components/pageHead";
	import courseList from "@/components/courseList";
	export default {
		components: {
			pageHead,
			courseList
		},
		data: function() {
			return {
				title: "课程",
				categoryList: [],// 保存课程分类
				courseData:[],// 保存课程数据
				courseName:""// 查询课程的名称
			}
		},
		created:function(){ // 创建之后
			 this.getCourseData();// 执行获取课程信息的方法
			 // 调取分类数据
			 this.$axios({
			 	url:"/Handler/CourseHandler?action=getcategory",
			 	method:"get"
			 }).then((res)=>{
			 	if(res.data.success){
			 		// 保存分类数据
			 		this.categoryList=res.data.data;
			 	}else{
			 		alert(res.data.err)
			 	}
			 	
			 }).catch((err)=>{
			 	alert(err)
			 })	 	 
		},
		methods:{
			getSysIdCourse:function(sysId){// 查询的sysId
				console.log(sysId)
				this.getCourseData({sysId:sysId})	
			},
			
			getCourseName:function(){ // 查询课程信息
				this.getCourseData({courseName:this.courseName})
				this.courseName="";// 清空查询的信息
			},
			// 调取 课程相关的数据 
			// 1. 分条件
			// 2. 调取所有
			getCourseData:function(obj){ //获取所有课程信息的
				// obj  查询的信息
				if(obj){
					var data={
						courseName:obj.courseName,
						sysId:obj.sysId
					}
				}

				this.$axios({
					method:"get",
					url:"/Handler/CourseHandler?action=courseshow",
					params:data// 查询的数据
				}).then((res)=>{
					if(res.data.success){
						// 保存 课程信息
						this.courseData=res.data.data.list;
					}else{
						alert(res.data.err)
					}
				}).catch((err)=>{
					alert(err)
				})
				
				
			}
			
			
			
		}
	}
</script>

<style scoped="scoped">
	/* 搜索框*/
	.search-input {
		height: 0.8rem;
		margin-top: 5px;
		padding: 0 20px 0 40px;
		position: relative;
	}
	
	.search-input i {
		position: absolute;
		top: 0.2rem;
		left: 0.5rem;
		font-size: 0.4rem;
		cursor: pointer;
	}
	
	.search-input input {
		width: 100%;
		height: 100%;
		padding-left: 5px;
	}
	/* 分类 */
	
	.class-list {
		margin-top: 18px;
		width: 100%;
		display: flex;
		flex-wrap: wrap-reverse;
		justify-content: space-around;
	}
	
	.class-list li {
		padding: 8px;
		border: 1px solid #ccc;
		cursor: pointer;
	}
	
	.class-list li:hover {
		background: #0C60EE;
		color: #FFFFFF;
	}
</style>