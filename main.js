import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

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
Vue.prototype.base = 'http://192.168.0.105:3000';
Vue.prototype.socket = 'ws://192.168.0.105:3000';

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