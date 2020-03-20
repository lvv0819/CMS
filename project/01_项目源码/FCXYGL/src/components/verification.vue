<template>
  <canvas @click="changeVeri" class="verCanvas" width="100%" height="35px" ></canvas>
   <!-- 点击时 调用 changeVeri方法-->
</template>
<script>
	// 加载  axios
  export default {
    name: 'login',
    data () {
      return {
        canvas: "",
        width: "",
        height: "",
        ctx: ""
      }
    },
    mounted: function () { // 挂载之后
      this.canvas = document.getElementsByClassName('verCanvas')[0];
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.textBaseline = 'bottom';
      // 绘制验证码
//    this.drawPic('abcd');

      // 验证码 ==》 在node后台上 ==》请求过来  ==》字符串
      // 调用 请求验证码的方法
      this.getVeri(this.drawPic);
    },
    methods: {
    	// 点击  重新请求 验证并绘制的方法
    	changeVeri:function(){
    		//  调用 请求验证码 的方法
    		this.getVeri(this.drawPic);
    	},
    	getVeri:function(fn){ // 请求验证码
    		// fn ==》 绘制验证码  的方法
    		// 通过 咱们  axios 调取过来
    		this.$axios({
    			method:"get",
    			url:"/VueHandler/AdminLoginAndRegHandler?action=verification"
    		}).then(function(res){ // ajax 成功后的回调 200
    			console.log('返回的结果')
    			console.log(res)
    			// 判断 是否获取到 验证码
    			if(res.data.err){// 请求验证码失败
    				alert(res.data.err)
    			}else{ // 请求验证码 成功
    				console.log(res.data.data)

    				fn(res.data.data)  // 使用传进来的绘制验证码的方法绘制验证码
    			}
    		}).catch(function(err){ // ajax 失败后的回调 503 404
    			alert(err)
    		})
    	},
      randomNum: function (min, max) {//生成随机数
        return Math.floor(Math.random() * (max - min) + min);
      },
      randomColor: function (min, max) {//生成随机色 rgb
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
      },
      drawPic: function (returnTxt) { // 绘制验证码
      	// returnTxt ==>验证码


        /**绘制验证码图片**/
        /**绘制背景色**/
        this.ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
        this.ctx.fillRect(0, 0, this.width, this.height);
        /**绘制文字**/
        for (var i = 0; i < 4; i++) {
          var txt = returnTxt[i];
          this.ctx.fillStyle = this.randomColor(50, 160);  //随机生成字体颜色
          this.ctx.font = this.randomNum(25, 30) + 'px SimHei'; //随机生成字体大小
          var x = 10 + i * 20;
          var y = this.randomNum(25, 45);
          var deg = this.randomNum(-15, 15);
          //修改坐标原点和旋转角度
          this.ctx.translate(x, y);
          this.ctx.rotate(deg * Math.PI / 180);
          // 写入文字
          this.ctx.fillText(txt, 10, 0);
          //恢复坐标原点和旋转角度
          this.ctx.rotate(-deg * Math.PI / 180);
          this.ctx.translate(-x, -y);
        }
        /**绘制干扰线**/
        for (var i = 0; i < 8; i++) {
          this.ctx.strokeStyle = this.randomColor(40, 180);
          this.ctx.beginPath();
          this.ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
          this.ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
          this.ctx.stroke();
        }
        /**绘制干扰点**/
        for (var i = 0; i < 100; i++) {
          this.ctx.fillStyle = this.randomColor(0, 255);
          this.ctx.beginPath();
          this.ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI);
          this.ctx.fill();
        }
        return;
      }
    },
  };


</script>

<style scoped="">
  .verCanvas {
    margin-left: 5px;
    position: relative !important;

  }

  .verCanvas:hover {
    cursor: pointer;
  }

</style>
