// // studentStore.js模板
/*
 * 规律: 定义 th_list  list  btn_list的数据（变量，数据结构）， 在表格组件中 渲染
 * 
 * 渲染：写管理员页面时，定义的
 *  
 * */

import axios from "axios";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 调取数据的方法  
var getStudentData = function(num) { // num ==> 请求的页数
    if (num) {
        state.pageStart = num; // 把请求的页数赋值到 state 中pageStart上
        state.tableList.pageStart = state.pageStart; // 分页器上面的页码
    }
    // 发送的请求
    axios({
        url: "/VueHandler/AdminHandler?action=usershow",
        method: "post",
        data: { // 发送的数据
            userName: state.searchData.userName, // 查询的用户名
            email: state.searchData.email, // 查询的邮箱
            phone: state.searchData.phone, // 查询的手机号
            pageStart: state.pageStart // 请求的页数
        }
    }).then(function(res) { // 成功之后的回调 
        // 请清空掉以前的数据
        state.tableList.list = [];
        // 1. 判断是否有获取数据成功
        // 2.  成功之后  ：计算最大的页数  
        // 			     清空以前的数据
        //            利用for循环取数据
        //             添加掉list里面
        if (res.data.err) {
            alert(res.data.err)
        } else {
            // 计算最大的页数
            state.maxStudentCount = Math.ceil(res.data.data.count / state.pageSize);

            for (var i = 0; i < state.pageSize; i++) { // for 取数据
                if (res.data.data.list[i]) { // 该条数据是否存在
                    var obj = {
                        // key 与 表格头部定义数据中 type有关
                        userName: res.data.data.list[i].userName,
                        email: res.data.data.list[i].email,
                        phone: res.data.data.list[i].phone,
                        createAt: res.data.data.list[i].createAt,
                        status: res.data.data.list[i].isstate ?  '<span style="color:red">冻结</span>':"正常",
                        isstate: res.data.data.list[i].isstate,
                        tokenId: res.data.data.list[i].tokenId,
                        // 控制表格按钮的属性
                        freeze: true, // 控制冻结按钮的属性
                        //		          edit:false
                    }
                    state.tableList.list.push(obj)
                } else {
                    state.tableList.list.push({})
                }
            }
        }
    }).catch(function(err) {
        alert(err)
    })
}
var state = { // 数据
    pageStart: 1, //查询起始页
    pageSize: 6, //每页显示条数
    maxStudentCount: 0, //最大页码
    minStudentCount: 1, //最小页码
    searchData: { // 查询的数据
        userName: "",
        email: "",
        phone: ""
    },

    tableList: { // 表格数据
        // 分页器上的页码
        pageStart: 1,
        getStudentData: getStudentData, // 调取学员数据的方法
        th_list: [ // 表头
            {
                value: "用户名",
                type: 'userName',
                width: "10%"
            },
            {
                value: "邮箱",
                type: 'email',
                width: "20%"
            },
            {
                value: "手机",
                type: 'phone',
                width: "15%"
            },
            {
                value: "注册日期",
                type: 'createAt',
                width: "25%"
            },
            {
                value: "状态",
                type: 'status',
                width: "10%"
            },
            {
                value: "操作",
                width: "10%"
            }
        ],
        list: [], // 表格内容
        btn_list: { // 表格功能按钮
            changeState: function(data) { // 改变状态的功能 冻结和解冻
                // data 使用时传递的数据 该行的信息
                axios({
                    url: "/VueHandler/AdminHandler?action=lockuser",
                    method: "get",
                    params: {
                        tokenId: data.tokenId // 用户的id
                    }
                }).then(function(res) {
                    // 判断操作是否成功
                    if (res.data.success) {
                        alert('操作成功');
                        // 重新获取数据
                        getStudentData();
                    } else {
                        alert(res.data.err);
                    }
                }).catch(function(err) {
                    alert(err)
                })
            },
            // 分页的方法
            firstClick: function() { // 第一页
                getStudentData(Vue.prototype.$studentStore.state.minStudentCount);
                // 在vue原型上找的时候 ==》 在main.js上赋值到vue原型上
            },
            lastClick: function() { // 最后一页	
                getStudentData(Vue.prototype.$studentStore.state.maxStudentCount);
            },
            nextClick: function() { // 下一页  
                Vue.prototype.$studentStore.commit('addPageStart');
                getStudentData();
            },
            prevClick: function() { // 上一页  
                Vue.prototype.$studentStore.commit('subPrevClick');
                getStudentData();
            }
        }
    }
};
var mutations = {
    addPageStart: function(state) {
        if (state.pageStart < state.maxStudentCount) {
            state.pageStart++;
            state.tableList.pageStart = state.pageStart;
        } else {
            alert('已是最大页数')
        }
    },
    subPrevClick: function(state) {
        if (state.pageStart > 1) {
            state.pageStart--;
            state.tableList.pageStart = state.pageStart;
        } else {
            alert('已是最小页数')
        }
    },
};
export default new Vuex.Store({
    state,
    mutations
})