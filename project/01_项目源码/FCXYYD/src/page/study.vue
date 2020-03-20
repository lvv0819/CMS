<template>
	<div>
		<!-- 标题-->
		<page-head :title="title"></page-head>

		<!-- 视频-->
		<div class="video-warp">
			<!-- 播放视频    只需要 把 视频的地址绑定到  video标签的 src属性上-->
			<!-- 选择播放的视频 -->
			<!-- 1. 在data中写    videoUrl==》 视频的地址-->
			<!-- 2. methods	操作  视频的地址 selectVideo  设置地址-->

			<video controls loop :src="videoUrl" style="width: 100%; height: 100%;">
			</video>

		</div>

		<!-- tab选项卡-->
		<div class="nav-list">
			<div :class="{color:isOptions}" @click="showVideo">
				视频
			</div>
			<div :class="{color:!isOptions}" @click="showComment">
				评价
			</div>
		</div>
		<!-- 视频-->
		<div class="nav-item-content" v-show="isOptions">
			<div class="list-title">课程详情</div>
			<div class="course-describe">
				<p>课程名称：{{courseInfo.Cname}}</p>
				<p>课程价格：{{courseInfo.Cprice}}</p>
				<p>课程描述：{{courseInfo.Cdescribe}}</p>

			</div>
			<div class="list-title">视频列表</div>
			<ul class="video-list">
				<li class="video-item " v-for="video in videoList" @click="selectVideo(video.Vurl)">

					<span class="dd"></span>
					<!-- 播放的地址  == 当前的地址    -->
					<!-- 播放的地址 ！= 当前的地址  -->
					<div class="name-time" :class="{color:videoUrl==video.Vurl}">
						<p>{{video.Vname}}</p>
						<p>{{video.Vtime}}</p>
					</div>
				</li>
			</ul>
		</div>

		<!-- 评价-->
		<div class="nav-item-content" v-show="!isOptions">
			<div class="list-title">评价</div>
			<ul class="evaluate-list">

				<li class="evaluate-item" v-for="comment  in commentList">
					<div class="img-warp">
						<img src="../assets/info-tt.png" alt="" />
					</div>
					<div class="text-warp">
						<p>{{comment.userName}}</p>
						<p>{{comment.evaluate}}</p>
					</div>
					<div class="time-warp">
					<!-- 使用 -->
						{{getFormatTime(comment.createAt)}}
					</div>
				</li>

			</ul>
		</div>

		<!-- 底部的 tabs-->
		<study-tabs @openAlert="openAlert" :isBuy="isBuy" @puyCourse="puyCourse"></study-tabs>
		<!-- 遮罩-->
		<shade :isShow="isShade"></shade>
		<!-- 评价-->
		<comment-alert @closeAlert="closeAlert" :isShow="isComment"></comment-alert>
	</div>
</template>

<script>
	// 头部组件
	import pageHead from "@/components/pageHead";
	// 底部tab 
	import studyTabs from '@/components/studyTabs';
	// 遮罩
	import shade from "@/components/shade"
	// 评价组件
	import commentAlert from "@/components/commentAlert";
	// 工具
	import utils from "@/utils"
	export default {
		components: {
			commentAlert,
			pageHead,
			studyTabs,
			shade
		},
		data: function() {
			return {
				title: "学习页面",
				isOptions: true, // tab 显示的条件
				// true ==》 课程与视频
				// false ==》 显示评价
				isShade: true, // 默认显示遮罩 
				courseId: "", // 课程的id
				userName: "", // 用户名

				// 课程的信息
				courseInfo: {},
				videoList: [], // 视频列表
				commentList: [], // 评价列表
				isBuy: false, // 是否购买 默认没有购买

				videoUrl: "", //播放视频的地址
				
				isComment:false,// 控制评价弹窗的 条件
				
			}
		},
		created: function() { // 创建之后获取 用户信息
			// 动态路由传递过来了、
			this.courseId = this.$route.params.id;
			// 获取用户信息
			var userInfo = utils.storage.getUserInfo();
			if(userInfo) { // 遮罩消失
				this.isShade = false;
				// 用户名
				this.userName = userInfo.userName;
			} else { // 遮罩还是显示
				this.isShade = true;
			}

			// 调取 对应课程的数据
			this.$axios({
				url: "/Handler/CourseHandler?action=learn",
				method: "get",
				params: {
					userName: this.userName,
					courseId: this.courseId
				}
			}).then((res) => {
				//判断是否成功
				if(res.data.success) {
					// 保存浏览器器返回的数据
					var resData = res.data.data;

					// 保存数据  ==》 绑定到页面上 	
					// 课程的名称
					this.courseInfo.Cname = resData.Cname;
					//课程描述
					this.courseInfo.Cdescribe = resData.Cdescribe;
					// 课程价格
					this.courseInfo.Cprice = resData.Cprice;
					// 视频数据
					this.videoList = resData.Vlist;
					// 评价数据
					this.commentList = resData.evaluate;
					//是否购买
					this.isBuy = resData.isBuy;
					// 设置视频播放
					this.selectVideo(this.videoList[0].Vurl)

				} else {
					alert(res.data.err)
				}
			}).catch((err) => {
				alert(err)
			})

		},
		methods: {
		getFormatTime: function(time) { // 转化格式
				var date = new Date(time); // 转换为 date对象
				return date.getFullYear() + "/" +
					(date.getMonth() + 1) + "/" +
					date.getDate()
			},
			closeAlert:function(commentData){ // 关闭弹窗
				// commentData ==> 评价的内容
				if(commentData){ // 存在
					// 提交 评价内容
					this.$axios({
						method:"post",
						url:"/Handler/CourseHandler?action=addcoursecomments",             
						data:{
							courseId:this.courseId, // 课程ID	
							userName:this.userName,// 用户名
							evaluate:commentData, // 评价内容
						}
					}).then((res)=>{
						if(res.data.success){// 成功
							this.isComment=false;// 控制的
							// 把评论的内容 push到   评论的数组中
							this.commentList.push({
								userName:this.userName, // 评价的人
								createAt:new Date(), // 评价的时间
								evaluate:commentData // 评价的内容
							})
						}else{
							alert(res.data.err)
						}
						
					}).catch((err)=>{
						alert(err)
					})
				}else{ // 不存在
					this.isComment=false;
				}
			},
			openAlert:function(){ // 显示弹窗
				this.isComment=true;  // 控制的条件  true
			},
			showVideo: function() {
				this.isOptions = true;
			},
			showComment: function() {
				this.isOptions = false;
			},
			selectVideo: function(url) { // 选择播放的视频
				// url ==> 播放视频的地址
				this.videoUrl = url;
			},
			puyCourse: function() { // 购买课程的方法
				//				this.isBuy=!this.isBuy;	
				// 给后台发送数据  完成 购买
				if(this.isBuy) { // true 购买了
					alert("已经购买")
				} else { // false
					this.$axios({
						method: "post",
						url: "/Handler/CourseHandler?action=buycourse",
						data: {
							userName: this.userName, // 用户姓名
							courseId: this.courseId, // 课程ID
						}
					}).then((res) => { // 请求成功
						if(res.data.success) {
							this.isBuy = true;
							alert("购买成功")
						} else {
							alert(res.data.err)
						}
					}).catch((err) => {
						alert(err)
					})
				}
			}
		}

	}
