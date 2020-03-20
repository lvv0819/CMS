<template>
  <div class="alert-shade">
    <!--遮罩-->
    <div class="alert-box">
      <!-- 具体的容器-->
      <div class="alert-head">
        <span class="head-title">添加目录</span>
        <img @click="close()" src="../assets/images/x.png">
      </div>
      <ul class="alert-body">
        <li>
          	<span>目录名称：</span>
					  <input type="text" v-model="dirAlertData.CDName" />
        </li>
      </ul>
      <div style="padding-top:15px;">
        <button class="btn btn-success" @click="enter()">确定</button>
        <button class="btn btn-info" @click="close()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import courseEditStore from "../vuex/courseEditStore.js";
export default {
  data() {
    // 数据
    return {
      CDName: "", // 目录名称
    };
  },
  computed: {
    dirAlertData: function() {
      return courseEditStore.state.dirAlertData;
    }
  },
  methods: {
    close: function() {
      courseEditStore.commit("changeAlertSwitch", {
        type: "addDir",
        switch: false
      });
    },
    enter: function() {
      var url = "";
      var data = {
        CDName: this.dirAlertData.CDName,
        Cid: this.dirAlertData.Cid
      };
      console.log(data);
      if (this.dirAlertData.ID) {
        url = "/VueHandler/CourseHandler?action=updateDirectory";
        data.ID = this.dirAlertData.ID;
      } else {
        url = "/VueHandler/CourseHandler?action=AddDirectory";
      }

      this.$axios({
        method: "post",
        url: url,
        data: data
      })
        .then(res => {
          if (res.data.success) {
            alert("操作成功");
            courseEditStore.state.courseContent.setListData(
              "dirTableList",
              res.data.data
            ); // 设置目录中内容
            courseEditStore.commit("changeAlertSwitch", {
              type: "addDir",
              switch: false
            });
          } else {
            alert(res.data.err);
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style scoped="">
  .alert-shade {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10002;
    /* background: black; */
    /* opacity: 0.8; */
    background: rgba(000, 000, 000, 0.5);
    margin: auto;
  }
.alert-box {
   opacity: 1;
  width: 430px;
  height: 156px;
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

.btn-upload {
  background: rgb(79, 102, 179);
  height: 24px;
}
</style>
