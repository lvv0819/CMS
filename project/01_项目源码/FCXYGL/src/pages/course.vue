<template>
	<div >
		<div>
			<fchead></fchead>
		</div>
		<div class="adminListContent ">
			<span style="color:#2880E4">首页/</span> <span>课程管理/</span> <span>课程</span>
			<div class="fc_section_wrap  ">
				<ul>
					<li class="admin_top_input ">
						<input type="text"  v-model="searchText" placeholder="模糊查询：课程名称" />
					</li>
                    <li>
                        <select-category :categoryData='categoryData' @categoryData='setCategory'></select-category>
                    </li>
					<li>
						<button class="btn_class" @click="search" style="background: #5cb85c;">查询</button>
					</li>
				</ul>
			</div>

			<!-- 表格 -->
			<div class="box">
				<div class="box_top">
					<div class="box_left"></div>
					<div class="box_right">课程列表</div>
				</div>
				<div class="box_bottom">
					<tablelist  v-bind:tableListData='tableListData'></tablelist>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import fchead from "@/components/fchead.vue";
import tablelist from "@/components/tableList.vue";
import selectCategory from "@/components/selectCategory.vue";
import courseStore from "@/vuex/courseStore.js";
export default {
  components: { fchead, tablelist, selectCategory },
  data() {
    return {
      tableListData: courseStore.state.tableList,
	  searchText: "",
	  categoryData:{}
    };
  },
  mounted: function() {
    // 挂载之后 调取数据
    this.tableListData.getCourseData(); // 执行调取数据的方法
  },
  methods: {
    setCategory(data) {
      //获取改变后的权限数据
      courseStore.commit("setCategory", data);
    },
    search: function() {
      // 点击查询时 触发的方法
      courseStore.state.searchText=this.searchText;
      this.tableListData.getCourseData();
      this.searchText="";
	  courseStore.state.searchText=this.searchText;
	  courseStore.commit("setCategory",{});
	  this.categoryData={}
    }
  }
};
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
  padding: 10px;
  border: 1px solid #c0c0c0;
  background: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
  min-width: 1100px;
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