</script>

<style scoped="scoped">
	.video-warp {
		padding: 0.1rem;
		height: 5.6rem;
		position: relative;
	}
	
	. .video-warp video {
		width: 100%;
	}
	
	.list-title {
		background-color: #fff;
		color: #444;
		padding: 0.3rem;
		border: 1px solid #DDDDDD;
		font-size: 14px;
		margin: 0 0.1rem;
		line-height: 0.4rem;
		height: 0.4rem;
	}
	
	.course-describe {
		padding: 0.2rem 0 0.3rem 0.3rem;
		font-size: 14px;
	}
	
	.course-describe p {
		margin-top: 0.3rem;
	}
	
	.nav-list {
		padding: 0 0.1rem;
		display: flex;
		justify-content: space-between;
	}
	
	.nav-list div {
		width: 50%;
		text-align: center;
		font-size: 14px;
		border: 1px solid #DDDDDD;
		height: 1rem;
		line-height: 1rem;
	}
	
	.video-list {
		padding-left: 1.8rem;
	}
	/* 视频*/
	
	.video-list .video-item {
		padding-left: 0.6rem;
		border-left: 2px dashed #ccc;
		position: relative;
		line-height: 1.5rem;
		height: 1.5rem
	}
	
	.video-list .video-item .dd {
		width: 0.3rem;
		height: 0.3rem;
		border: 2px solid #ccc;
		border-radius: 0.3rem;
		position: absolute;
		top: 0.5rem;
		left: -0.22rem;
	}
	
	.video-list .video-item .name-time {
		display: flex;
		justify-content: space-between;
		padding: 0 1.8rem 0 0;
		font-size: 14px;
	}
	
	.video-list .video-item .name-time.color {
		color: #4cd964;
	}
	/* 评价  */
	
	.evaluate-list {
		padding: 0 0.1rem;
	}
	
	.evaluate-list .evaluate-item {
		min-height: 2rem;
		border: 1px solid #DDDDDD;
		display: flex;
		padding: 0.2rem 0 0 0.4rem;
	}
	
	.evaluate-list .evaluate-item .img-warp {
		height: 1.5rem;
		width: 1.5rem;
	}
	
	.evaluate-list .evaluate-item .img-warp img {
		height: 100%;
		width: 100%;
	}
	
	.evaluate-list .evaluate-item .text-warp {
		font-size: 14px;
		margin-left: 0.2rem;
		flex-grow: 2;
	}
	
	.evaluate-list .evaluate-item .text-warp p:first-child {
		margin-top: 0.4rem;
	}
	
	.evaluate-list .evaluate-item .text-warp p:last-child {
		margin-top: 0.2rem;
	}
	
	.evaluate-list .evaluate-item .time-warp {
		margin: 0.5rem 0.5rem 0 0;
		font-size: 14px;
	}
	
	.color {
		/*color: #0a9ec7;*/
		color: red;
	}
</style>