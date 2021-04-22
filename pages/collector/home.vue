<template>
	<view>
		<view class="flex justify-between top-bar">
			<view><text class="my-icon" style="font-size: 30px;color: #faa125;" @tap="showModal" data-target="DrawerModalL">&#xe65a;</text></view>
			<view style="text-align: center;font-size: 20px;font-weight: 700;">任务列表</view>
			<view>
				<text @click="orderList" style="float:right;font-size: 30px;font-weight: 400;color: #faa125;display: block;" class="cuIcon-message"></text>
				<text class='bag' v-if="messageValue.length != 0">{{messageValue.length}}</text>
			</view>
		</view>
		<ul class="tab-title">
			<li v-for="(v,i) in tabTitle" :key="i" :data-current="i" @tap="tabChange" :class="currentTab == i ? 'current-tab' : ''">{{v.title}}</li>
		</ul>
		<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 interval="5000" duration="500"  indicator-active-color="orange" :current="currentTab" @change="changeSwiper($event)">
			<swiper-item v-for="(item,index) in tabTitle" :key="index">
				<div class="tab-item-box">
					<waitingList v-if="index==0" :crood='crood' :list="item.titleList" @waitingChange="waitingChange"></waitingList>
					<ongoing v-if="index==1" :crood="crood" :list="item.titleList" @showOperate="showOperate"></ongoing>
					<finish v-if="index==2" :list="item.titleList" @checkEvaluate="checkEvaluate"></finish>
					<div style="height: 140px;text-align: center;">
						没有更多了~ <text @click="reloading" style="color: #0081FF;" v-if="index==0">点击加载 <text class="cuIcon-loading2"></text> </text> 
					</div>
				</div>
			</swiper-item>
		</swiper>
		
		<view @click="hideModal()" class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view @click.stop="" class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">
						<text>操作</text>
					</view>
					<view class="action text-blue">
						<text @click="hideModal()" class="cuIcon-close text-red text-bold"></text>
					</view>
				</view>
				<view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action"></view>
						<view @click="phoneCall(operate.belong_phone)" class="action text-bold text-blue">电话通知</view>
						<view class="action"></view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action"></view>
						<view @click="seedMessage(operate.belong_phone)" class="action text-bold text-blue">短信通知</view>
						<view class="action">
							<text class="text-blue text-bold"></text>
						</view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action"></view>
						<view @click="appNotice(operate.belong_phone)" class="action text-bold text-blue">app通知</view>
						<view class="action">
							<text class="text-blue text-bold"></text>
						</view>
					</view>
					<p style="height: 30px;"></p>
				</view>
			</view>
		</view>
		
		<view @click="hideModal()" class="cu-modal bottom-modal" :class="modalName=='bottomModal1'?'show':''">
			<view @click.stop="" class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">
						<text>操作</text>
					</view>
					<view class="action text-blue">
						<text @click="hideModal()" class="cuIcon-close text-red text-bold"></text>
					</view>
				</view>
				<view>
					<form class="form">
						<view class="cu-form-group">
							 <view class="title">服务态度</view>
							 <view class="title" style="width: 250px;">
								 <slider disabled style="margin: 0;" :value="operate.evaluate_attitude" block-size="16" block-color="#007aff" show-value/>
							 </view>
						 </view>
						 <view class="cu-form-group">
							 <view class="title">上门速度</view>
							 <view class="title" style="width: 250px;">
								 <slider disabled style="margin: 0;" :value="operate.evaluate_speed" block-size="16" block-color="#007aff" show-value/>
							 </view>
						 </view>
						<view class="cu-form-group">
							<view class="title">评价内容</view>
							<textarea disabled style="text-align: left;height: 50px;" v-model="operate.evaluate_content" />
							<view v-if="operate.evaluate_content != '' && operate.feedback == ''" class="title"><text @click="feedback(operate.belong_phone,operate._id)" class="text-green">回复</text></view>
						</view>
						<view v-if="operate.feedback != ''" class="cu-form-group">
							<view class="title">回复内容</view>
							<input disabled style="color: #39B54A;" name="name" v-model="operate.feedback"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">评价时间</view>
							<input disabled style="color: #39B54A;" name="name" v-model="operate.evaluate_time"></input>
						</view>
					</form>
					<p style="height: 30px;"></p>
				</view>
			</view>
		</view>
		
		<view @touchstart="snapStart($event)" @touchend="snapEnd($event)" class="cu-modal drawer-modal justify-start left-drawer" :class="modalName=='DrawerModalL'?'show':''">
			<view @tap.stop="" class="cu-dialog basis-lg" style="height:100vh;min-width: 100vw;">
				<view class="cu-list menu text-left">
					<view class="bg">
						<!-- iphone 6s -->
						<p style="height: 60px;line-height: 60px;font-size: 20px;padding-left: 20px;font-weight: 700;padding-top: 60px;">
						<!-- <p style="height: 60px;line-height: 60px;font-size: 20px;padding-left: 20px;font-weight: 700;padding-top: 10px;"> -->
							<text @tap.stop="hideModal" class="cuIcon-back">收起</text>
						</p>
						<view class="header">
							 <view class="head">
								<image @click="bigHead" :src="collector.portrait_url" mode=""></image>
							 </view>
							 <view class="text">
								<p style="font-size: 20px;font-weight: 700;margin: 10px 20px;">{{collector.name}}</p>
								<p style="font-size: 17px;font-weight: 400;margin: 10px 20px;">{{collector.phone}}
									<button @click="modifyPhone" class="cu-btn lines-orange round" style="padding: 0 20rpx;margin-left: 20px;height: 20px;">修改</button>
								</p>
							 </view>
						</view>
						<p style="text-align: center;margin: 10px;padding-bottom: 50rpx;">{{collector.sign || "保护环境，从废品回收做起！"}}</p>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view @click="scan" class="cu-bar bg-white">
						<view class="action">扫码</view>
						<view class="action"><text style="font-size: 20px;color: #faa12e;" class="my-icon">&#xe6e4;</text></view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action">工作城市/地区</view>
						<view class="action">		
							<region-picker style="z-index: 9999;" @change="region_change" value="">
								<text>{{picker.city}}/{{picker.area}}<text style="font-size: 16px;font-weight: 700;color: #faa12e;" class="cuIcon-location"></text></text>
							</region-picker>
						</view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action">账户余额</view>
						<view class="action">{{getToFixed(collector.money) || 0}}元</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">积分</view>
						<view class="action">{{getToFixed(collector.credits) || 0}}</view>
					</view>
					<view @click="modifyPassword(collector.phone,collector.password)" class="cu-bar bg-white">
						<view class="action">修改密码</view>
						<view class="action"><text class="cuIcon-right"></text></view>
					</view>
					<view @click="orderList" class="cu-bar bg-white">
						<view class="action">已完成订单</view>
						<view class="action"><text class="cuIcon-right"></text></view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view @click="toAbout" class="cu-bar bg-white">
						<view class="action">关于易回收</view>
						<view class="action"><text class="cuIcon-right"></text></view>
					</view>
					<!-- iphone 6s -->
					<button @click="quit()" class="cu-btn bg-gradual-red round"
					style="position: absolute;bottom: 30px;left: 15vw;line-height: 40px;width: 70vw;height: 40px;">
					<!-- <button @click="quit()" class="cu-btn bg-gradual-red round" 
					style="position: absolute;bottom: 30px;left: 15vw;line-height: 40px;width: 70vw;height: 40px;"> -->
					退出</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import regionPicker from "@/components/region-picker/region-picker.vue"
	export default{
		components: {
		    regionPicker
		},
		data(){
			return{
				phone:null,
				modalName:null,
				tabTitle:[
					{
					title:'待接单',
					titleList:[],
					},{
					title:'进行中',
					titleList:[],
					},{
					title:'已完成',
					titleList:[],
					}],
				currentTab:0,
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				},
				start:null,
				collector:{},
				operate:{},
				index:null,
				crood:[],
				picker:{
					city:'',
					area:''
				},
				messageLabel:0,
				messageValue:[]
				
			}
		},
		onShow() {
			this.collector = this.$store.state.role;
			this.getloca();
			setInterval(()=>{
				this.getloca();
			},7000);
		},
		async created(){
			this.loadingData();
			uni.getSystemInfo({
				success: (res)=> {
					this.tabStyle.minHeight = res.screenHeight - res.statusBarHeight - 60 + 'px';
				}
			});
			this.goEasy.subscribe({
				channel: this.phone,
				onMessage: (message)=> {
					let content = JSON.parse(message.content);
					if(content.key == "complete_order"){
						let res = null;
						console.log("接收内容：" + content.data);
						this.tabTitle[1].titleList.forEach((v,i)=>{
							if(v._id == content.data){
								res = this.tabTitle[1].titleList.splice(i,1);
							}
						})
						this.tabTitle[2].titleList.unshift(res[0]);
					} else if (content.key == "evaluate_order"){
						console.log("订单评价");
						this.messageLabel++;
						this.messageValue.push(content.data);
					}
				},
				onSuccess: function () {
					console.log("Channel订阅成功。");
				},
				onFailed: function (error) {
					console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
				}
			});
			// this.openSocket()
		},
		methods:{
			getToFixed(val){
				if(isNaN(val)){
					return null
				}else{
					return val.toFixed(2);
				}
			},
			orderList(){
				uni.navigateTo({
					url:"/pages/collector/orderList?list="+this.messageValue,
					success: () => {
						this.messageValue = [];
						this.messageLabel = 0;
					}
				})
			},
			reloading(){
				this.loadingData();
			},
			loadingData(){
				this.phone = uni.getStorageSync('phone');
				if(JSON.stringify(this.collector)=="{}"){
					if(uni.getStorageSync('phone') != null) {
						uni.request({
							url:this.base+"/account/getAllInfomation/"+uni.getStorageSync('phone'),
							method:"GET",
							success: (res) => {
								this.$store.commit('save',res.data)
								this.collector = this.$store.state.role;
								this.picker.city = this.collector.collector.work_city;
								this.picker.area = this.collector.collector.work_area;
								
							}
						})
					}
				}	
				uni.request({
					url:this.base+"/order/user/getAllOrder/"+uni.getStorageSync("phone"),
					method:"GET",
					success: (res) => {
						this.tabTitle[0].titleList = res.data[0];	
						this.tabTitle[1].titleList = res.data[1];
						this.tabTitle[2].titleList = res.data[2];
						this.$store.commit('saveWaitingList',res.data[0]);
						this.$store.commit('saveOngoingList',res.data[1]);
						this.$store.commit('saveFinishList',res.data[2]);
						// this.$store.commit('save',res.data)
					}
				})
			},
			openSocket(){
				uni.connectSocket({
				  url: 'ws://192.168.0.105:3000/socket/notify'
				});
				uni.onSocketOpen((res)=> {
						uni.sendSocketMessage({
						  data: "stupid"
						});
					})
				uni.onSocketMessage((res)=> {
				  console.log(res);
				});
			},
			
			getloca(){
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success: (res)=> {
						this.crood = [res.longitude,res.latitude];
					},
					fail: (err) => {
						console.log("定位发生错误。");
						// plus.nativeUI.toast("定位发生错误。");
					}
				});
			},
			bigHead(){
				uni.navigateTo({
					url: "/pages/plugin/setup/bigHead",
					fail(err) {
						console.log(err)
					}
				})
			},
			waitingChange(e){
				let res = this.tabTitle[0].titleList.splice(e,1);
				this.tabTitle[1].titleList.push(res[0]);
				plus.nativeUI.toast("签单成功！请尽快处理。");
			},
			quit(){
				uni.reLaunch({
					url:'../index/login',
					success() {
						uni.setStorageSync('phone',null);
						uni.setStorageSync('role',null);
						this.$store.commit('clean');
					}
				})
			},
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.currentTab=index;	
			},
			changeSwiper(e){
				this.currentTab = e.detail.current;
				e.detail.current = 2;
				console.log(e);
			},
			showOperate(e){	
				console.log(e);
				this.operate = this.tabTitle[1].titleList[e];
				this.modalName = 'bottomModal';
			},
			checkEvaluate(e){
				this.operate = this.tabTitle[2].titleList[e];
				if(!!this.operate.evaluate_time == false){
					plus.nativeUI.toast("暂时还没有评价哦。")
					return;
				}
				this.modalName = 'bottomModal1';
				this.index = e;
			},
			phoneCall(number){
				uni.makePhoneCall({
				    phoneNumber: number 
				});
			},
			feedback(phone,id){
				plus.nativeUI.prompt("输入您的回复内容：", (e)=>{
						if(e.index == 0){
							uni.request({
								url:this.base+'/order/user/update',
								method:"POST",
								data:{
									belong_phone:phone,
									order_id:id,
									feedback:e.value
								},
								success: () => {
									console.log(this.tabTitle);
									this.tabTitle[2].titleList[this.index].feedback = e.value;
								}
							})
						}else{
							console.log("cancel");
						}
					}, "评论回复", "请输入内容...", ["确定","取消"]);
				
			},
			seedMessage(number){
				let msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				msg.to = [number];
				msg.body = '你好，我已到达';
				plus.messaging.sendMessage(msg);
			},
			appNotice(phone){
					// plus.nativeUI.prompt("输入要发送的内容", (e)=>{
					// 	if(e.index == 0){
							this.goEasy.publish({
								channel: phone,
								message: JSON.stringify({
									key:"app_notice",
									data:{
										msg:"你好，我已到达，请尽快处理。",
										phone:uni.getStorageSync("phone")
									}
								}),
								notification: { 
									title: '您有一条新消息', //通知栏提醒标题，仅显示于通知栏
									body: "你好，我已到达，请尽快处理。", //通知栏提醒内容，仅显示于通知栏
								},
								onSuccess:function(){
								   console.log("消息发布成功。");
								},
								onFailed: function (error) {
								   console.log("错误信息："+error.content);
								}
							});
					// 	}
					// }, "App推送", "你好，我已到达，请尽快处理。", ["确定","取消"]);
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
				this.reloading();
			},
			hideModal(e) {
				this.modalName = null;
				this.reloading();
			},
			snapStart(e){
				this.start = e.changedTouches[0];
			},
			snapEnd(e){
				let end = e.changedTouches[0];
				let start = this.start;
				if(start.clientX - end.clientX > 100 && start.clientY - end.clientY < 100){
					this.hideModal();
				}
			},
			scan(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						plus.nativeUI.toast("该功能还在完善中，敬请期待...")
				    }
				});
			},
			modifyPhone(){
				plus.nativeUI.prompt("请输入名的新的手机号：", (e)=>{
					if(e.index == 0){
						if(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(e.value)==false){
							plus.nativeUI.alert('手机号码不正确！');
							return;
						}
						uni.request({
							url:this.base + '/account/modifyPhone',
							method:"POST",
							data:{
								phone:uni.getStorageSync("phone"),
								modify_phone:e.value
							},
							success:(res)=> {
								if(res.data != false){
									this.$store.commit("save",res.data);
									this.collector = this.$store.state.role;
									plus.nativeUI.alert('修改成功！');
								} else {
									plus.nativeUI.alert('该手机号已被注册！');
								}
							},
							fail: (err) => {
								console.log(err);
							}
						})
					}
				}, "修改手机号", "请输入...", ["确定","取消"]);
			},
			modifyPassword(phone,password){
				let newPassword = null;
				plus.nativeUI.prompt("请输入您的旧密码。", (e)=>{
						if(e.index == 0){
							if(e.value != password)  {
								plus.nativeUI.toast('密码错误。')
								return;
							}else{
								plus.nativeUI.prompt("请输入您的8位以上的新密码，由数字和至少一个字母组合。", (e)=>{
										if(e.index == 0){
											if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(e.value)==true){
												newPassword = e.value;
												plus.nativeUI.prompt("请在此确认您的密码。", (e)=>{
													if(e.index == 0){
														if(newPassword == e.value){
															uni.request({
																	url:this.base + '/account/postUserUpdateData',
																	method:"POST",
																	data:{
																		phone:phone,
																		password:newPassword
																	},
																	success: (res) => {
																		if(res.data != false){
																			console.log(res.data);
																			this.collector = res.data;
																			this.$store.commit("save",res.data);
																			plus.nativeUI.toast('修改密码成功。');
																		}
																	}
																})
														}else{
															plus.nativeUI.toast('两次密码不一致，修改密码失败。');
														}
													}
												}, "修改密码", "输入你的新密码...", ["确定","取消"]);
										}else{
											plus.nativeUI.toast('密码格式不正确，请重新操作。');
										}
									}
								}, "修改密码", "输入你的新密码...", ["确定","取消"]);
							}
						}
					}, "修改密码", "输入你的旧密码...", ["确定","取消"]);
			},
			toAbout(){
				uni.navigateTo({
					url: "/pages/plugin/about"
				})
			},
			region_change(e){
				this.picker.city = e.detail.value[1];
				this.picker.area = e.detail.value[2];
				uni.request({
					url:this.base + '/account/postWorkPlace',
					method:"POST",
					data:{
						work_city:this.picker.city,
						work_area:this.picker.area,
						phone:uni.getStorageSync("phone")
					},
					success: (res) => {
						console.log(res.data);
					}
				})
			}
		}
	}
