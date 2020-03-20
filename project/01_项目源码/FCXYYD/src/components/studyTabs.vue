<template>
	<div>
		<div class="tab-wrap">
			<div class="tab">
				<div class="tab-item" @click="openAlert">
					<i class="fa  fa-pencil  fa-fw"></i>
					<span>评价</span>
				</div>
				<div class="tab-item " :class="{color:isBuy}" @click="puyCourse">
					<div> <i class="fa fa-cart-plus  fa-fw"></i></div>
					<span>购买</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:["isBuy"],
		methods:{
			puyCourse:function(){ // 购买课程
				this.$emit("puyCourse"); // 触发购买的事件
			},
			openAlert:function(){ // 打开弹窗
				this.$emit("openAlert")
			}
			
		}
		
	}
	
</script>

<style scoped>
	.tab-wrap .tab {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1.6rem;
		/*line-height: 0.6rem;*/
		display: flex;
		background: #fff;
		box-shadow: 0 0 3px rgba(0, 0, 0, .2);
	}
	
	.tab-wrap .tab .tab-item {
		padding-top: 6px;
		flex: 1;
		text-align: center;
	}
	
	.tab-wrap .tab .tab-item {
		display: block;
		font-size: 16px;
		color: rgb(77, 85, 93);
		font-size: 0.4rem;
	}
	
	.tab-wrap .tab .tab-item i {
		font-size: 0.6rem;
	}
	
	.tab-wrap .tab .tab-item span {
		display: block;
		margin-top: 4px;
	}
	
	.tab-wrap .tab .tab-item.color {
		color: #0a9ec7!important;
	}
</style>