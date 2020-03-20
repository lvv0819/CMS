// vuex  ==》 adminStore.js ==》放置 管理员的数据 表格数据的

// 表格数据 
// 1. 表头
// 2. 表格内容
// 3. 表格中功能

// vuex 怎么写 写的顺序 ？
//  1. 加载 vue
//  2. 加载vuex
//  3. 使用vuex
//  4. 编写 store 的  state mutations
//  5. 暴露 store 实例

// 调取数据 ==》 后台  ==》 axios ==》 加载axios 
import axios from "axios";

import Vue from 'vue'; // Vue.prototype.$axios()
import Vuex from 'vuex';
Vue.use(Vuex);
// 调取数据的方法  考虑 分页  和 查询
var getAdminData = function(num) { // num ==> 请求的页数
    if (num) {
        state.pageStart = num; // 把请求的页数赋值到 state 中pageStart上
        //  分页器上的页码                    =   请求的页码 
        state.tableList.pageStart = state.pageStart;
    }
    axios({
        method: "get",
        url: "/VueHandler/AdminHandler?action=show",
        params: {
            searchText: state.searchText, // 查询的姓名
            pageStart: state.pageStart // 请求的页数
        }
    }).then(function(res) {
        // 清空掉以前的数据
        state.tableList.list = [];
        // 判断数据请求成功没有
        if (res.data.err) { // 请求数据失败
            alert(res.data.err)
        } else { // 请求数据成功
            // 计算最大的页数      总共的条数 / 每一页的条数 = 页数 （如果小数 向上取整）
            // Math.ceil() ==> 向上取整  1.1 ==》2

            state.maxAdminCount = Math.ceil(res.data.data.count / state.pageSize);


            // res.data==> 返回数据  {success:"成功",data:{管理员数据} }
            //			res.data.data ==》 管理员数据 
            // 把数据放置在 state中tableList中list上面
            for (var i = 0; i < res.data.data.pageSize; i++) {
                if (res.data.data.list[i]) { // 该条数据存在
                    var obj = {
                            // 该列头部的数据里面的type
                            userName: res.data.data.list[i].userName, // 用户名
                            turename: res.data.data.list[i].turename,
                            power: res.data.data.list[i].power,
                            powerCode: res.data.data.list[i].powerCode,
                            phone: res.data.data.list[i].phone,
                            updateAt: res.data.data.list[i].upDateAt,
                            tokenId: res.data.data.list[i].tokenId, //用户ID
                            // 控制按钮的属性
                            edit: true, // 编辑按钮控制的属性
                            delete: true // 删除按钮 控制的属性 
                        }
                        // 把设置好的数据 添加到  表格内容的数据里面
                    state.tableList.list.push(obj)

                } else { // 该条数据不存在
                    state.tableList.list.push({})
                }
            }
        }
    }).catch(function(err) {
        alert(err)
    })
}

