<template>
	<view>
		<view class="flex justify-between top-bar">
			<view><text class="my-icon" style="font-size: 30px;" @tap="showModal" data-target="DrawerModalL">&#xe6ec;</text></view>
			<view style="text-align: center;font-size: 20px;font-weight: 700;">任务列表</view>
			<view>
				<text style="float:right;font-size: 30px;" class="my-icon">&#xe6e4;</text>
			</view>
		</view>
		<ul class="tab-title">
			<li v-for="(v,i) in tabTitle" :key="i" :data-current="i" @tap="tabChange" :class="currentTab == i ? 'current-tab' : ''">{{v.title}}</li>
		</ul>
		<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 interval="5000" duration="500"  indicator-active-color="orange" :current="currentTab" @change="changeSwiper($event)">
			<swiper-item v-for="(item,index) in tabTitle" :key="index">
				<div class="tab-item-box">
					<waitingList v-if="index==0" :list="item.titleList" @waitingChange="waitingChange"></waitingList>
					<ongoing v-if="index==1" :list="item.titleList" @showOperate="showOperate"></ongoing>
					<finish v-if="index==2" :list="item.titleList" @checkEvaluate="checkEvaluate"></finish>
					<div style="height: 140px;text-align: center;">没有更多了~</div>
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
							<view v-if="operate.evaluate_content != ''" class="title"><text @click="feedback(operate.belong_phone,operate._id)" class="text-green">回复</text></view>
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
		
		<view @touchstart="snapStart($event)" @touchend="snapEnd($event)" class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''">
			<view @tap.stop="" class="cu-dialog basis-lg" style="height:100vh;min-width: 100vw;">
				<view class="cu-list menu text-left">
					<view class="bg">
						<p style="height: 60px;line-height: 60px;font-size: 20px;padding-left: 20px;font-weight: 700;padding-top: 60px;">
							<text @tap.stop="hideModal" class="cuIcon-back">收起</text>
						</p>
						<view class="header">
							 <view class="head">
								<image @click="bigHead" :src="collector.portrait_url" mode=""></image>
							 </view>
							 <view class="text">
								<p style="font-size: 20px;font-weight: 700;margin: 10px 20px;">{{collector.name}}</p>
								<p style="font-size: 17px;font-weight: 400;margin: 10px 20px;">{{collector.phone}}
									<button class="cu-btn lines-orange round" style="padding: 0 20rpx;margin-left: 20px;height: 20px;">修改</button>
								</p>
							 </view>
						</view>
						<p style="text-align: center;margin: 10px;padding-bottom: 50rpx;">{{collector.sign || "保护环境，从废品回收做起！"}}</p>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action">我的收款码</view>
						<view class="action"><text class="cuIcon-qr_code"></text></view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action">工作城市/地区</view>
						<view class="action">广州/白云<text class="cuIcon-location"></text></view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action">账户余额</view>
						<view class="action">{{collector.sign|| 0}}元</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">积分</view>
						<view class="action">{{collector.credits || 0}}</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">详细资料</view>
						<view class="action"><text class="cuIcon-right"></text></view>
					</view>
					<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view class="cu-bar bg-white">
						<view class="action">关于易回收</view>
						<view class="action"><text class="cuIcon-right"></text></view>
					</view>
					<button @click="quit()" class="cu-btn bg-gradual-red round" 
					style="position: absolute;bottom: 40px;left: 15vw;line-height: 40px;width: 70vw;height: 40px;">
					退出</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone:0,
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
				index:null
			}
		},
		onShow() {
		},
		created(){
			this.phone = uni.getStorageSync('phone');
			uni.request({
				url:this.base+"/account/getAllInfomation/"+this.phone,
				method:"GET",
				success: (res) => {
					this.$store.commit('save',res.data)
				}
			})
			this.collector = this.$store.state.role;
			uni.request({
				url:this.base+"/order/user/getAllOrder",
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
			uni.getSystemInfo({
				    success: (res)=> {
						this.tabStyle.minHeight = res.screenHeight - res.statusBarHeight - 60 + 'px';
				    }
				});
		},
		methods:{
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
				uni.showToast({
					title:"签单成功！请尽快处理。"
				})
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
				this.modalName = 'bottomModal1';
				this.index = e;
				this.operate = this.tabTitle[2].titleList[e];
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
				this.notifyClient(phone);
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
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
			}
		}
	}
</script>

<style>
.top-bar{
	width: 100%;
	padding: 0 10px;
	padding-top:60px;
	padding-bottom:20px;
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
</style>
