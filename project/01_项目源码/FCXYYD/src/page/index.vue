<template>
	<div>
		<!-- 标题-->
		<page-head :title="title"></page-head>
		<!-- 轮播-->
		<div>
			<!-- 使用  swiper 和 swiper-slide 组件-->
			<swiper :options="setSwiperOptions" class="swiper-box">

				<swiper-slide  v-for="item in bannerList" :key="item.ID">
					<img @click="goStudy(item.ID)" :src="item.Cpic" alt="" />
				</swiper-slide>

				<div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</div>

		<!-- 最新课程 -->
		<div class="list-title">
			<span>最新课程</span>
		</div>
		<div class="list-item">

			<div class="item-row">
				<div class="item-box" @click="goStudy(item.ID)" v-for="item in newList" >
					<div class="img-warp">
						<img :src="item.Cpic" alt="...">
						<h2>{{item.Cname}}</h2>
						<p>{{item.Cdescribe}}</p>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	// index.vue 首页
	import pageHead from "@/components/pageHead";
	// 加载 vue-awesome-swiper中的组件  swiper 和  swiperSlide
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: { //注入 
			pageHead,
			swiper,
			swiperSlide
		},
		data: function() {
			return { // swiper 设置的api 
				setSwiperOptions: {
					autoplay: true, //等同于以下设置
					pagination: { // 轮播的焦点
						el: '.swiper-pagination',
					},
				},
				title: "首页",
				bannerList: [], // 轮播的数据
				newList: [], // 最新课程的数据
			}

		},
		created:function(){ // 创建之后 调取首页数据
			this.$axios({
				method:"get",
				url:"/Handler/CourseHandler?action=indexshow"
			}).then((res)=>{
				if(res.data.success){ // 成功
					console.log("成功")
					// 获取到 后台发送的首页的数据
					console.log(res.data.data);
					this.bannerList=res.data.data.bannerList;
					this.newList=res.data.data.newList;
				}else{
					alert(res.data.err)
				}
			}).catch((err)=>{
				alert(err)
			})					
		},
		methods:{
			goStudy(id){ // 跳转到学习页
				this.$router.push("/study/"+id)
			}
		}

	}
</script>

<style scoped="scoped">
	.swiper-box {
		width: 100%;
		height: 4.65rem;
	}
	
	.swiper-box img {
		width: 100%;
		Height: auto;
	}
	
	.list-title {
		background-color: #fff;
		color: #444;
		padding: 0.4rem;
		border: 1px solid #DDDDDD;
		font-size: 0.6rem;
	}
	
	.list-item {
		padding: 5px;
	}
	
	.list-item .item-row {
		padding: 16px;
		display: flex;
		flex-wrap: wrap;
		/*放不下    换行   */
	}
	
	.list-item .item-row .item-box {
		width: 50%;
	}
	
	.list-item .item-row .item-box .img-warp {
		padding: 0 6px;
	}
	
	.list-item .item-row .item-box .img-warp img {
		width: 100%;
	}
	
	.list-item .item-row .item-box h2 {
		font-weight: normal;
		margin: 0 0 0.2rem 0;
	}
	
	.list-item .item-row .item-box p {
		margin: 10px 0;
	}
	
	.course-list {
		padding: 5px;
	}
</style>