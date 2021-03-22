<template>
	<view>
		<view class="flex justify-between top-bar">
			<view><text class="my-icon" @tap="showModal" data-target="DrawerModalL">&#xe60d;</text></view>
			<view style="text-align: center;font-size: 20px;font-weight: 700;">任务列表</view>
			<view>
				<text style="float:right" class="my-icon">&#xe626;</text>
			</view>
		</view>
		<ul class="tab-title">
			<li v-for="(v,i) in tabTitle" :key="i" :data-current="i" @tap="tabChange" :class="currentTab == i ? 'current-tab' : ''">{{v}}</li>
		</ul>
		<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 interval="5000" duration="500"  indicator-active-color="orange" :current="currentTab" @change="changeSwiper($event)">
			<swiper-item v-for="(item,index) in 3" :key="index">
				<div class="tab-item-box">
					<waitingList v-if="index==0"></waitingList>
					<ongoing v-if="index==1"></ongoing>
					<finish v-if="index==2"></finish>
					<div style="height: 140px;text-align: center;">没有更多了~</div>
				</div>
			</swiper-item>
		</swiper>
		<view @touchstart="snapStart($event)" @touchend="snapEnd($event)" class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''">
			<view @tap.stop="" class="cu-dialog basis-lg" style="height:100vh;min-width: 100vw;">
				<view class="cu-list menu text-left">
					<view class="bg">
						<p style="height: 60px;line-height: 60px;font-size: 20px;padding-left: 20px;font-weight: 700;padding-top: 60px;">
							<text @tap.stop="hideModal" class="cuIcon-back"></text>收起
						</p>
						<view class="header">
							 <view class="head">
								<image @click="bigHead" src="../../static/11.png" mode=""></image>
							 </view>
							 <view class="text">
								<p style="font-size: 20px;font-weight: 700;margin: 10px 20px;">这是用户名</p>
								<p style="font-size: 17px;font-weight: 400;margin: 10px 20px;">19875814656
									<button class="cu-btn lines-orange round" style="padding: 0 20rpx;margin-left: 20px;height: 20px;">修改</button>
								</p>
							 </view>
						</view>
						<p style="text-align: center;margin: 10px;padding-bottom: 50rpx;">保护环境，从废品回收做起！</p>
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
						<view class="action">39.82元</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">积分</view>
						<view class="action">18223</view>
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
					<button class="cu-btn bg-gradual-red round" style="position: absolute;bottom: 40px;left: 15vw;line-height: 40px;width: 70vw;height: 40px;">退出</button>
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
				tabTitle:['待接单','进行中','已完成'],
				currentTab:0,
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				},
				start:null
			}
		},
		created(){
			this.phone = uni.getStorageSync('phone');
			console.log(this.phone);
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
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.currentTab=index;	
			},
			changeSwiper(e){
				this.currentTab = e.detail.current;
				e.detail.current = 2;
				console.log(e);
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
</style>
