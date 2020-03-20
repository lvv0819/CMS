<template>
	<div>
		<div>
			<fchead></fchead>
		</div>

		<div class="adminListContent">
			<!-- 全包裹 -->
			<span style="color:#2880E4">首页/</span> <span>用户管理/</span> <span>学员</span>

			<!-- 导航  ===》 面包屑导航  -->
			<div class="fc_section_wrap">
				<ul>
					<li class="admin_top_input">
						<input type="text" placeholder="用户名" v-model="searchData.userName" />
					</li>
					<li class="admin_top_input">
						<input type="text" placeholder="邮箱" v-model="searchData.email" />
					</li>
					<li class="admin_top_input">
						<input type="text" placeholder="手机号" v-model='searchData.phone' />
					</li>
					<li>
						<button class="btn_class" style="background: #5cb85c;" @click="search">查询</button>
					</li>
				</ul>
				<ul>
					<li class="admin_top_input">
						<input type="text" placeholder="用户名" v-model="addData.userName" />
					</li>
					<li class="admin_top_input">
						<input type="text" placeholder="邮箱" v-model="addData.email" />
					</li>
					<li class="admin_top_input">
						<input type="text" placeholder="手机号" v-model="addData.phone" />
					</li>
					<li>
						<button class="btn_class" style="background: #5cb85c;" @click="addStudent">添加</button>
					</li>

				</ul>
			</div>

			<div class="box">
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">学员列表</div>
				</div>
				<div class="box_bottom">
					<!-- 学员页面和  管理员页面  使用的统一  表格组件-->
					<!-- tableListData  -->
					<!-- 父传子的方式  -->
					<tablelist v-bind:tableListData="tableListData"></tablelist>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	import fchead from '@/components/fchead';
	import tablelist from '@/components/tableList';
	import studentStore from '@/vuex/studentStore';
	export default {
		methods: {
			search: function() {

				console.log(this.searchData)
				studentStore.state.searchData.userName = this.searchData.userName;
				studentStore.state.searchData.email = this.searchData.email;
				studentStore.state.searchData.phone = this.searchData.phone;
				// 查询数据
				this.tableListData.getStudentData();
				// 查询条件
				studentStore.state.searchData.userName = "";
				studentStore.state.searchData.email = "";
				studentStore.state.searchData.phone = "";
				this.searchData = { // 查询的数据
					userName: "",
					email: "",
					phone: ""
				}
			},
			addStudent: function() { // 添加学员数据
				this.$axios({
					url: "/VueHandler/AdminHandler?action=adduser",
					method: "post",
					data: {
						email: this.addData.email,
						phone: this.addData.phone,
						userName: this.addData.userName
					}
				}).then((res) => {
					// 判断是否成功
					if(res.data.success) {
						this.tableListData.getStudentData()
						this.addData = {
							userName: "",
							email: "",
							phone: ""
						};
						alert('添加成功')
					} else {
						alert(res.data.err)
					}
				}).catch((err) => {
					alert(err)
				})

			}
		},
		components: {
			fchead,
			tablelist
		},
		data: function() {
			return { // 获取表格数据
				tableListData: studentStore.state.tableList,
				searchData: { // 查询的数据
					userName: "",
					email: "",
					phone: ""
				},
				addData: { // 添加的数据
					userName: "",
					email: "",
					phone: ""
				}
			}
		},
		mounted: function() { // 挂载之后
			// 获取学员数据
			this.tableListData.getStudentData()
		}
	}
</script>
<style scoped>


	.adminListContent {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		background: #f5f5f5;
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
		height: 70px;
		padding: 10px;
		border: 1px solid #c0c0c0;
		background: #ffffff;
		margin-top: 15px;
		margin-bottom: 15px;
	}

	.fc_section_wrap ul {
		margin: 0 0 8px 0;
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
		border: 1px solid #c0c0c0;
	}

	.box_top {
		height: 34px;
		position: relative;
		border-bottom: 1px solid #c0c0c0;
	}

	.box_left {
		position: absolute;
		width: 34px;
		height: 34px;
		border-right: 1px solid #c0c0c0;
		background: url(../assets/box.png) no-repeat center;
	}

	.box_right {
		padding-left: 40px;
	}

	.box_bottom {
		overflow: hidden;
	}
</style>