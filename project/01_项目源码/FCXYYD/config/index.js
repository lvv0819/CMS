'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { // 代理表  配置代理的规则 ==》自动生成代理服务器
    	// key : value
			// 代理的地址    : 代理的规则 
    	 "/Handler":{
    	 	changeOrigin:true,// 改变目标
    	 	target:"http://127.0.0.1:3000",// node后台服务器
    	 	pathRewrite:{ // 路径重写
    	 		// 重写前的     重写后的
    	 		"/Handler":"/Handler"
    	 		// /Handler/a  ==> /Handler/a 
    	 		// /a   /b   /c   /d   ==> 跨域访问 统一个服务器
    	 		
    	 		// /api/a   /api/b  /api/c  /api/d  ==》
    	 		// 路径重写  {"/api" : "" }
					// /a    /b   /c  /d     	 		
    	 	}
    	 },
    	 // 请求图片的代理
    	 "/DownLoadPicHandler":{
    	 		changeOrigin:true,// 改变目标
    	 		target:"http://127.0.0.1:3000",// node后台服务器
    	 		pathRewrite:{ "/DownLoadPicHandler": "/DownLoadPicHandler"}
    	 }
    	
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