</script>

<style>
.top-bar{
	width: 100%;
	padding: 0 10px;
	/* iPhone 6s */
	padding-top:60px;
	padding-bottom:20px;
	/* padding-top:30px; */
	/* padding-bottom:10px; */
	margin: 0;
	border: 0;
	color: #eee;
	background-color: #3c3c3c;
	border: 0;
}
.top-bar view{
	width: 33vw;
}
.top-bar text{
	font-size: 26px;
	/* font-weight: 700; */
}
.tab-title{
	height: 30px;		
	width: 100%;
	font-size: 18px;
	text-decoration: none;
	list-style: none;
	padding: 10px 0;
	background-color: #3c3c3c;
}
.tab-title > li{
	color: #eee;
	float: left;
	text-align: center;
	width: 30vw;
	height: 40px;
	line-height: 40px;
	padding: 0;
	margin-left:2.5vw;
}
.current-tab{
	color: #faa125 !important;  
	font-weight: 700;	
}
.tab-item-box{
	width: 96vw;
	margin: 2vw;
	height: 100vh;
	overflow: scroll;
}
.tab-item{
	overflow: scroll;
	width: 90vw;
	padding:1vw 5vw;
	margin: 12px 0;
	height: auto;
	border-radius: 10px;
	background-color: #fdfdfd;
	/* border-bottom: 12px #eee solid; */
}
.btn-group{
	width: 100%;
}
.btn-group>button{
	float: right;
	margin: 10px 0;
	margin-left: 10px;
}
.bg{
	color: #EEEEEE;
	background-image: url(../../static/123.png);
	background-size: cover;
	background-repeat: no-repeat;
}
.header{
	float: left;
	width: 100vw;
	height: 100px;
	text-shadow: black 0.1em 0.1em 0.2em
}
.header .head{
	float: left;
	width: 100px;
	height: 100px;
	padding: 10px;
}
.header .head > image{
	width: 100%;
	height: 100%;
	margin-left: 20px;
	border-radius: 50%;
	border:1px #CCCCCC solid
}
.header .text{
	float: left;
	height: 100px;
	padding: 10px;
}
.form>.cu-form-group{
	min-height: 42px;
}
.left-drawer{
	z-index: 888;
}
.bag{
	background-color: #f9484b;
	position: absolute;
	font-size: 12px !important;
	right: 6px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	text-align: center;
}
</style>
