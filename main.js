import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import GoEasy from 'static/goeasy-1.2.1.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		role:{},
		orderList:[],
		waitingList:[],
		ongoingList:[],
		finishList:[]
	},
    mutations: {
		// 修改state值(同步)
		save(state,user) {
			state.role = user 
		},
		saveImg(state,img) {
			state.role.portrait_url = img;
		},
		clean(state){
			state.role = {}
		},
		seedOrderList(state,data){
			state.orderList = data
		},
		saveWaitingList(state,list){
			state.waitingList = list;
		},
		saveOngoingList(state,list){
			state.ongoingList = list;
		},
		saveFinishList(state,list){
			state.finishList = list;
		}
	},
    actions: {
		// 修改state值(异步)
	}
})


let goEasy = GoEasy.getInstance({
  host:'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey: "BC-ff421cb0cf3a457a89a008e595023261" ,//替换为您的应用appkey
  allowNotification:true
});

Vue.prototype.goEasy = goEasy

Vue.prototype.connect = function(){
	   goEasy.connect({
			onSuccess: function () {  //连接成功
				console.log("GoEasy connect successfully.") //连接成功
			},
			onFailed: function (error) { //连接失败
				console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
			},
			onProgress:function(attempts) { //连接或自动重连中
				console.log("GoEasy is connecting", attempts);
			}
		});
}

Vue.prototype.receive = function(channel){
	goEasy.subscribe({
		channel: channel,
		onMessage: (message)=> {
			console.log("接收内容：" + message.content);
			plus.nativeUI.alert(message.content, function(){
				console.log("User pressed!");
			}, "回收员 "+channel+" 的通知", "我知道了");
		},
		onSuccess: function () {
			console.log("Channel订阅成功。");
		},
		onFailed: function (error) {
			console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
		}
	});
} 

Vue.prototype.send = function(channel,message,body){
	goEasy.publish({
		channel: channel,
		message: message,
		notification: { 
			title: '您有一条新消息', //通知栏提醒标题，仅显示于通知栏
			body: body || '点击前往。', //通知栏提醒内容，仅显示于通知栏
		},
		onSuccess:function(){
		   console.log("消息发布成功。");
		},
		onFailed: function (error) {
		   console.log("错误信息："+error.content);
		}
	});
} 

Vue.prototype.base = 'http://172.20.10.3:3000';
Vue.prototype.socket = 'ws://172.20.10.3:3000';
Vue.prototype.uploadImg = "http://172.20.10.7:8002/aliyun-service/upload-image";

String.prototype.time = function() {
	let time = this.split(' ')[1].split(':');
	return time[0] + ':' + time[1];
}
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}

Vue.prototype.GetDistance = function (lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
};

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import line from './components/line/line.vue'
Vue.component('line',line)

import waitingList from './pages/collector/waitingList.vue'
Vue.component('waitingList',waitingList);

import ongoing from './pages/collector/ongoing.vue'
Vue.component('ongoing',ongoing);

import finish from './pages/collector/finish.vue'
Vue.component('finish',finish);

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.$store = store;  
const app = new Vue({
    ...App,
	store
})
app.$mount()