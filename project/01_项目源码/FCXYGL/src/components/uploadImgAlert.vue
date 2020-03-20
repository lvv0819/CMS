<template>
  <div class="alert-shade">
    <!--遮罩-->
    <div class="alert-box">
      <!-- 具体的容器-->
      <div class="alert-head">
        <span class="head-title">上传图片</span>
        <img @click="close()" src="../assets/images/x.png">
      </div>
      <div style="overflow: hidden;">
        <div class="img-box">
          <span v-html="text"></span>
          <img :src="imgUrl" @click="selectImg">
        </div>
        <div class="btn-box">
          <button class="btn  btn-success" @click="selectImg">选择封面</button>
          <button class="btn btn-info" style="float:none" @click="clearImg">清除</button>
          <input type="file" style="display: none;" ref="fileInput" @change='loadImg'>

        </div>

      </div>

      <div style="padding-top:15px;">
        <button class="btn btn-success" @click="enter()">上传</button>
        <button class="btn btn-info" @click="close()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import courseEditStore from "../vuex/courseEditStore.js";
  export default {
  // computed: {
  //   videoInfor: function() {
  //     return videoStore.state.videoInfor;
  //   }
  // },
  data() {
    // 数据
    return {
      imgUrl: "",
      text: "封面",
      isSelect: true
    };
  },
  methods: {
    loadImg: function() {
      if (this.isSelect) {
        this.isSelect = false;
        if (URL.createObjectURL) {
          this.imgUrl = URL.createObjectURL(this.$refs.fileInput.files[0]);
        } else {
          this.text = "浏览器不支持预览";
          alert("浏览器暂不支持预览，请升级浏览器！！");
        }
      }
    },
    clearImg: function() {
      this.$axios({
        url:"/VueHandler/UpLoadPicHandler?action=delete",
        method:"get",
        params:{
          pathName:this.imgUrl.split("=")[1]
        }
      }).then((res)=>{
        if(res.data.err){
          alert('清楚图片失败')
        }else{

          URL.revokeObjectURL(this.imgUrl);
          this.imgUrl = "";
          this.isSelect = true;
        }
      })


    },

    selectImg() {
      if (this.isSelect) {
        this.$refs.fileInput.click();
      } else {
        alert("清除后再选择图片");
      }
    },
    close: function() {
     this.$emit('setImgUrl', this.imgUrl)
      // 关闭函数
      courseEditStore.commit("changeAlertSwitch", {
        type: "uploadImg",
        switch: false
      });
    },
    enter: function() {
      if (this.$refs.fileInput.files[0]) {

        if(this.imgUrl){
          let formdata = new FormData();
          formdata.append("data", this.$refs.fileInput.files[0]);
          this.$axios({
            url: "/VueHandler/UpLoadPicHandler",
            method: "post",
            data: formdata
          }).then(res => {
            if (res.data.success) {
              this.imgUrl = res.data.cacheName;
              console.log( res.data.cacheName)
              this.$emit('setImgUrl',  this.imgUrl)
              courseEditStore.commit("changeAlertSwitch", {
                type: "uploadImg",
                switch: false
              });
            } else {
              alert(res.data.err);
            }
          });
        }else{
          alert('请选择图片')
        }



      } else {
        alert("请选择图片");
      }
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
    height: 230px;
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

  .img-box {
    width: 190px;
    height: 110px;
    margin: 10px 49px;
    float: left;
    cursor: pointer;
    border: 1px solid #c0c0c0;
    text-align: center;
    line-height: 100px;
    font-size: 24px;
    position: relative;
  }
  .img-box img {
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
  }
  .btn-box {
    width: 100px;
    float: left;
    padding-top: 12px;
  }
  .btn-box button {
    margin: 10px 0;
  }
</style>
