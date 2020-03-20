// src/utils/index.js  工具函数 
export default {
	storage:{
		// 保存  用户信息
		setUserInfo:function(userInfo){ // userInfo 用户信息 {}
			window.sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
		},
		// 获取用户信息
		getUserInfo:function(){
			return JSON.parse(window.sessionStorage.getItem("userInfo"));
		},
		// 清除用户信息
		clearUserInfo:function(){ 
			window.sessionStorage.clear()
		}
	}
}




