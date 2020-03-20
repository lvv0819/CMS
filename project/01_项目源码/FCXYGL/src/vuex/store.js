//在store.js中编写生成 store仓库的代码
//    1）加载vue
//    2） 加载vuex
//    3） 使用 vuex插件    	Vue.use(Vuex)

//    4) 编写 store的 state mutations **
//    5） 暴露store实例 **

// 计算器  
import Vue from 'vue';// 加载vue
import Vuex from 'vuex';// 加载vuex
// 使用vuex 插件
Vue.use(Vuex);
// 编写 state 和 mutations 
var state={ // 数据
	num:0,
	text : 'vuex中的计数器'
};
var mutations={
	add:function(state,data){
		state.num++;
	},
	jian:function(state,data){
		state.num--;
	}
};
// 暴露出去
export default new Vuex.Store({
	state,
	mutations
})
