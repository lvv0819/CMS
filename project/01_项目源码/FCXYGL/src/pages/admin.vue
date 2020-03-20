<template>
	<div>
		<div>
			<fchead></fchead>
		</div>
		<!--搜索框  + 按钮-->
		<div class="adminListContent ">
			<!-- 全包裹 -->
			<span style="color:#2880E4">首页/</span> <span>用户管理/</span> <span>系统人员</span>
			<!-- 导航  ===》 面包屑导航  -->
			<div class="fc_section_wrap">
				<!-- 搜索 还有 添加的按钮 -->
				<ul>
					<li class="admin_top_input">
						<input v-model="searchText" type="text"  placeholder="模糊查询：姓名" />
					</li>
					<li>
						<button class="btn_class" @click="search" style="background: #5cb85c;">查询</button>
					</li>
					<li class="admin_top_add">
						<button  class="btn_class" @click="addAdmin"  style="background:#4F66B3;" >+ 添加</button>
					</li>
				</ul>
			</div>

			<!-- 表格 -->
			<div class="box">
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">系统人员列表</div>
				</div>
				
				<div class="box_bottom">
					<!-- 使用用表格组件 -->
					<!--<h1>表格组件</h1>-->
					<tablelist  v-bind:tableListData='tableListData'></tablelist>
					<!-- 父  ==》 子            核心 props  --> 
					<!-- 在子组件里面  在props定义接受数据的名称    -->
					<!--   props:["接受数据的名称1","接受数据的名称2"]-->
					
					<!-- 在父里面 使用 子组件时 通过v-bind绑定这个接受数据
						传递数据
					-->
					<!--  v-bind:接受数据的名称1 ="传递的数据"-->
					
					
					<!--{{tableListData.list}}-->
				</div>
			</div>
		</div>
		<!--使用  管理员 弹窗-->
		<div v-show='alertSwitch'>
			<admin-alert></admin-alert>
		</div>
		
	</div>
</template>
<script>
	// 在一个组件里面使用其他组件 
	// 1. 加载  es6的语法加载
	// 2. 注入 注册局部组件的方式 注入  components：{}
	// 3. 使用 像页面的 组件的使用方式去使用
	//加载  头部  fchead组件
	import fchead from '@/components/fchead.vue';
	//加载 表格组件
	import tablelist from '@/components/tableList.vue';
	// 加载管理员弹窗
	import adminAlert from '@/components/adminAlert.vue';
	// 加载adminStore.js
	// 通过 data| computed 获取里面的数据
	// 传递给  tablelist组件
	// tablelist里面渲染表格头部
	import adminStore from '@/vuex/adminStore.js'
	export default {
		computed:{ // 计算属性
			alertSwitch:function(){
				// adminStore中state 中定义的控制弹窗的属性
				return adminStore.state.alertSwitch;
			}
		},
		
		components:{fchead,tablelist,adminAlert},
		data(){
			return {
				// 获取管理员表格数据
				tableListData:adminStore.state.tableList,
				// 查询姓名绑定的数据
				searchText:""
			}
		},
		mounted:function(){ // 挂载之后 调取数据
			this.tableListData.getAdminData(); // 执行调取数据的方法		
		},
		methods:{
			addAdmin:function(){ // 点击添加时 触发的方法			
				// adminStore中 改变控制弹窗属性的方法
				adminStore.commit("changeAlertSwitch",true);
				// 设置弹窗数据的方法
				adminStore.commit('setAlertData');
				
			},
			
			
			search:function(){// 点击查询时 触发的方法
				// 输入框的值  传递到   store 中 的 查询姓名的条件上
				// 1. v-model 2. ref this.$refs
				// 调取数据
				// 步骤  v-model
				// 1. 在 组件中设置查询的数据				
				// 2. 绑定在 输入框上  绑定search方法
				// 3. 在查询的方法里面  获取 输入框中的数据 
				 //    ==》 传递到   store 中 的 查询姓名的条件上
				// 4 . 调取数据
				// 5 . 清空查询的数据（store 中 的 查询姓名的条件， 输入框中的值） 
//				this.searchText ==>输入框中的数据
				adminStore.state.searchText=this.searchText;
				this.tableListData.getAdminData(); // 执行调取数据的方法
				this.searchText="";
				adminStore.state.searchText=this.searchText;
			}
		}
	}
</script>

<style scoped>
	.adminListContent {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		background: #F5F5F5;
		min-width: 1100px;
		height: 100%;
	}
	
	.admin_top_input input {
		width: 250px;
		height: 25px;
		padding-left: 5px;
	}
	
	.fc_section_wrap {
		height: 35px;
		padding: 10px;
		border: 1px solid #C0C0C0;
		background: #FFFFFF;
		margin-top: 15px;
		margin-botton: 15px;
	}
	
	.fc_section_wrap ul {
		margin: 0;
		padding: 0;
	}
	
	.fc_section_wrap ul li {
		display: inline-block;
		margin: 0;
		margin-right: 5px;
		padding: 0;
	}
	
	.admin_top_add {
		float: right;
	}
	
	.btn_class {
		width: 80px;
		height: 32px;
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
		color: #fff;
		margin-right: 10px;
	}
	
	.box {
		width: 100%;
		line-height: 34px;
		background: #fff;
		text-align: left;
		margin-top: 15px;
		border: 1px solid #C0C0C0;
	}
	
	.box_top {
		height: 34px;
		position: relative;
		border-bottom: 1px solid #C0C0C0;
	}
	
	.box_left {
		position: absolute;
		width: 34px;
		height: 34px;
		border-right: 1px solid #C0C0C0;
		background: url(../assets/box.png) no-repeat center;
	}
	
	.box_right {
		padding-left: 40px;
	}
	
	.box_bottom {
		overflow: hidden;
	}

	
</style>