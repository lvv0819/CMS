<template>
	<div>
		<page-head :title="title"></page-head>
		<shade :isShow="isShade"></shade>
		
		<!--{{courseData}}-->
		<!-- 课程列表 -->
		<div>
			<course-list :courseData="courseData"></course-list>	
		</div>
	</div>
</template>

<script>
	import pageHead from "@/components/pageHead";
	import shade from "@/components/shade"
	import utils from "@/utils"
	
	import courseList from "@/components/courseList";
	export default{
		components:{pageHead,shade,courseList},
		data:function(){
			return { 
				title:"我的课程",
				isShade:true,// 显示遮罩	
				userName:"",// 用户名
				courseData:[]//我的课程的数据
			}
		},
		created(){ // 创建之后 
			var userInfo = utils.storage.getUserInfo();
			console.log(userInfo)
			if(userInfo) { // 遮罩消失
				this.isShade = false;
				// 用户名
				this.userName = userInfo.userName;
				
				// 请求数据
				this.$axios({
					url:"/Handler/CourseHandler?action=mycourse",
					method:"get",
					params:{
						userName:this.userName
					}
				}).then((res)=>{
					if(res.data.success){
						// 保存 获取到的课程信息
						this.courseData=res.data.data;
					}else{
						alert(res.data.err)
					}
				})
	
			} else { // 遮罩还是显示
				this.isShade = true;
			}
		}
	}
</script>

<style scoped="">
</style>