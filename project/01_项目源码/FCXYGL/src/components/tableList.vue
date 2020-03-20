<template>
	<div class="box-wrap">
		<table class="tableList_table table-hover table-bordered">
			<thead>
				<tr>
					<th v-for="data in th_list" :width="data.width">
						{{data.value}}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr     @click="onTrClick(rowData,index)" v-for="(rowData,index) in list"  v-bind:class="{'tableList_tr_black':index%2==1?true:false,'clickBg':rowData.isClick}">
					<td v-for="(colType,index) in th_list" v-html="rowData[colType.type]" v-if="index < th_list.length-1">
					</td>
					<td>
						<button @click="onUpdate(rowData)" v-if="rowData.edit&&!appendDir">编辑</button>
						<button @click="onDelete(rowData)" v-if="rowData.delete&&!appendDir">删除</button>
						<button @click="onChangeState(rowData)" v-if="rowData.freeze&&!appendDir">{{rowData.isstate?"解冻":"冻结"}}</button>

  					<button @click="onAdd(rowData)"  v-if="rowData.add&&appendDir" >添加</button>
            <button @click="onSetFrame(rowData)" v-if="rowData.frame&&!appendDir">{{rowData.stateNum==1||rowData.stateNum==3?'上架':'下架'}}</button>
            <button  @click="onTop(rowData)" v-if="rowData.stick&&!appendDir">{{!rowData.isTop?"置顶":"取消置顶"}}</button>
					</td>
				</tr>



				<tr>&nbsp;</tr>
				<tr>&nbsp;</tr>
				<tr>&nbsp;</tr>
			</tbody>
			<tfoot v-if="!hideFoot">
				<tr>
					<!-- 绑定列数 -->
					<td v-bind:colspan="th_list.length" class="paging_class">
						<div>
							<ul class="pageTheLi">
								<li>
									<a @click="onFirst">
										<img src="../assets/first.png">
									</a>
								</li>
								<li>
									<a @click="onPrev">
										<img src="../assets/prev.png">
									</a>
								</li>
								<li style="border:none;">
									{{pageStart}}
								</li>
								<li>
									<a @click="onNext">
										<img src="../assets/next.png">
									</a>
								</li>
								<li>
									<a @click="onLast">
										<img src="../assets/last.png">
									</a>
								</li>
							</ul>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>
<script>
export default {
  methods: {
    onSetFrame: function(data) {
      // 上下架
      this.tableListData.btn_list.setFrame(data);
    },
    onTop: function(data) {
      // 置顶
      this.tableListData.btn_list.top(data);
    },
    onTrClick: function(data, index) {
      if (data.click) {
        for (var i = 0, len = this.list.length; i < len; i++) {
          this.list[i].isClick = false;
          if (this.list[i].ID == data.ID) {
            this.list[i].isClick = true;
          }
        }
        this.tableListData.btn_list.getVideoList(data);
      }
    },
    // 方法 ==》 触发 传递数据中 功能  ==》 分页
    onChangeState: function(data) {
      // 改变状态的方法
      this.tableListData.btn_list.changeState(data);
    },
    onUpdate: function(data) {
      // 编辑的方法 data ==》 管理员数据
      this.tableListData.btn_list.update(data);
    },
    onDelete: function(data) {
      // 删除的方法 data ==》 管理员的数据
      this.tableListData.btn_list.delete(data); // 管理员的数据
    },
    onFirst: function() {
      // 第一页
      this.tableListData.btn_list.firstClick();
    },
    onLast: function() {
      // 最后一页
      this.tableListData.btn_list.lastClick();
    },
    onNext: function() {
      // 下一页
      this.tableListData.btn_list.nextClick();
    },
    onPrev: function() {
      // 上一页
      this.tableListData.btn_list.prevClick();
    },
    onAdd: function(data) {
      // console.log(this);
      this.appendDir(data.ID);
      // console.log(data.ID)
      // this.$emit('appendDir',data.ID)
    }
  },
  data() {
    // 数据
    return {
      th_list: this.tableListData.th_list, // 表格头部数据
      hideFoot: this.tableListData.hideFoot
    };
  },
  computed: {
    // 计算属性  取活的数据
    list() {
      // 表格内容数据
      return this.tableListData.list;
    },
    pageStart: function() {
      return this.tableListData.pageStart; // 分页器上面的页数
    }
  },
  props: ["tableListData", "appendDir"] // 接受表格数据的的名称
};
</script>

<style scoped>
/*
* {
  margin: 0;
  padding: 0;
} */
.clickBg {
  background-color: #f9cc9d !important;
}
.tableList_table {
  width: 100%;
  /*height:400px;*/
  background-color: #ffffff;
  border-collapse: collapse;
}

.tableList_table thead tr {
  color: #666666;
  background-color: #efefef;
  border: 1px solid #c0c0c0;
  height: 34px;
  font-size: 13px;
}

.tableList_table tbody tr {
  height: 34px;
  font-size: 14px;
}

.tableList_table tbody tr td {
  padding-left: 10px;
  height: 34px;
  font-size: 14px;
}

.tableList_table thead tr {
  border-right: none;
}

.tableList_table thead tr th {
  padding-left: 10px;
  border-right: 1px solid #c0c0c0;
}

.tableList_tr_black {
  /* 隔行换色 使用的样式*/
  background-color: #FAFAFA;
  /*background-color: red;*/
}

.tableList_table tbody tr:hover {
  /*鼠标移入时的背景颜色*/
  background-color: #cddae7;
}

.tableList_table tbody button {
  margin: 0;
  padding: 0;
  list-style-type: none;
  color: blue;
  background: none;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: none;
  border-left-style: none;
  /* width: 50px; */
  height: 30px;
  line-height: 30px;
}

.tableList_table tbody button:hover {
  cursor: pointer;
}

#tableList_table_tbody_tr_click {
  border: 1px solid #c0c0c0;
}

.tableList_table tfoot {
  width: 100%;
}

.tableList_table tfoot tr {
  width: 100%;
  height: 30px;
  border: 1px solid #c0c0c0;
}

.tableList_table tfoot tr td {
  height: 30px;
}

.tableList_table tfoot tr td li {
  border: none;
}

.tableList_table tfoot tr td li img {
  vertical-align: bottom;
  margin-bottom: 3px;
}

.tableList_table tfoot tr td li img:hover {
  cursor: pointer;
}

.paging_class {
  text-align: left;
}

.box-wrap {
  padding: 0;
}
.pageTheLi{
  margin: 0;
}
.pageTheLi li {
  float: left;
  margin-left: 30px;
}
</style>