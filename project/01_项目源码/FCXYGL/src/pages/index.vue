<template>
	<div class="main">
		<div>
			<fchead></fchead>
		</div>



		<div class="index_body">
			<!-- 快捷操作开始 -->
			<div class="quick_links">
				<div class="quicklinks_one">
					<h1>课程列表</h1>
					<h2>Course List</h2>
					<div class="icon_wrap"><i class="fa fa-th-large"></i></div>
					<p>查询现有课程，添加课程，管理课程</p>
				</div>
				<div class="quicklinks_one">
					<h1>课程添加</h1>
					<h2>Course Add</h2>
					<div class="icon_wrap"><i class="fa fa-plus"></i></div>
					<p>添加、修改课程信息，为课程添加视频课件……</p>
				</div>
				<div class="quicklinks_one mouse_on">
					<h1>课程置顶</h1>
					<h2>Course Up</h2>
					<div class="icon_wrap"><i class="fa fa-arrow-up"></i></div>
					<p>课程置顶，显示在移动端banner上</p>
				</div>
				<div class="quicklinks_one">
					<h1>视频管理</h1>
					<h2>Video Manage</h2>
					<div class="icon_wrap"><i class="fa fa-youtube-play"></i></div>
					<p>管理视频，上传、删除</p>
				</div>
				<div class="quicklinks_one mouse_on">
					<h1>用户管理</h1>
					<h2>User Manage</h2>
					<div class="icon_wrap"><i class="fa fa-user"></i></div>
					<p>管理系统用户</p>
				</div>
				<div class="quicklinks_one mouse_on">
					<h1>学员管理</h1>
					<h2>Student Manage</h2>
					<div class="icon_wrap"><i class="fa fa-file"></i></div>
					<p>管理学员</p>
				</div>
			</div>

			<!-- 图表开始 -->
			<!--整体 包-->
			<div class="charts_wrap">
				<!--单个的包-->
				<div style="background:#fff; padding-top:20px; height:340px;"  >

					<!--具体的图表-->
					<div style="width:400px; height:370px;" ref='echarts01'></div>

				</div>

				<div style="background:#fff; padding-top:20px; height:340px;">

					<div style="width:530px; height:370px;" ref='echarts02'></div>

				</div>

				<div style="background:#fff; padding-top:20px; height:340px;">

					<div style="width:580px; height:370px;" ref='echarts03'></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 加载
	// 注入
	// 使用   fcHead ==> fc-head
	import fchead from '@/components/fchead.vue';
	// 加载 echarts 图表
	import  echarts from 'echarts';

		// 加载   echarts
		export default {
			components:{fchead},
			mounted:function(){
			// 1. 下载 echarts 图表    
			// npm install echarts --save
			// 2. 使用
			//     1) 引入  import  echarts from 'echarts'

			//     2) 初始化一个 echarts 对象 echarts.init('dom节点')
			//           标签里面  ref="名称"    this.$refs.名称
			//     3) 设置 选项 options
			//           官网上 有  考过来==》 例子看不懂的  ==》 去文档里面查询  ctrl + f
 			//     4） echarts.setOption({选项})
			// 初始化 echarts 对象     echarts.init(节点)
//			var echarts01 =echarts.init(this.$refs.echarts01);
//			// 官网上  找一个例子
//			var option01 = {
//				title:{ // 标题
//					text:"学习人数比例",
//					x:"center",
//					textStyle:{
//						color:"red"
//					}
//				},
//		    tooltip : { // 提示框
//		        formatter: "{a} <br/>{b} : {c}%"
//		    },
//		    toolbox: { // 工具框
//		        show : true,
////		        feature : {
////		            mark : {show: true},
////		            restore : {show: true},
////		            saveAsImage : {show: true}
////		        }
//		    },
//		    series : [ //数据
//		        {
//		            name:'业务指标',
//		            type:'gauge',
//		            detail : {formatter:'{value}%'},
//		            data:[{value: 50, name: '完成率'}]
//		        }
//		    ]
//		};
//			// 设置选项     echarts对象的 .setOption(官网上的option)
//			echarts01.setOption(option01);
//			// 重启项目  npm run dev
//			// 看效果



			// ref 绑定     this.$refs.xx  获取
			var echarts01 = echarts.init(this.$refs.echarts01);

			// 从官网上复制  option
			var option01 = {
				title: { ////提示信息
					text: '学习人数比例',
					subtext: '  ', ////提示文字
					x: 'center', // //x 居中显示  y
					textStyle: {
						color: '#008ACD'
					}
				},

				tooltip: { // 鼠标移入时的显示框
					formatter: "{a} <br/>{b} : {c}%"
				},
				toolbox: {
					show: true,
					feature: {
						mark: {
							show: true
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				series: [{ // 数据
					name: '学习人数比例',
					type: 'gauge',
					splitNumber: 10, // 分割段数，默认为5
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: [
							[0.2, '#228b22'],
							[0.8, '#48b'],
							[1, '#ff4500']
							],
							width: 8
						}
					},
					axisTick: { // 坐标轴小标记
						splitNumber: 10, // 每份split细分多少段
						length: 12, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto'
						}
					},
					axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color: 'auto'
						}
					},
					splitLine: { // 分隔线
						show: true, // 默认显示，属性show控制显示与否
						length: 30, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: 'auto'
						}
					},
					pointer: {
						width: 5
					},
					title: {
						show: true,
						offsetCenter: [0, '-40%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder'
						}
					},
					detail: {
						formatter: '{value}%',
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color: 'auto',
							fontWeight: 'bolder'
						}
					},
					data: [{ // 里面的数据
						value: 60,
						name: '比例'
					}]
				}]
			};
			// 使用setOption ==》 设置 options
			echarts01.setOption(option01)

			var echarts02 = echarts.init(this.$refs.echarts02);
			var option02 = {
				title : {
					text: '考试通过率',
					subtext: '',
					x:'center'
				},
				color: ['#B6A2DE', '#57D2D3'],
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				calculable : true,
				series : [
				{
					name:'访问来源',
					type:'pie',
					center: ['50%', '50%'],
					data:[
					{value:335, name:'未通过'},
					{value:310, name:'通过'},

					]
				}
				]
			};

			echarts02.setOption(option02)

			var echarts03 = echarts.init(this.$refs.echarts03);
			var option03 ={
				title: {
					x: 'center',
					text: '时间、课程、新增课程输',
					subtext: ' '
					,
					textStyle: {
						color: '#008ACD'
					}
        },// 提示信息
        tooltip: {
        	trigger: 'item'
        },// 鼠标移入时的提示信息
        calculable: true, //是否启用拖拽重计算特性
        grid: {
        	borderWidth: 0,
        	y: 80,
        	y2: 60
        },// 坐标
        xAxis: [
        {
        	type: 'category',
        	show: false,
        	data: ['学习时间', '总课程数', '新增课程数']
        }
        ],// x
        yAxis: [
        {
        	type: 'value',
        	show: false
        }
        ], // y
        series: [//数据
        {
        	name: '',
        	type: 'bar',
        	itemStyle: {
        		normal: {
        			color: function (params) {
        				var colorList = [
        				'#C1232B', '#B5C334', '#F0805A'
        				];
        				return colorList[params.dataIndex]
        			},

        			barBorderRadius: 5,
        			label: {
        				show: true,
        				position: 'top',
        				formatter: '{b}\n{c}'
        			}
        		}
        	},
        	data: [12, 21, 10]
        }
        ]
    };

    echarts03.setOption(option03)


}
}
</script>
<style scoped>
	.index_body {
		background: url(../assets/images/index_body_bg.jpg);
		padding-top: 65px;
		color: #fff;
	}

	.quick_links {
		overflow: hidden;
	}

	.quicklinks_one {
		width: 12%;
		height: 202px;
		background: url(../assets/images/white_opacity_bg.png);
		position: relative;
		text-align: center;
		cursor: pointer;
		float: left;
		margin-left: 4%;
		margin-bottom: 54px;
	}

	.quicklinks_one h1 {
		font-size: 24px;
		font-family: "方正大标宋", "宋体";
		padding-top: 38px;
	}

	.quicklinks_one h2 {
		font-size: 12px;
		font-family: Arial, Helvetica, sans-serif;
		padding-top: 12px;
		font-weight: normal;
	}

	.quicklinks_one p {
		font-size: 12px;
		padding: 5px 22px 0;
		display: none;
		line-height: 21px;
	}

	.quicklinks_one .icon_wrap {
		position: absolute;
		top: 130px;
		left: 0;
		width: 100%;
	}

	.quicklinks_one i {
		font-size: 40px;
	}

	.quicklinks_one i {
		border: none;
		height: 20px;
	}

	.quicklinks_one .icon-plus {
		border: 4px solid #fff;
		border-radius: 2px;
	}

	.quicklinks_one .icon::before {
		position: absolute;
		left: -25px;
		top: -10px;
	}

	.quicklinks_one .icon-plus:before {
		width: 20px;
		border: 4px solid #fff;
		border-radius: 2px;
		left: -13px;
		top: 5px;
	}

	.quicklinks_one:hover {
		background-color: #27a9e3;
		transition: all 0.5s ease 0s;
	}

	.quicklinks_one:hover .icon_wrap {
		top: 22px;
		transition: all 0.5s ease 0s;
	}

	.quicklinks_one:hover h1 {
		padding-top: 78px;
		transition: all 0.5s ease 0s;
	}

	.quicklinks_one:hover h2 {
		display: none;
		transition: all 0.5s ease 0s;
	}

	.quicklinks_one:hover p {
		display: block;
		transition: all 0.5s ease 0s;
	}

	.quicklinks_one.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	/*图表*/

	.charts_wrap {
		margin-left: 4%;
		margin-right: 4%;
		background: url(../assets/images/white_opacity_bg.png);
		padding-top: 50px;
		overflow: hidden;
	}

	.charts_wrap>div {
		float: left;
		margin-left: 4%;
		overflow: hidden;
		margin-bottom: 50px;
	}

</style>