var state = { // 数据
    // 弹窗里面的数据
    alertData: {
        userName: "", // 用户名
        tureName: "", // 姓名
        phone: "", // 手机号
        powerCode: "", // 权限编码
        tokenId: "" //  用户的id值
    },

    alertSwitch: false, // 控制管理员弹窗的属性


    // 与分页和查询有管的数据
    // 查询
    searchText: "", // 模糊姓名查询的条件
    pageStart: 1, // 页数查询的条件
    // 分页
    maxAdminCount: 0, // 最大的页数
    minAdminCount: 1, // 最小的页数
    pageSize: 3, // 每一页的条数

    tableList: { // 表格数据
        // 分页器上的页码
        pageStart: 1, // 默认为1
        // 什么 时候改变这个页面
        // 1. 请求 数据时  
        // 2. mutations中  页数 ++
        // 3. mutations中   页数 --

        //保存请求管理数据的方法 // 调用的时 ==》 admin.vue挂载之后去调取数据
        getAdminData: getAdminData, // 调取管理数据的方法
        th_list: [ // 表头
            //{value:"显示的名称",width:"宽度",type:"放置的数据"}
            { value: "用户名", width: "10%", type: "userName" },
            { value: "姓名", width: "10%", type: "turename" },
            { value: "后台权限", width: "20%", type: "power" },
            { value: "手机号", width: "20%", type: "phone" },
            { value: "编辑日期", width: "20%", type: "updateAt" },
            { value: "操作", width: "20%" }
        ],
        list: [], // 表格内容
        btn_list: { // 表格功能按钮
            // 编辑管理的方法
            update: function(data) { // 在调用时  传递该行管理员的信息
                // 弹窗出弹窗  ==》触发 changeAlertSwitch方法
                Vue.prototype.$adminStore.commit('changeAlertSwitch', true)

                // 给弹窗里面的信息赋值                data=》 管理员的数据
                Vue.prototype.$adminStore.commit('setAlertData', data)
            },
            // 删除管理员的方法
            delete: function(data) { // 在调用时  传递该行管理员的信息
                // 定义一个参数 data ==> 该行管理员信息
                // 发送 删除的请求==> 发送的 tokenId
                axios({
                    url: "/VueHandler/AdminHandler?action=delete",
                    method: "get",
                    params: {
                        tokenId: data.tokenId // 用户的id ==> tokenId	
                    }
                }).then(function(res) {
                    if (res.data.success) { // 删除成功
                        alert('删除成功');
                        getAdminData();
                    } else {
                        alert('删除失败');
                        alert(res.data.err)
                    }
                }).catch(function(err) {
                    alert(err)
                })
            },
            // 分页的方法
            firstClick: function() { // 第一页
                //				getAdminData() // 调取数据的方法   参数  : 调取的页面
                //				getAdminData(1);
                getAdminData(Vue.prototype.$adminStore.state.minAdminCount)
            },
            lastClick: function() { // 最后一页
                //getAdminData() // 调取数据的方法   参数  : 调取的页面
                //				state.maxAdminCount
                //Vue.prototype.$axios ==> ajax插件
                //Vue.prototype.$adminStore ==> 数据

                // 1. 把adminStore 赋值到 vue的原型上
                // 2. Vue.prototype.$adminStore.state.maxAdminCount 
                getAdminData(Vue.prototype.$adminStore.state.maxAdminCount);
            },
            nextClick: function() { // 下一页  当前页数 ++
                // 1 .触发 mutations中 addPageStart 方法
                // 2. 调取数据
                Vue.prototype.$adminStore.commit('addPageStart')
                    // commit() 中参数   第一个参数：改变数据方法的名称
                    //                 第二个参数：要传递的数据名称
                getAdminData();
            },
            prevClick: function() { // 上一页  当前页数 --				
                // 1. 触发 mutations中 subPageStart方法
                // 2. 调取数据
                Vue.prototype.$adminStore.commit('subPageStart');
                getAdminData();
            }


        }
    }
};
var mutations = { // 改变数据 的方法
    setAlertData: function(state, data) {
        // 编辑时  data ==》 管理员的信息
        // 添加时  data ==》 为空
        if (data) {
            //存在 ==》 编辑 ==》 赋值具体的内容
            state.alertData.userName = data.userName;
            state.alertData.turename = data.turename;
            state.alertData.phone = data.phone;
            state.alertData.powerCode = data.powerCode;
            state.alertData.tokenId = data.tokenId;
        } else {
            // 不存在 ==》为空 ==》 添加 ==》 赋值为 空  ""
            state.alertData.userName = "";
            state.alertData.turename = "";
            state.alertData.phone = "";
            state.alertData.powerCode = "";
            state.alertData.tokenId = "";
        }


    },
    changeAlertSwitch: function(state, data) { // 改变 控制控制弹窗属性的方法
        // data 触发该方法是 传递的数据  ==》 布尔值  ==》 控制弹窗的显示
        //  true ==》 显示弹窗     编程和添加
        //  false ==》 关闭弹窗    弹窗中的关闭
        state.alertSwitch = data;
    },
    addPageStart: function(state) { // 页数++
        // state ==> vuex中 state   store中的state
        // data ==》数据 接受到的数据    // 最大的页数									
        if (state.pageStart < state.maxAdminCount) {
            state.pageStart++;
            // 分页器上的页数                        // 请求的页码
            state.tableList.pageStart = state.pageStart;
        } else {
            alert('已是最大页数')
        }
    },
    subPageStart: function(state) { // 页数--
        // 最小的页数 
        if (state.pageStart > state.minAdminCount) {
            state.pageStart--;
            state.tableList.pageStart = state.pageStart;
        } else {
            alert('已是最小页数')
        }
    }
};
export default new Vuex.Store({
    state,
    mutations
})