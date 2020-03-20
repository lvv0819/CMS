<template>
  <div class="alert-shade">
    <!--遮罩-->
    <div class="alert-box">
      <!-- 具体的容器-->
      <div class="alert-head">
        <span class='head-title'>{{isDisabled()?"编辑":"添加"}}管理员</span>
        <img @click="close" src="../assets/images/x.png" />
      </div>
      <ul class="alert-body">
        <li>
         <span>用户名：</span>
         <input type="text" v-bind:disabled="isDisabled()" v-model="alertData.userName" />
       </li>
       <li>
         <span>姓名：</span>
         <input type="text" v-model="alertData.turename" />
       </li>
       <li>
         <span>手机号：</span>
         <input type="text" v-model="alertData.phone" />
       </li>
       <li>
         <span>权限选择：</span>
         <select v-model="alertData.powerCode">
          <!-- 通过 v-for 循环   v-bind绑定-->
          <!--  { power:"权限名称",powerCode:"权限编码"}-->
          <option v-for='power in powerData' v-bind:value="power.powerCode">
           {{power.power}}
         </option>

						<!--<option value="1">系统管理员</option>
						<option value="2">课程管理员</option>-->
					</select>
				</li>
			</ul>
			<div>
				<button class="btn btn-success" @click="enter">确定</button>
				<button class="btn btn-info" @click="close"> 取消</button>
			</div>
		</div>
	</div>
</template>
<script>
// 加载 adminStore  在关闭的方法里面  触发 改变 控制弹窗的方法
import adminStore from "../vuex/adminStore";
export default {
  computed: {
    // 计算属性
    alertData: function() {
      return adminStore.state.alertData;
    }
  },
  methods: {
    // 方法
    isDisabled: function() {
      // 获取是是否使用disabled的属性的数据
      return this.alertData.tokenId ? true : false;
    },
    close: function() {
      // 触发 changeAlertSwitch
      adminStore.commit("changeAlertSwitch", false);
    },
    enter: function() {
      // 确定触发的方法
      // 提交数据
      var url = ""; // 提交的地址
      var data = {
        // 编辑和添加共同的数据
        turename: this.alertData.turename,
        phone: this.alertData.phone,
        powerCode: this.alertData.powerCode
      };
      // 通过 编辑和添加区别去  分设置数据
      if (this.alertData.tokenId) {
        // 存在 ==》 编辑
        url = "/VueHandler/AdminHandler?action=update"; // 编辑的提交地址
        data.tokenId = this.alertData.tokenId;
      } else {
        // 不存在 ==> 添加
        url = "/VueHandler/AdminLoginAndRegHandler?action=add"; // 添加提交的地址
        data.userName = this.alertData.userName; // 用户名
        data.password = "123456"; // 默认密码 123456
      }
      // 发送 数据
      this.$axios({
        url: url,
        data: data,
        method: "post"
      })
      .then(res => {
        if (res.data.success) {
            // 操作成功
            alert("操作成功");
            // 关闭弹窗
            this.close();
            // 重新调取数据
            adminStore.state.tableList.getAdminData();
          } else {
            alert(res.data.err);
          }
        })
      .catch(err => {
        alert(err);
      });
    }
  },
  data() {
    // 数据
    return {
      powerData: [], // 保存调取到的权限数据
    };
  },
  mounted: function() {
    // 挂载之后 调取权限数据
    // this.powerData ==》 保存权限数据的 属性
    this.$axios({
      url: "/VueHandler/CourseHandler?action=getpower",
      method: "get"
    })
    .then(res => {
        // ajax 成功 使用的箭头函数
        if (res.data.success) {
          for (var i = 0; i < res.data.data.length; i++) {
            this.powerData.push({
              power: res.data.data[i].power, // 权限名称
              powerCode: res.data.data[i].powerCode // 权限编码
            });
          }
        } else {
          alert(res.data.err);
        }
      })
    .catch(function(err) {
      alert(err);
    });
  }
};
</script>
<style scoped>
  .alert-shade {
    position: fixed;
    top: 20px;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 10002;
    /* background: black; */
    /* opacity: 0.8; */
    background: rgba(000, 000, 000, 0.5);

  }
  .alert-box {
    opacity: 1;
    width: 410px;
    height: 250px;
    background: #fff;
    border: 5px solid #4f66bb;


    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10003;
    margin: auto;
  }
  .alert-head {
    height: 30px;
    background: #4f66b3;
    margin-bottom: 10px;
  }

  .head-title {
    color: white;
    line-height: 30px;
    font-size: 14px;
    display: inline-block;
    float: left;
  }

  .alert-head img {
    display: inline-block;
    float: right;
    margin-top: 5px;
    margin-right: 5px;
    cursor: pointer;
  }

  ul.alert-body li {
    display: block;
    margin-bottom: 10px;
  }

  ul.alert-body li span {
    display: inline-block;
    width: 80px;
    text-align: right;
  }

  ul.alert-body li input {
    height: 18px;
    width: 200px;
  }

  ul.alert-body li select {
    width: 204px;
    height: 24px;
  }

  .btn {
    width: 80px;
    height: 30px;
    line-height: 20px;
    border: none;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }

  .btn-info {
    background: #4f66bd;
    float: right;
    margin-right: 60px;
  }

  .btn-info:hover {
    background: #4f66a4;
  }

  .btn-success {
    background: #5cb85c;
    float: left;
    margin-left: 60px;
  }

  .btn-success:hover {
    background: #449d44;
  }
</style>